class Bullet{
  constructor(){
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius",0.5)
    this.obj.setAttribute("color", "red")
    let pos = camera.object3D.position;
    this.obj.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});
    scene.append(this.obj);
    

    let direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.object3D.quaternion);
    
    let speed = 0.5;
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