import React, { useRef } from 'react';
import { degToRad, addCoords } from '../helpers';
import { DoubleSide } from 'three';

export const PlaneCube = ({ scale, position }) => {
  const offset = scale[0] / 2
  const instances = [
    [[0, 0, 0], [0, 0, offset]],
    [[0, 0, 0], [0, 0, -offset]],
    [[0, degToRad(90), 0], [offset, 0, 0]],
    [[0, degToRad(90), 0], [-offset, 0, 0]],
    [[degToRad(90), 0, 0], [0, offset, 0]],
    [[degToRad(90), 0, 0], [0, -offset, 0]],
  ]
  const mesh = useRef() //what is useRef doing here??
  return (
    //what is attach="geometry" doing here??
    <>
      {instances.map(([rotation, coord]) =>
        <mesh
          key={`${coord}-plane`}
          ref={mesh}
          scale={scale}
          rotation={rotation}
          position={addCoords(coord, position)}>
          <planeBufferGeometry attach="geometry" args={[1, 1]} />
          <meshStandardMaterial
            attach="material"
            color="grey"
            side={DoubleSide}
            transparent={true}
            opacity={.3}
          />
        </mesh>
      )}
    </>
  );
}

PlaneCube.defaultProps = {
  scale: [.9, .9, .9],
  position: [-1, 0, 1],
}
