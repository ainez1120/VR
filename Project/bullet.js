class Bullet{
  constructor(){
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius", 0.5);
    this.obj.setAttribute("color", "red");

    let camPos = camera.object3D.position.clone();
    let direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.object3D.quaternion).normalize();
    let spawnOffset = direction.clone().multiplyScalar(1.2);
    let startPos = camPos.add(spawnOffset);
    this.obj.setAttribute("position", {x: startPos.x, y: startPos.y, z: startPos.z});
    scene.appendChild(this.obj);

    let speed = 10;
    this.dx = direction.x * speed;
    this.dy = direction.y * speed;
    this.dz = direction.z * speed;
  }
  fire(){
    this.obj.object3D.position.x += this.dx;
    this.obj.object3D.position.y += this.dy;
    this.obj.object3D.position.z += this.dz; 
  }
}