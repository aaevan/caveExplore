import React, { useRef, useState } from "react";
import { translateByPlayerCoord, findDistFromCoord } from "../helpers"
import { useFrame } from "react-three-fiber";
import { DoubleSide } from "three";

export function Box({ scale, position, rotation, color, playerData }) {
  const baseCoord = position
  const mesh = useRef()

  const [displayCoord, setDisplayCoord] = useState(position)
  const [distFromPlayer, setDistFromPlayer] = useState(1);
  const [distOpacity, setDistOpacity] = useState(.5);

  useFrame(() => { setDisplayCoord(translateByPlayerCoord(playerData, baseCoord)) })
  useFrame(() => { setDistFromPlayer(findDistFromCoord(playerData.coord, baseCoord)) })
  useFrame(() => {
    if (distFromPlayer === 0) {
      setDistOpacity(Box.defaultProps.opacity)
    } else {
      let inverseSq = (.25 / distFromPlayer ** 2 + .01);
      inverseSq > .025 ? setDistOpacity(inverseSq) : setDistOpacity(0);
    }
  })

  return (
    <mesh
      ref={mesh}
      key={`box-${position}`}
      visible
      scale={scale}
      position={displayCoord}
      rotation={rotation}
      color={color}
      castShadow
    >
      <boxGeometry attach="geometry" args={scale} />
      <meshStandardMaterial
        attach="material"
        color={color}
        emissiveIntensity={.5}
        transparent={true}
        opacity={distOpacity}
        roughness={0.1}
        metalness={0.1}
        side={DoubleSide}
      />
    </mesh>
  );
}

Box.defaultProps = {
  scale: [.95, .95, .95],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  color: "grey",
  opacity: .5,
};