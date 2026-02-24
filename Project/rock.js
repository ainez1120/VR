
class Rock {
  constructor(x, y, z, shape = "box", size = 1) {
    this.obj = document.createElement(`a-${shape}`);
    this.obj.setAttribute("static-body", "shape: auto");
    this.obj.setAttribute("color", "gray");
    this.obj.setAttribute("src", "#rock");
    
    if (shape === "box") {
      this.obj.setAttribute("width", size);
      this.obj.setAttribute("height", size);
      this.obj.setAttribute("depth", size);
    } else if (shape === "sphere" || shape === "dodecahedron" || shape === "icosahedron" || shape === "octahedron" || shape === "tetrahedron") {
      this.obj.setAttribute("radius", size);
    }
    
    this.obj.setAttribute("position", {x: x, y: y, z: z});
    scene.appendChild(this.obj);
    if(typeof rocks === 'undefined') rocks = [];
    rocks.push(this);
  }
}
