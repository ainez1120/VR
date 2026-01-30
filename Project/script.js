let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, bullets = [], enemies = [], ammo_boxes = [], ammo_count = 10, enemy_killed = 0;
let isShooting = false;
let aim;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  let cameraEntity = document.querySelector("#cameraEntity");

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
    this.obj.setAttribute("position", {x: rnd(-70, 70), y: 0.3, z: rnd(-70, 70)});
    this.obj.setAttribute("gltf-model", "#demoModel");
    this.obj.setAttribute("scale", "1 1 1");
    
    scene.appendChild(this.obj);
  }
  
  remove() {
    this.obj.remove();
  }
}