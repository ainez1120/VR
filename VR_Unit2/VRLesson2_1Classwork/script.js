window.addEventListener("DOMContentLoaded",function() {
  //Challenge 1: Create a variable scene for the <a-scene> component in the HTML
  let scene = document.querySelector("a-scene");


  //Challenge 2: Create a variable for <a-dodecahedron> and create it.
  let dodecahedron = document.createElement("a-dodecahedron");

  
  //Challenge 3: Change the <a-dodecahedron>'s position, radius and color
  dodecahedron.setAttribute("position","0 5 -5");
  dodecahedron.setAttribute("radius","3");
  dodecahedron.setAttribute("color","#ffcfeb");

  //Challenge 4: Add the <a-dodecahedron> to the scene
  scene.append( dodecahedron );

  /* Challenge Bonus
  1) Use a for loop to create a lot of <a-dodecahedron> 

  2) Change each <a-dodecahedron>'s position to a random x, y, and z location
  3) Change each <a-dodecahedron>'s to a random color.  Hint: Use rgb( ) and string interpolation 
  */

  
})