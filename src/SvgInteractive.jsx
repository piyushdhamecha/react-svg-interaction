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
  }, []);

  const createCircleElement = (attributes) => {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    Object.keys(attributes).forEach((key) => {
      circle.setAttribute(key, attributes[key]);
    });

    return circle;
  };

  const addCircle = (id, { x, y }) => {
    const circle1 = createCircleElement({
      cx: x,
      cy: y,
      r: 14,
      stroke: "#E20714",
      fill: "transparent",
      "stroke-width": 3,
      "data-id": id,
      opacity: 0.3,
      style: "cursor: pointer",
    });

    const circle2 = createCircleElement({
      cx: x,
      cy: y,
      r: 9,
      fill: "#E20714",
      "data-id": id,
      style: "cursor: pointer",
    });

    svgRef.current.appendChild(circle1);
    svgRef.current.appendChild(circle2);
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
    const elements = svgRef.current.querySelectorAll(`[data-id="${id}"]`);

    elements.forEach((element) => svgRef.current.removeChild(element));

    const newCoordinates = { ...coordinates };

    delete newCoordinates[id];

    handleSaveCoordinates(newCoordinates);
  };

  const handleClick = (e) => {
    console.dir(e.target);
    if (e.target.tagName === "circle") {
      removeCircle(e.target.dataset.id);
      return;
    }

    const pt = svgRef.current.createSVGPoint();

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
