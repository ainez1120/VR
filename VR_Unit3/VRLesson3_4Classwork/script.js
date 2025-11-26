let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let time_text, balls = [], t = 60, scene;

/* Challenge 3
   Create a variable to store score and set it to 0. 
   Create a variable to store the reference to the <a-text> for 
   displaying the score created in Challenge 1
*/ 
let score = 0;
let score_text;

class Ball{
  constructor(x,y,z){
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("position",`${x} ${y} ${z}`);
    this.obj.setAttribute("radius","0.5");
    this.obj.setAttribute("color","#EF2D5E");
    this.obj.setAttribute("class","clickable");
    this.obj.setAttribute("velocity",`${rnd(-1,1)} ${rnd(-1,1)} ${rnd(-1,1)}`);
    scene.appendChild(this.obj);

    this.obj.addEventListener("click",()=>{
      score += 1;
      this.obj.setAttribute("visible","false");
    });
  }
}

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  time_text = document.getElementById("time");
  // Challenge 4: Assign the variable to the <a-text> for displaying the score
  score_text = document.getElementById("score");
  for(let i = 0;i < 10; i++){
    let x = rnd(-10,10);
    let y = rnd(-10,10);
    let z = rnd(-10,10);

    balls.push(new Ball(x,y,z));
  }
  countdown();
  loop();
})

function countdown(){
  time_text.setAttribute("value",`Time: ${t}`);
  t--;
  setTimeout(countdown,1000);
}

function loop(){
  // Challenge 5:  Display the score in the HUD
  score_text.setAttribute("value",`Score: ${score}`);
  for(let ball of balls){
    ball.move();
  }
  window.requestAnimationFrame(loop);
}

// Challenge 6 is in the Ball class
Ball.prototype.move = function(){
  let pos = this.obj.getAttribute("position");
  let vel = this.obj.getAttribute("velocity");
  pos.x += vel.x * 0.1;
  pos.y += vel.y * 0.1;
  pos.z += vel.z * 0.1;
  if(pos.x > 10 || pos.x < -10) vel.x = -vel.x;
  if(pos.y > 10 || pos.y < -10) vel.y = -vel.y;
  if(pos.z > 10 || pos.z < -10) vel.z = -vel.z;
  this.obj.setAttribute("position",pos);
  this.obj.setAttribute("velocity",vel);
}