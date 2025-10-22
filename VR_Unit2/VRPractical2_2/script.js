let scene;
let pokemonball;
let car;
let rocket;

// rocket params
const ROCKET_SPEED = 0.03; // units per frame upward
const ROCKET_MAX_HEIGHT = 8; // y position to reset


const CAR_SPEED = 0.05; 
const CAR_MOVE_DISTANCE = 10; 


window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene"); //CSS Selector
    pokemonball = document.querySelector("#pokemonball");
    if (!pokemonball) {
        console.error("pokemonball element not found");
        return;
    }
    pokemonball.a = 0;
    pokemonball.da = 1;
  



    // try multiple selectors: class or id (some scenes use class="car", others use id="car")
    car = document.querySelector('.car, #car, a-entity[id="car"]');
    if (car) {
        console.log('Found car element for animation:', car);
        const p = car.getAttribute('position') || {x:0, y:0, z:0};
        // normalize numbers (A-Frame sometimes returns strings)
        const startX = parseFloat(p.x);
        car._pos = { x: startX, y: parseFloat(p.y), z: parseFloat(p.z) };
        car._vx = -Math.abs(CAR_SPEED); // start moving left
        car._minX = startX - CAR_MOVE_DISTANCE;
        car._maxX = startX; // move back to start
    } else {
        console.warn('No car entity found to animate (tried .car and #car)');
    }

    // setup rocket movement
    rocket = document.querySelector('#rocket');
    if (rocket) {
        const rp = rocket.getAttribute('position') || {x:0,y:0,z:0};
        rocket._pos = { x: parseFloat(rp.x), y: parseFloat(rp.y), z: parseFloat(rp.z) };
        rocket._vy = ROCKET_SPEED;
        rocket._startY = rocket._pos.y;
        rocket._maxY = rocket._startY + ROCKET_MAX_HEIGHT;
        console.log('Rocket found, will ascend from', rocket._startY, 'to', rocket._maxY);
    } else {
        console.warn('No #rocket entity found to animate');
    }
    
    
    loop();
})

function loop(){
    pokemonball.a += pokemonball.da;           
    pokemonball.setAttribute("rotation",{x:0, y:pokemonball.a, z:0});
  


    if (car && car._pos) {
        car._pos.x += car._vx;
        if (car._pos.x <= car._minX || car._pos.x >= car._maxX) {
            car._vx = -car._vx;
       
            car._pos.x = Math.max(Math.min(car._pos.x, car._maxX), car._minX);
        }
        car.setAttribute('position', { x: car._pos.x, y: car._pos.y, z: car._pos.z });
    }
    window.requestAnimationFrame(loop);       
}




