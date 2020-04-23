import React, { useRef, useState } from "react";
import { pulseAB } from "../helpers"
import { useFrame } from "react-three-fiber";

export function checkEqual(coordA = [9, 9, 9], coordB = [7, 7, 7]) {
  for (let i = 0; i < 3; i++){
    if (coordA[i] !== coordB[i]) {
      return false
    }
  }
  return true
}

export function Marker({ scale, position, rotation, color}) {
  //console.log(scale, position, rotation, color)
  const mesh = useRef()
  const [counter, setCounter] = useState(0);
  const [displayColor, setDisplayColor] = useState(`rgb([255, 0, 255])`)
  //const [yRotation, setYRotation] = useState(0);

  //set rate of pulse
  useFrame(() => { setCounter((counter + 4) % 360) })
  useFrame(() => { 
    let output = pulseAB(true, counter)
    //console.log(output)
    setDisplayColor(output)
  })
  useFrame(() => {mesh.current.rotation.y = mesh.current.rotation.y + .02})
  useFrame(() => {mesh.current.rotation.x = mesh.current.rotation.x + .022})
  useFrame(() => {mesh.current.rotation.z = mesh.current.rotation.z + .024})
  
  return (
    <mesh
      key={`marker-${position}`}
      ref={mesh}
      visible
      scale={scale}
      position={position}
      rotation={rotation}
      color={color}
      castShadow
    >
      <boxGeometry attach="geometry" args={scale} />
      <meshStandardMaterial
        attach="material"
        color={displayColor}
        emissiveIntensity={.5}
        transparent={false}
        opacity={.5}
        roughness={0.1}
        metalness={0.1}
        //side={DoubleSide}
      />
    </mesh>
  );
}

Marker.defaultProps = {
  scale: [.5, .5, .5],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  color: "grey"
};