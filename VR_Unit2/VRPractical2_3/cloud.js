class Cloud{
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");

    let cloud1 = document.createElement("a-sphere");
    cloud1.setAttribute("color", "#d9fbff");
    cloud1.setAttribute("position", "0 1.5 0");
    cloud1.setAttribute("radius", "1.5");
    this.obj.append(cloud1);

    let cloud2 = document.createElement("a-sphere");
    cloud2.setAttribute("color", "#d9fbff");
    cloud2.setAttribute("position", "1.5 0.5 0");
    cloud2.setAttribute("radius", "1.5");
    this.obj.append(cloud2);

    let cloud3 = document.createElement("a-sphere");
    cloud3.setAttribute("color", "#d9fbff");
    cloud3.setAttribute("position", "-1.5 0.5 0");
    cloud3.setAttribute("radius", "1.5");
    this.obj.append(cloud3);

    let cloud4 = document.createElement("a-sphere");
    cloud4.setAttribute("color", "#d9fbff");
    cloud4.setAttribute("position", "0 0 0");
    cloud4.setAttribute("radius", "1.5");
    this.obj.append(cloud4);

    this.obj.setAttribute("position", { x: x, y: y, z: z });
    scene.append(this.obj);
  }
}

