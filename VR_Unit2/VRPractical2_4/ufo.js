class Ufo{
  constructor(x,y,z,da){
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = y;
    this.da = da;

    this.obj = document.createElement("a-entity");
    
    let top = document.createElement("a-sphere");
    top.setAttribute("position", `0 0 -2`);
    top.setAttribute("radius", "1");
    top.setAttribute("color", "yellow");
    this.obj.append(top);
    
    
    let body = document.createElement("a-sphere");
    body.setAttribute("position", `0 -1 -2`);
    body.setAttribute("radius", "1.2");
    body.setAttribute("color", "lightgray");
    body.setAttribute("scale", "2 0.75 2");
    this.obj.append(body);
    

    let bottom = document.createElement("a-cone");
    bottom.setAttribute("position", `0 -3.5 -2`);
    bottom.setAttribute("rotation", "0 0 0");
    bottom.setAttribute("radius-bottom", "2");
    bottom.setAttribute("radius-top", "0.5");
    bottom.setAttribute("height", "7");
    bottom.setAttribute("color", "green");
    bottom.setAttribute("opacity", "0.2");
    this.obj.append(bottom);

    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
    scene.append( this.obj )
  }

    invade(){
        this.a -= this.da;
        this.obj.setAttribute("position", {x:this.x, y:this.a, z:this.z});
    }

}