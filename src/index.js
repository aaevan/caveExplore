import React, { useEffect, } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";
import { Box } from "./components/Box"
import { InputManager } from "./InputManager"
import { degToRad } from "./helpers"

import "./styles.css";
import { Marker } from "./components/Marker";

// Lights
function DirectionalLight({ brightness, color, position }) {
  return (
    <rectAreaLight
      width={4}
      height={4}
      color={color}
      intensity={brightness}
      position={position}
      lookAt={[0, 0, 0]}
      penumbra={0}
      castShadow
    />
  );
}

function BackDrop() {
  return (
    <mesh
      receiveShadow
      position={[20, 0, -20]}
      rotation={[0, degToRad(-45), 0]}
    >
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

DirectionalLight.defaultProps = {
  color: "#ffffff",
  brightness: 10,
  position: [0, 0, 0]
}

function App() {
  let inputManager = new InputManager()

  let playerState = {
    coord: [0, 0, 0],
  }

  function movePlayer(playerState, keyData) {
    console.log("playerState:", playerState.coord, "keyData:", keyData)
    let [newX, newY, newZ] = playerState.coord
    console.log("newX/Y/Z:", newX, newY, newZ);
    let {x, y, z} = keyData;
    console.log("keyData (x, y, z)", x, y, z);
    newX = newX + x
    newY = newY + y
    newZ = newZ + z
    return [newX, newY, newZ]
  };

  const handleInput = (action, data) => {
    console.log(`handleinput: ${action}:${JSON.stringify(data)}`)
    if (action === "move") {
      let destination = movePlayer(playerState, data)
      for (let coord of cubes) {
        if (JSON.stringify(coord) === JSON.stringify(destination)) {
          playerState.coord = destination;
          console.log("New coord:", destination);
          break
        }
      }
    }
    if (action === "spawnCube") {
    }

    console.log(playerState.coord)
  };

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput)
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    }
  })

  const cubes = [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [2, 0, -1],
    [2, 0, -2],
    [1, 0, -2],
    [0, 0, -2],
    [0, 0, -1],
    [0, 1, 0],
    [0, 2, 0],
    [1, 2, 0],
    [2, 2, 0],
    [2, 1, 0],
    [-1, 0, 0],
    [-2, 0, 0],
    [-2, 0, 1],
    [-2, 0, 2],
    [-1, 0, 2],
    [0, 0, 2],
    [0, 0, 1],
  ]

  const lights = [
    [5, 5, 5],
    [-5, 5, -5],
    [5, 5, -5],
    [-5, 5, 5],
  ]

  return (
    <Canvas camera={{position: [-2, 1, 3]}} className="canvas" >
      <BackDrop />
      { lights.map((coord) => <DirectionalLight brightness={20} color={"#ffffff"} position={coord} />)}
      { cubes.map((box) => <Box playerData={playerState} position={box} />)}
      <Marker />
    </Canvas>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
