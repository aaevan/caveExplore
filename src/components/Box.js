import React, { useRef, useState } from "react";
import { interpRGB, degToRad } from "../helpers"
import { useFrame } from "react-three-fiber";

export function checkEqual(coordA = [9, 9, 9], coordB = [7, 7, 7]) {
  for (let i = 0; i < 3; i++){
    if (coordA[i] !== coordB[i]) {
      return false
    }
  }
  return true
}

export function Box({ scale, position, rotation, color, playerData}) {
  const baseCoord = position
  const mesh = useRef()

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [here, setHere] = useState(true);
  const [displayCoord, setDisplayCoord] = useState(position)

  //set rate of pulse
  useFrame(() => { here ? setCounter((counter + 4) % 360) : setCounter(0) })
  useFrame(() => { checkEqual(playerData.coord, position) ? setHere(true) : setHere(false) })
  useFrame(() => { setDisplayCoord(translateByPlayerCoord(playerData, baseCoord))})

  const pulseAB = (
    boolProperty=here, 
    startColor=[100, 100, 100], 
    endColor=[0, 255, 0],
    defaultColor=[100, 100, 100],
    cycleTracker=counter
  ) => { 
    if (boolProperty) {
      return `rgb(${ interpRGB( startColor, endColor, (Math.sin(degToRad(cycleTracker)) / 2) + .5)})`;
    } else {
      return `rgb(${ defaultColor })`;
    }
  }

  const translateByPlayerCoord = (playerData, baseCoord) => {
    const coord = playerData.coord;
    //console.log(coord)
    let [x, y, z] = [
      baseCoord[0] - coord[0],
      baseCoord[1] - coord[1],
      baseCoord[2] - coord[2],
    ]
    return [x, y, z]
  }

  return (
    <mesh
      ref={mesh}
      visible
      scale={scale}
      position={displayCoord}
      rotation={rotation}
      color={color}
      castShadow
      onClick={e => setActive(!active)}
      //onPointerOver={e => setHover(true)}
      //onPointerOut={e => setHover(false)}
    >
      <boxGeometry attach="geometry" args={scale} />
      <meshStandardMaterial
        attach="material"
        color={pulseAB()}
        emissiveIntensity={.5}
        transparent={true}
        opacity={.5}
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

Box.defaultProps = {
  scale: [1, 1, 1],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  color: "grey"
};