import { useEffect, useRef, useState } from "react";
import { uuidV6 } from "./helper";

const SvgInteractive = ({ svgComponent, defaultValues, onClick }) => {
  const SvgComponent = svgComponent;

  const svgRef = useRef(null);

  const [coordinates, setCoordinates] = useState(() => {
    if (!defaultValues?.length) {
      return {};
    }

    return defaultValues?.reduce((result, item) => {
      return {
        ...result,
        [uuidV6()]: item,
      };
    }, {});
  });

  useEffect(() => {
    Object.keys(coordinates).forEach((key) => {
      addCircle(key, coordinates[key]);
    });
  }, [coordinates]);

  const addCircle = (id, { x, y }) => {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "#ff0000");
    circle.setAttribute("data-id", id);
    svgRef.current.appendChild(circle);
  };

  const handleSaveCoordinates = (updatedCoordinates) => {
    setCoordinates(updatedCoordinates);
    onClick?.(
      Object.keys(updatedCoordinates).map((key) => {
        return updatedCoordinates[key];
      })
    );
  };

  const removeCircle = (id) => {
    const element = svgRef.current.querySelector(`[data-id="${id}"]`);

    svgRef.current.removeChild(element);

    const newCoordinates = { ...coordinates };

    delete newCoordinates[id];

    handleSaveCoordinates(newCoordinates);
  };

  const handleClick = (e) => {
    if (e.target.tagName === "circle") {
      removeCircle(e.target.dataset.id);
      return;
    }

    const pt = svgRef.current.createSVGPoint();
    console.log(e);
    pt.x = e.clientX;
    pt.y = e.clientY;

    const { x, y } = pt.matrixTransform(
      svgRef.current.getScreenCTM().inverse()
    );

    const newId = uuidV6();

    addCircle(newId, { x, y });

    const newCoordinates = {
      ...coordinates,
      [newId]: { x, y },
    };

    handleSaveCoordinates(newCoordinates);
  };

  return <SvgComponent ref={svgRef} onClick={handleClick} />;
};

export default SvgInteractive;
