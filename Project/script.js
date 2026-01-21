let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, bullets = [], enemies = [], ammo_boxes = [], ammo_count = 10, enemy_killed = 0;
let isShooting = false;
let aim;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  aim = document.createElement("a-line");
  aim.setAttribute("start", "0 0 0");
  aim.setAttribute("end", "0 0 -50");
  aim.setAttribute("color", "red");
  aim.setAttribute("material", "lineWidth: 5");
  camera.appendChild(aim);

  spawnSpiders(50);
  spawnAmmo(10);
  
  updateAmmoDisplay();

  window.addEventListener("keydown", function(e) {
    if(e.key == " ") {
      e.preventDefault();
      if(ammo_count > 0) {
        let newBullet = new Bullet();
        bullets.push(newBullet);
        ammo_count--;
        updateAmmoDisplay();
        setTimeout(() => {
          if(newBullet && newBullet.obj && newBullet.obj.parentElement) {
            newBullet.obj.remove();
            let index = bullets.indexOf(newBullet);
            if(index > -1) bullets.splice(index, 1);
          }
        }, 5000);
      }
    }
  })
  
  setTimeout(loop,100);
  setTimeout(countdown,100);
})

function spawnAmmo(count) {
  for(let i = 0; i < count; i++) {
    ammo_boxes.push(new AmmoPack());
  }
}

class AmmoPack {
  constructor() {
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("color", "yellow");
    this.obj.setAttribute("radius", "0.3");
    this.obj.setAttribute("position", {x: rnd(-70, 70), y: 0.5, z: rnd(-70, 70)});
    scene.appendChild(this.obj);
  }
  
  remove() {
    this.obj.remove();
  }
}

function updateScore() {
  document.getElementById("score").innerText = "Score: " + enemy_killed;
}

function updateAmmoDisplay() {
  let hud = document.getElementById("ammo");
  if(hud) hud.innerText = "Ammo: " + ammo_count;
  let vr = document.getElementById("ammoText");
  if(vr) vr.setAttribute('text', 'value: Ammo: ' + ammo_count + '; color: red; align: center; width: 2');
}

function spawnSpiders(count) {
  for(let i = 0; i < count; i++) {
    enemies.push(new Spider());
  }
}

function loop(){
  let playerPos = camera.object3D.position;
  for(let a = 0; a < ammo_boxes.length; a++) {
    let ammoPos = ammo_boxes[a].obj.object3D.position;
    let dist = Math.sqrt(Math.pow(playerPos.x - ammoPos.x, 2) + Math.pow(playerPos.y - ammoPos.y, 2) + Math.pow(playerPos.z - ammoPos.z, 2));
    if(dist < 2) {
      if(ammo_boxes[a].obj.parentElement) {
        ammo_boxes[a].obj.remove();
      }
      ammo_boxes.splice(a, 1);
      ammo_count += 5;
        updateAmmoDisplay();
      a--;
    }
  }
  

  for(let b = 0; b < bullets.length; b++) {
    let bullet = bullets[b];
    bullet.fire();
    
    if(Math.abs(bullet.obj.object3D.position.x) > 150 || 
       Math.abs(bullet.obj.object3D.position.z) > 150 ||
       bullet.obj.object3D.position.y < -10) {
      if(bullet.obj.parentElement) {
        bullet.obj.remove();
      }
      bullets.splice(b, 1);
      b--;
      continue;
    }

    for(let i = 0; i < enemies.length; i++) {
      if(distance(bullet.obj, enemies[i].obj) < 1) {
        enemies[i].remove();
        enemies.splice(i, 1);
        if(bullet.obj.parentElement) {
          bullet.obj.remove();
        }
        bullets.splice(b, 1);
        b--;
        enemy_killed++;
        updateScore();
        enemies.push(new Spider());
        break;
      }
    }
  }
 
  window.requestAnimationFrame(loop);
}

function countdown(){

  setTimeout(countdown,1000);
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}

