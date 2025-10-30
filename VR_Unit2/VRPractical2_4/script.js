// Clean, fixed script.js — generates rockets (matching the given HTML snippet)
// and UFOs. Rockets use the declarative animation__rise attribute so the
// JS does not fight the animation. This file replaces a corrupted script.
  // Clean, fixed script.js — generates rockets (matching the given HTML snippet)
  // and UFOs. Rockets use the declarative animation__rise attribute so the
  // JS does not fight the animation. This file replaces a corrupted script.

  let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene, rockets = [], ufos = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); 
  for(let i=0; i<100; i++){
    let rocket = new Rocket(rnd(-50,50), rnd(-1,-10), rnd(-50,50));
    rockets.push(rocket);
  }

  for(let i=0; i<50; i++){
    let ufo = new Ufo(rnd(-50,50), rnd(40,60), rnd(-50,50), rnd(5,20)*0.01);
    ufos.push(ufo);
  }

  loop();
})

function loop(){

  for(let rocket of rockets){
    rocket.launch();
  }

  for(let ufo of ufos){
    ufo.invade();
  }

  window.requestAnimationFrame( loop );
}