import React, { useRef, useState, useContext} from "react";
//import ReactDOM from "react-dom";
import { useFrame } from "react-three-fiber";
import { interpRGB, degToRad } from "../helpers"
import { PlayerData } from "../index"


export function Box({ scale, position, rotation, color }) {
    const mesh = useRef()
    const playerCoords = useContext(PlayerData)
    console.log("start:", playerCoords)
  
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [here, setHere] = useState(false);
  
    //set rate of pulse
    //useFrame(() => { hover ? setCounter((counter + 4) % 360) : setCounter(0) })
    useFrame(() => { here ? setCounter((counter + 4) % 360) : setCounter(0) })

    const checkEqual = (coordA, coordB) => {
        return JSON.stringify(coordA) == JSON.stringify(coordB);
    }

    useFrame(() => { checkEqual(playerCoords, mesh.position) ? setHere(true) : setHere(false) })
    useFrame(() => { console.log(here, playerCoords, mesh.position) })
  
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
          //color={hover ? `rgb(${
          color={here ? `rgb(${
            interpRGB(
              [100, 100, 100], 
              [0, 255, 0], 
              (Math.sin(degToRad(counter)) / 2) + .5
            )
          })` : 'grey'}
          //emissive={hover ? 'limegreen' : 0}
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