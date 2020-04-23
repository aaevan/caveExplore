import { degToRad } from "./helpers"

export const modeList = {
    'frame': [
      {
        position: [0, -.2, .3],
        scale: [.8, .15, .15],
        rotation: [0, 0, 0],
        color: "red"
      },
      {
        position: [0, -.2, -.3],
        scale: [.8, .15, .15],
        rotation: [0, 0, 0],
        color: "orange"
      },
      {
        position: [-.3, -.21, 0],
        scale: [.8, .15, .15],
        rotation: [0, degToRad(90), 0],
        color: "yellow"
      },
      {
        position: [.3, -.21, 0],
        scale: [.8, .15, .15],
        rotation: [0, degToRad(90), 0],
        color: "green"
      },
      { //pool
        position: [.0, -.2, 0],
        scale: [.45, .07, .45],
        rotation: [0, 0, 0],
        color: "blue"
      },
    ],
    'door': [
      { //left post
        position: [-.3, 0, 0],
        scale: [.8, .1, .1],
        rotation: [0, degToRad(90), degToRad(90)],
        color: "red"
      },
      { //right post
        position: [.3, 0, 0],
        scale: [.8, .1, .1],
        rotation: [0, degToRad(90), degToRad(90)],
        color: "orange"
      },
      { //door
        position: [0, -.1, 0],
        scale: [.4, .6, .05],
        rotation: [0, 0, 0],
        color: "yellow"
      },
      { //lintel
        position: [0, .31, .01],
        scale: [.8, .15, .15],
        rotation: [0, 0, 0],
        color: "green"
      },
      { //knob
        position: [.15, -.12, .02],
        scale: [.05, .15, .05],
        rotation: [0, 0, 0],
        color: "blue"
      }
    ],
    'openDoor': [
      { //left post
        position: [-.3, 0, 0],
        scale: [.8, .1, .1],
        rotation: [0, degToRad(90), degToRad(90)],
        color: "red"
      },
      { //right post
        position: [.3, 0, 0],
        scale: [.8, .1, .1],
        rotation: [0, degToRad(90), degToRad(90)],
        color: "orange"
      },
      { //door
        position: [-.12, -.1, -.15],
        scale: [.4, .6, .05],
        rotation: [0, degToRad(60), 0],
        color: "yellow"
      },
      { //lintel
        position: [0, .31, .01],
        scale: [.8, .15, .15],
        rotation: [0, 0, 0],
        color: "green"
      },
      { //knob
        position: [-.05, -.12, -.2],
        scale: [.05, .15, .05],
        rotation: [0, degToRad(60), 0],
        color: "blue"
      }
    ]
  }