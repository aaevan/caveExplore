import React, { useRef, useState } from "react";
import { interpRGB, degToRad } from "../helpers"
import { useFrame } from "react-three-fiber";

export function checkEqual(coordA = [9, 9, 9], coordB = [7, 7, 7]) {
  for (let i = 0; i < 3; i++){
    if (coordA[i] !== coordB[i]) {
      return false
    }
  }
  //console.log(coordA, coordB)
  return true
}

export function Box({ scale, position, rotation, color, playerData}) {
  const mesh = useRef()

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [here, setHere] = useState(true);

  //set rate of pulse
  useFrame(() => { here ? setCounter((counter + 4) % 360) : setCounter(0) })
  useFrame(() => { checkEqual(playerData.coord, position) ? setHere(true) : setHere(false) })

  return (
    <mesh
      ref={mesh}
      visible
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      position={position}
      rotation={rotation}
      color={color}
      castShadow
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxGeometry attach="geometry" args={scale} />
      <meshStandardMaterial
        attach="material"
        //color={here ? "rgb(0, 0, 255)" : 'grey'}
        color={here ? `rgb(${
          interpRGB(
            [100, 100, 100], 
            [0, 255, 0], 
            (Math.sin(degToRad(counter)) / 2) + .5
          )
        })` : 'grey'}
        emissive={hover ? 'limegreen' : 0}
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
  color: "red"
};