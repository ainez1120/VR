let scene;
let pokemonball;
let car;
let rocket;
let sun;


const ROCKET_SPEED = 0.03; 
const ROCKET_MAX_HEIGHT = 8; 
const SUN_FADE_SPEED = 0.01; 
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
  
    car = document.querySelector('.car, #car, a-entity[id="car"]');
    if (car) {
        console.log('Found car element for animation:', car);
        const p = car.getAttribute('position') || {x:0, y:0, z:0};
        const startX = parseFloat(p.x);
        car._pos = { x: startX, y: parseFloat(p.y), z: parseFloat(p.z) };
        car._vx = -Math.abs(CAR_SPEED); 
        car._minX = startX - CAR_MOVE_DISTANCE;
        car._maxX = startX;
    } else {
        console.warn('No car entity found to animate (tried .car and #car)');
    }

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

    sun = document.querySelector('#sun');
    if (sun) {
        sun._opacity = 0;
        sun._fadeSpeed = SUN_FADE_SPEED;
        sun.setAttribute('material', { opacity: sun._opacity, transparent: true });
        console.log('Sun found, starting fade-in');
    } else {
        console.warn('No #sun entity found to animate');
    }

    const DUDE_GROW_SPEED = 0.01;
    const DUDE_MIN_SCALE = 1.0;
    const DUDE_MAX_SCALE = 2.0;
    const dudeEl = document.querySelector('#dude');
    if (dudeEl) {
        dudeEl._scale = { x: 1, y: 1, z: 1 };
        dudeEl._ds = DUDE_GROW_SPEED; 
        dudeEl._min = DUDE_MIN_SCALE;
        dudeEl._max = DUDE_MAX_SCALE;
        console.log('Dude found: will pulse between', DUDE_MIN_SCALE, 'and', DUDE_MAX_SCALE);
    } else {
        console.warn('No #dude entity found to animate');
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

    if (rocket && rocket._pos) {
        rocket._pos.y += rocket._vy;
        if (rocket._pos.y >= rocket._maxY) {
            rocket._pos.y = rocket._startY;
        }
        rocket.setAttribute('position', { x: rocket._pos.x, y: rocket._pos.y, z: rocket._pos.z });
    }
    // update sun fade
    if (sun && typeof sun._opacity === 'number' && sun._fadeSpeed > 0) {
        sun._opacity += sun._fadeSpeed;
        if (sun._opacity >= 1) {
            sun._opacity = 1;
            sun._fadeSpeed = 0; // stop fading
        }
        sun.setAttribute('material', { opacity: sun._opacity, transparent: true });
        // brighten scene lights as sun fades in
        if (sun._light) {
            const dirIntensity = Math.min(1.5, sun._opacity * 1.5);
            sun._light.setAttribute('light', { intensity: dirIntensity, color: '#ffffff' });
        }
        if (sun._ambient) {
            const ambIntensity = Math.min(0.8, sun._opacity * 0.6);
            sun._ambient.setAttribute('light', { intensity: ambIntensity, color: '#ffffff' });
        }
    }

    const dude = document.querySelector('#dude');
    if (dude && dude._scale) {
        let s = dude._scale.x + dude._ds;
        if (s >= dude._max || s <= dude._min) {
            dude._ds = -dude._ds; // reverse
            s = Math.max(Math.min(s, dude._max), dude._min);
        }
        dude._scale.x = dude._scale.y = dude._scale.z = s;
        dude.setAttribute('scale', { x: s, y: s, z: s });
    }
    window.requestAnimationFrame(loop);       


}




