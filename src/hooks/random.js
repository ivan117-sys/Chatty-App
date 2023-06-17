import { useState } from "react";

function useRandom() {
  const [color] = useState(randomColor);

  function randomColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  return { color };
}

export default useRandom;
