class Rock{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.obj = document.createElement("a-dodecahedron");
    this.obj.setAttribute("color","gray");
    this.obj.setAttribute("radius",0.5);
    this.obj.setAttribute('static-body', '');
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.appendChild(this.obj);

  }
}