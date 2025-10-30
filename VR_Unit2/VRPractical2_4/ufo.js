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
    top.setAttribute("color", "#00ff33");
    this.obj.append(top);

    let body = document.createElement("a-sphere");
    body.setAttribute("position", `0 -1 -2`);
    body.setAttribute("radius", "1.2");
    body.setAttribute("color", "lightgray");
    body.setAttribute("scale", "2 0.75 2");
    this.obj.append(body);
    

    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
    scene.append( this.obj )
  }

    invade(){
        this.a -= this.da;
        this.obj.setAttribute("position", {x:this.x, y:this.a, z:this.z});
    }

}