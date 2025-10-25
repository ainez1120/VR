class House {
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");

    let body = document.createElement("a-box");
    body.setAttribute("color", "white");
    body.setAttribute("width", "2.5");
    body.setAttribute("height", "1.5");
    body.setAttribute("depth", "2");
    body.setAttribute("position", "0 0.75 0");
    this.obj.append(body);

    let roof = document.createElement("a-cone");
    roof.setAttribute("color", "pink");
    roof.setAttribute("height", "1");
    roof.setAttribute("radius-bottom", "1.4");
    roof.setAttribute("position", "0 2 0");
    this.obj.append(roof);

    let door = document.createElement("a-box");
    door.setAttribute("color", "#6b3f2f");
    door.setAttribute("width", "0.5");
    door.setAttribute("height", "0.9");
    door.setAttribute("depth", "0.05");
    door.setAttribute("position", "0 0.45 1.01");
    this.obj.append(door);

    let winL = document.createElement("a-box");
    winL.setAttribute("color", "#bfe9ff");
    winL.setAttribute("width", "0.4");
    winL.setAttribute("height", "0.4");
    winL.setAttribute("depth", "0.05");
    winL.setAttribute("position", "-0.8 1 1.01");
    this.obj.append(winL);

    let winR = document.createElement("a-box");
    winR.setAttribute("color", "#bfe9ff");
    winR.setAttribute("width", "0.4");
    winR.setAttribute("height", "0.4");
    winR.setAttribute("depth", "0.05");
    winR.setAttribute("position", "0.8 1 1.01");
    this.obj.append(winR);

    this.obj.setAttribute("position", { x: x, y: y, z: z });
    scene.append(this.obj);
  }
}