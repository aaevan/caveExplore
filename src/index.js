import React, { useEffect, } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";
import { Box } from "./components/Box"
import { InputManager } from "./InputManager"
import { degToRad } from "./helpers"

import "./styles.css";
import { Marker } from "./components/Marker";
//import { PlaneCube } from "./components/PlaneCube";
import { Changeling } from "./components/Changeling";

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
    let { x, y, z } = keyData;
    console.log("keyData (x, y, z)", x, y, z);
    newX = newX + x
    newY = newY + y
    newZ = newZ + z
    return [newX, newY, newZ]
  };

  const handleInput = (action, data) => {
    //console.log(`handleinput: ${action}:${JSON.stringify(data)}`)
    if (action === "move") {
      let destination = movePlayer(playerState, data)
      for (let coord of [...cubeMap]) {
        if (coord === JSON.stringify(destination)) {
          playerState.coord = destination;
          //console.log("New coord:", destination);
          break
        }
      }
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


  //let cubes = new Set()
  let cubeMap = new Set()

  let cubes = [
    //we read from this list but there's an extra layer of stringifying
    //for makind sure the keys are unique
    [0, 0, 0],
    [-1, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [2, 1, 0],
    [2, 2, 0],
    [2, 2, 1],
    [2, 2, 2],
    [2, 1, 2],
    [2, 0, 2],
    [1, 0, 2],
    [1, 0, 2],
    [0, 0, 2],
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [-2, 1, 3],
  ]


  for (let coord of cubes) {
    console.log("adding:", coord)
    cubeMap.add(JSON.stringify(coord))
  }

  const randInt = (minVal, maxVal) => (Math.round(Math.random() * (maxVal - minVal)) + minVal);
  for (let i = 0; i < 50; i++ ) {
    let coord = [randInt(-5, 5), randInt(-5, 5), randInt(-5, 5)]
    cubeMap.add(JSON.stringify(coord))
  }
  console.log("cubeMap:", cubeMap)

  const lights = [
    [5, 5, 5],
    [-5, 5, -5],
    [5, 5, -5],
    [-5, 5, 5],
  ]

  return (
    <Canvas camera={{ position: [-2, 1, 3] }} className="canvas" >
      <BackDrop />
      {lights.map((coord) => <DirectionalLight brightness={20} color={"#ffffff"} position={coord} />)}
      {[...cubeMap].map((coord) => 
        {
          console.log("creating cube at", coord, "...")
          return <Box playerData={playerState} position={JSON.parse(coord)} />
        })}
      <Marker />
      {/*<PlaneCube />*/}
      {/*<Changeling playerData={playerState} />*/} {/* use this to pass in location of player to toggle through changeling modes */}
    </Canvas>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
