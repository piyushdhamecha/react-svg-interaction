import { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import bodyMap from './assets/body-map.png'
import { ReactComponent as SvgImage } from "./assets/body-map.svg";

import "./App.css";
import SvgInteractive from "./SvgInteractive";

const selectedPoints = [
  { x: 494.0633850097656, y: 70.44690704345703 },
  { x: 605.28125, y: 69.73397064208984 },
  { x: 608.1329956054688, y: 224.44088745117188 },
  { x: 486.9340515136719, y: 220.1632843017578 },
  { x: 504.04449462890625, y: 374.15728759765625 },
  { x: 613.12353515625, y: 379.8607482910156 },
  { x: 280.8957824707031, y: 74.72451782226562 },
  { x: 348.6246337890625, y: 265.7911376953125 },
  { x: 216.01869201660156, y: 262.2264709472656 },
  { x: 64.16350555419922, y: 147.4438934326172 },
];

function App() {
  // const svgRef = useRef(null);

  // const addCircle = (x, y) => {
  //   const circle = document.createElementNS(
  //     "http://www.w3.org/2000/svg",
  //     "circle"
  //   );
  //   circle.setAttribute("cx", x);
  //   circle.setAttribute("cy", y);
  //   circle.setAttribute("r", 5);
  //   circle.setAttribute("fill", "#ff0000");
  //   svgRef.current.appendChild(circle);
  // };

  // useEffect(() => {
  //   selectedPoints.forEach(({ x, y }) => {
  //     addCircle(x, y);
  //   });
  // }, []);

  // const handleClick = (e) => {
  //   if (e.target.tagName === "circle") {
  //     return;
  //   }

  //   const pt = svgRef.current.createSVGPoint();
  //   console.log(e);
  //   pt.x = e.clientX;
  //   pt.y = e.clientY;

  //   const { x, y } = pt.matrixTransform(
  //     svgRef.current.getScreenCTM().inverse()
  //   );

  //   console.log({ x, y });
  //   addCircle(x, y);
  // };

  // // return <SvgImage ref={svgRef} onClick={handleClick} />;
  // return (
  //   <div>
  //     <svg ref={svgRef} onClick={handleClick} />;
  //   </div>
  // );

  const handleClick = (coordinates) => {
    console.log(coordinates);
  };

  return (
    <SvgInteractive
      svgComponent={SvgImage}
      // defaultValues={selectedPoints}
      onClick={handleClick}
    />
  );
}

export default App;
