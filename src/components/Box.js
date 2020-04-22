import React, { useRef, useState } from "react";
import { interpRGB, degToRad, translateByPlayerCoord, findDistFromCoord } from "../helpers"
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
  const [distFromPlayer, setDistFromPlayer] = useState(1);
  const [distOpacity, setDistOpacity] = useState(1);

  //set rate of pulse
  useFrame(() => { here ? setCounter((counter + 4) % 360) : setCounter(0) })
  useFrame(() => { checkEqual(playerData.coord, position) ? setHere(true) : setHere(false) })
  useFrame(() => { setDisplayCoord(translateByPlayerCoord(playerData, baseCoord))})
  useFrame(() => { setDistFromPlayer(findDistFromCoord(playerData.coord, baseCoord))})
  useFrame(() => { setDistOpacity(.5 / distFromPlayer ** 2) })

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
        opacity={distOpacity}
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

Box.defaultProps = {
  scale: [.95, .95, .95],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  color: "grey"
};