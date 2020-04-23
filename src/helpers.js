export const interpRGB = (color_a = [0, 0, 0], color_b = [255, 255, 255], fade_val = .5) => {
  // given two 3-item arrays, return a value that is a linear interpolation between the two.
  // a fade_val of 0 will return color_a
  // a fade_val of .5 will return 50% of the way.
  // a fade_val of 1 will return color_b
  const interp_single = (a, b) => (Math.round((b - a) * fade_val) + a);
  const r_output = interp_single(color_a[0], color_b[0]);
  const g_output = interp_single(color_a[1], color_b[1]);
  const b_output = interp_single(color_a[2], color_b[2]);
  return [r_output, g_output, b_output];
}

//convert from degrees to radians
export const degToRad = (degrees) => (degrees * (Math.PI / 180))

export const setUniformScale = (mesh, scale) => (
  //set the x, y and z scale of a mesh to the same value.
  mesh.current.scale.x = mesh.current.scale.y = mesh.current.scale.z = scale
)

export const addCoords = (coordA, coordB) => {
  //add two three item arrays
  return [
    coordA[0] + coordB[0],
    coordA[1] + coordB[1],
    coordA[2] + coordB[2],
  ]
}

export const translateByPlayerCoord = (playerData={coord:[0, 0, 0]}, baseCoord, smooth=true) => {
  const coord = playerData.coord;
  let [x, y, z] = [
    baseCoord[0] - coord[0],
    baseCoord[1] - coord[1],
    baseCoord[2] - coord[2],
  ]
  return [x, y, z]
}

export const findDistFromCoord = (coordA, coordB) => {
  const [a, b, c] = [
      coordB[0] - coordA[0],
      coordB[1] - coordA[1],
      coordB[2] - coordA[2],
  ]
  return Math.sqrt(a ** 2 + b ** 2 + c ** 2)
}

export const pulseAB = (
  boolProperty, 
  cycleTracker,
  defaultColor=[100, 100, 100],
  startColor=[100, 100, 100], 
  endColor=[0, 255, 0],
) => { 
  if (boolProperty) {
    return `rgb(${ interpRGB( startColor, endColor, (Math.sin(degToRad(cycleTracker)) / 2) + .5)})`;
  } else {
    return `rgb(${ defaultColor })`;
  }
}

export function checkEqual(coordA = [9, 9, 9], coordB = [7, 7, 7]) {
  for (let i = 0; i < 3; i++){
    if (coordA[i] !== coordB[i]) {
      return false
    }
  }
  return true
}