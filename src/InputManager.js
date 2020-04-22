// this file was adapted almost verbatim from:
// https://www.udemy.com/course/react-learn-react-with-hooks-by-creating-a-roguelike-game/
// I've done my best to comment on how it works.

export class InputManager {
  observer = [];

  subscribe(fn) {
    // add a function to be run whenever there's a keyboard event.
    this.observer.push(fn);
  }

  unsubscribe(fn) {
    // filter out the list of subscribers that are equal to fn.
    this.observer = this.observer.filter(subscriber => subscriber !== fn);
  }

  broadcast(action, data) {
    // when the event listener gets a keyboard event, 
    // run each function in observer and send it action and data
    this.observer.forEach(subscriber => subscriber(action, data));
  }

  //receives an event object from the event listener
  handleKeys = e => {
    //65: a "west"
    //83: s "south"
    //68: d "east"
    //87: w "north"
    //81: q "up"
    //90: z "down"
    e.preventDefault();
    console.log(e.keyCode); //debugging
    switch (e.keyCode) {
      //left arrow key
      case 65: //"west"
        this.broadcast('move', { x: -1, y: 0, z: 0});
        break;
      case 83: //"south"
        this.broadcast('move', { x: 0, y: -1, z: 0});
        break;
      case 68: //"east"
        this.broadcast('move', { x: 1, y: 0, z: 0});
        break;
      case 87: //"north"
        this.broadcast('move', { x: 0, y: 1, z: 0});
        break;
      case 81: //"up"
        this.broadcast('move', { x: 0, y: 0, z: 1});
        break;
      case 90: //"down"
        this.broadcast('move', { x: 0, y: 0, z: -1});
        break;
      case 32: //"spacebar"
        this.broadcast('spawnCube', { x: 0, y: 0, z: 0 })
        break;
      default:
        break;
    }
  };

  //we need to add an event listener to our document
  bindKeys() {
    document.addEventListener('keydown', this.handleKeys);
  }
  unbindKeys() {
    document.removeEventListener('keydown', this.handleKeys);
  }
}