class Spider {
  constructor() {
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("position", {x: rnd(-70, 70), y: 0.5, z: rnd(-70, 70)});
    this.obj.setAttribute("rotation", "0 0 0");
    this.obj.setAttribute("scale", "0.4 0.4 0.4");

    let eye1 = document.createElement("a-sphere");
    eye1.setAttribute("src", "#spidereye");
    eye1.setAttribute("position", "0.5 0.25 0.85");
    eye1.setAttribute("radius", "0.175");
    this.obj.appendChild(eye1);
    
    let eye2 = document.createElement("a-sphere");
    eye2.setAttribute("src", "#spidereye");
    eye2.setAttribute("position", "0.2 0.25 0.85");
    eye2.setAttribute("radius", "0.25");
    this.obj.appendChild(eye2);
    
    let eye3 = document.createElement("a-sphere");
    eye3.setAttribute("src", "#spidereye");
    eye3.setAttribute("position", "-0.2 0.25 0.85");
    eye3.setAttribute("radius", "0.25");
    this.obj.appendChild(eye3);
    
    let eye4 = document.createElement("a-sphere");
    eye4.setAttribute("src", "#spidereye");
    eye4.setAttribute("position", "-0.5 0.25 0.85");
    eye4.setAttribute("radius", "0.175");
    this.obj.appendChild(eye4);
    

    let body1 = document.createElement("a-entity");
    body1.setAttribute("position", "0 0 0");
    
    let sphere1 = document.createElement("a-sphere");
    sphere1.setAttribute("src", "#spiderskin");
    sphere1.setAttribute("position", "0 0 0");
    body1.appendChild(sphere1);
    
    let leg1 = document.createElement("a-cylinder");
    leg1.setAttribute("src", "#spiderskin");
    leg1.setAttribute("position", "-1 0.5 0.25");
    leg1.setAttribute("radius", "0.25");
    leg1.setAttribute("height", "2");
    leg1.setAttribute("rotation", "0 0 45");
    body1.appendChild(leg1);
    
    let leg2 = document.createElement("a-cylinder");
    leg2.setAttribute("src", "#spiderskin");
    leg2.setAttribute("position", "-2.3 0.3 0.25");
    leg2.setAttribute("radius", "0.25");
    leg2.setAttribute("height", "2.5");
    leg2.setAttribute("rotation", "0 0 -45");
    body1.appendChild(leg2);
    
    let leg3 = document.createElement("a-cylinder");
    leg3.setAttribute("src", "#spiderskin");
    leg3.setAttribute("position", "1 0.5 0.25");
    leg3.setAttribute("radius", "0.25");
    leg3.setAttribute("height", "2");
    leg3.setAttribute("rotation", "0 0 -45");
    body1.appendChild(leg3);
    
    let leg4 = document.createElement("a-cylinder");
    leg4.setAttribute("src", "#spiderskin");
    leg4.setAttribute("position", "2.3 0.3 0.25");
    leg4.setAttribute("radius", "0.25");
    leg4.setAttribute("height", "2.5");
    leg4.setAttribute("rotation", "0 0 45");
    body1.appendChild(leg4);
    
    this.obj.appendChild(body1);
    

    let body2 = document.createElement("a-entity");
    body2.setAttribute("position", "0 0 -1.05");
    
    let sphere2 = document.createElement("a-sphere");
    sphere2.setAttribute("src", "#spiderskin");
    sphere2.setAttribute("position", "0 0 0");
    body2.appendChild(sphere2);
    
    let leg5 = document.createElement("a-cylinder");
    leg5.setAttribute("src", "#spiderskin");
    leg5.setAttribute("position", "-1 0.5 0.25");
    leg5.setAttribute("radius", "0.25");
    leg5.setAttribute("height", "2");
    leg5.setAttribute("rotation", "0 0 45");
    body2.appendChild(leg5);
    
    let leg6 = document.createElement("a-cylinder");
    leg6.setAttribute("src", "#spiderskin");
    leg6.setAttribute("position", "-2.3 0.3 0.25");
    leg6.setAttribute("radius", "0.25");
    leg6.setAttribute("height", "2.5");
    leg6.setAttribute("rotation", "0 0 -45");
    body2.appendChild(leg6);
    
    let leg7 = document.createElement("a-cylinder");
    leg7.setAttribute("src", "#spiderskin");
    leg7.setAttribute("position", "1 0.5 0.25");
    leg7.setAttribute("radius", "0.25");
    leg7.setAttribute("height", "2");
    leg7.setAttribute("rotation", "0 0 -45");
    body2.appendChild(leg7);
    
    let leg8 = document.createElement("a-cylinder");
    leg8.setAttribute("src", "#spiderskin");
    leg8.setAttribute("position", "2.3 0.3 0.25");
    leg8.setAttribute("radius", "0.25");
    leg8.setAttribute("height", "2.5");
    leg8.setAttribute("rotation", "0 0 45");
    body2.appendChild(leg8);
    
    this.obj.appendChild(body2);
    
    scene.appendChild(this.obj);
  }
  
  remove() {
    this.obj.remove();
  }
}