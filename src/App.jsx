/* eslint-disable no-loss-of-precision */
import { ReactComponent as SvgImage } from "./assets/body-map.svg";

import "./App.css";
import SvgInteractive from "./SvgInteractive";

const selectedPoints = [
  { x: 633.4454345703125, y: 119.10945892333984 },
  { x: 721.09228515625, y: 96.50335693359375 },
  { x: 733.0923461914062, y: 277.59521484375 },
  { x: 603.2734985351562, y: 257.9587707519531 },
  { x: 174.54393005371094, y: 100.86701202392578 },
  { x: 382.9086608886719, y: 111.77616119384766 },
];

function App() {
  const handleClick = (coordinates) => {
    console.log(coordinates);
  };

  return (
    <SvgInteractive
      svgComponent={SvgImage}
      defaultValues={selectedPoints}
      onClick={handleClick}
    />
  );
}

export default App;
