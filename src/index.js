import React, { useEffect, createContext } from "react";
import ReactDOM from "react-dom";
import { Canvas } from "react-three-fiber";
import { Box } from "./components/Box"
import { InputManager } from "./InputManager"
//import { interpRGB, degToRad } from "./helpers"

import "./styles.css";

export const PlayerData = createContext({
  coord: [0, 0, 0]
})

// Geometry
function BackDrop() {
  return (
    <mesh
      receiveShadow
      position={[0, -1, -5]}
      rotation={[0, 1, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}

// Lights
function DirectionalLight({ brightness, color, position }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={position}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}

DirectionalLight.defaultProps = {
  color: "white",
  brightness: 10,
  position: [0, 0, 0]
}

function App() {
  let inputManager = new InputManager()



  const handleInput = (action, data) => {
    console.log(`handleinput: ${action}:${JSON.stringify(data)}`)
    //let newWorld = new World();
    //Object.assign(newWorld, world)
    //newWorld.movePlayer(data.x, data.y)
    //setWorld(newWorld);
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

  return (
    <PlayerData.Provider>
      <Canvas
        camera={{ position: [3, 3, 3] }}
        className="canvas"
      >
        <BackDrop />
        <DirectionalLight brightness={10} color={"#ffffff"} position={[3, 3, 3]} />
        <PlayerData.Provider>
          <>
          <Box position={[0, 0, 0]} />
          <Box position={[1, 0, 0]} />
          </>
        </PlayerData.Provider>
        {/*
        <Box position={[0, 0, 1]} />
        <Box position={[-1, 0, 0]} />
        <Box position={[0, -1, 0]} />
        <Box position={[0, 0, -1]} />
        <Box position={[0, 0, -1]} />
        <Box position={[0, 0, -2]} />
        <Box position={[1, 0, -2]} />
        <Box position={[2, 0, -2]} />
        <Box position={[2, 1, -2]} />
        <Box position={[0, 0, 1]} />
        <Box position={[0, 0, 2]} />
        <Box position={[0, 0, 3]} />
        */}
      </Canvas>
    </PlayerData.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
