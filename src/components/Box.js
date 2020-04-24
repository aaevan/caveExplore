import React, { useRef, useState, } from "react";
import { translateByPlayerCoord, findDistFromCoord, } from "../helpers"
import { useFrame, } from "react-three-fiber";

export const Box = ({ scale, position, rotation, color, playerData }) => {
  const baseCoord = position
  const mesh = useRef()
  const cameraCoord = [-2, 1, 3]

  const [displayCoord, setDisplayCoord] = useState(position)
  const [distOpacity, setDistOpacity] = useState(.5);

  useFrame(() => {
    // immediately update display coord on player move:
    setDisplayCoord(translateByPlayerCoord(playerData, baseCoord)) 
    // find distance of box currently from player:
    let distFromPlayer = findDistFromCoord(playerData.coord, baseCoord)
    // find distance of box from the camera to prevent obscuring everything else:
    let distFromCamera = findDistFromCoord(cameraCoord, displayCoord)
    // use distance to lower the opacity of cells the further out they get:
    if (distFromCamera <= 1) {
      setDistOpacity(0);
    } else if (distFromPlayer === 0) {
      setDistOpacity(Box.defaultProps.opacity)
    } else {
      let inverseSq = (.25 / distFromPlayer ** 2 + .01);
      // hide all cubes greater than a distance of 5 from current player location:
      distFromPlayer < 3 ? setDistOpacity(inverseSq) : setDistOpacity(0);

    }
  })

return (
  <mesh
    ref={mesh}
    key={`box-${position}`}
    visible
    scale={scale}
    position={displayCoord}
    color={color}
    castShadow
  >
    <boxBufferGeometry attach="geometry" args={scale} />
    <meshStandardMaterial
      attach="material"
      color={color}
      transparent={true}
      opacity={distOpacity}
      //fix problem of camera in a box and everything else is hidden:
      visible={distOpacity > 0 ? true : false}
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