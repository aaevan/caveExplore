import React, { useState, useRef } from 'react';
import { DoubleSide, } from 'three';
import { useFrame } from 'react-three-fiber';
import { addCoords } from '../helpers';
import { modeList } from '../modes';

export const Changeling = ({ startMode='openDoor' }) => {
  const mesh = useRef()
  const [viewMode, setViewMode] = useState(startMode)
  //ugly test to see transitions between different changeling modes:
  useFrame(() => {Math.random() > .3 ? setViewMode('door') : (Math.random() > .5 ? setViewMode('frame') : setViewMode('openDoor'))});
  const debug = true //change displayed scene to all grey if false
  return (
    <>
      {modeList[viewMode].map(({position, scale, rotation, color}) => {
        return (
        <mesh
          ref={mesh}
          scale={scale}
          position={addCoords(position, [0, 0, 0])}
          rotation={rotation}
          //position={modes[key].position}
        >
          <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
          <meshStandardMaterial
            attach="material"
            color={debug ? color : 'grey'}
            side={DoubleSide}
            transparent={false}
            //opacity={.5}
          />
        </mesh>
        )
      })}
    </>
  )
}