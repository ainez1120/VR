class Rocket{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = y;
    this.da = 0.1;

    this.obj = document.createElement("a-entity");
    
    let body = document.createElement("a-cylinder");
    body.setAttribute("position", `0 -1.5 -2`);
    body.setAttribute("radius", "0.5");
    body.setAttribute("height", "2");
    body.setAttribute("color", "white");
    this.obj.append(body);
    
    let nose = document.createElement("a-cone");
    nose.setAttribute("position", `0 0 -2`);
    nose.setAttribute("radius-bottom", "0.5");
    nose.setAttribute("radius-top", "0");
    nose.setAttribute("height", "1");
    nose.setAttribute("color", "red");
    this.obj.append(nose);

    let flame = document.createElement("a-cone");
    flame.setAttribute("position", `0 -3.5 -2`);
    flame.setAttribute("rotation", "180 0 0");
    flame.setAttribute("radius-bottom", "0.5");
    flame.setAttribute("height", "2");
    flame.setAttribute("color", "orange");
    this.obj.append(flame);

    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
    scene.append( this.obj )
  }

    launch(){
    this.a += this.da;
    this.obj.setAttribute("position", {x:this.x, y:this.a, z:this.z});
    }

}
