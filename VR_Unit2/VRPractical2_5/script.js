

let maze = [
  "-----C--------------------",
  "T-BBBBB--BBBBBBBBBBBBBBB-T",
  "T-B----B-------B-------B-T",
  "T-B--B-B-BBBB--B-BBBB--B-T",
  "T-B-B----B----BB---B---B-T",
  "T-B-BSBB-B-BBB----BBBB-B-T",
  "T-B------B--B----B----BB-T",
  "T-BBBBBB-BBBSBBBB-B-B--B-T",
  "T-B------B-----B--B-B--B-T",
  "T-B--BBB-B-BBBBB--B-B--B-T",
  "T-B----B-B------B----B-B-T",
  "T-B-BB-BBB---BB-BBBB-B-B-T",
  "T-B-BB----B----B---B-----T",
  "T-BBBBBBBBBBBBBBBBBBB-BBB-",
  "TTTTTTTTTTTTTTTTTTT-G-TT-"
];

// treasures removed per user request; no treasure entities will be created.

window.addEventListener('DOMContentLoaded', function () {
  const scene = document.querySelector('a-scene');
  if (!scene) {
    console.error('a-scene not found');
    return;
  }

  class Block {
    constructor(x, y, z) {
      this.entity = document.createElement('a-box');
      this.entity.setAttribute('position', `${x} ${y} ${z}`);
      this.entity.setAttribute('depth', '1');
      this.entity.setAttribute('height', '1');
      this.entity.setAttribute('width', '1');
      this.entity.setAttribute('color', '#7B7B7B');
      this.entity.setAttribute('static-body', '');
      scene.appendChild(this.entity);
    }
  }

  class Tree {
    constructor(x, y, z) {
      this.entity = document.createElement('a-entity');

      const trunk = document.createElement('a-cylinder');
      trunk.setAttribute('radius', '0.4');
      trunk.setAttribute('height', '2');
      trunk.setAttribute('color', '#8B5A2B');
      // Center trunk so its bottom rests on the ground when entity y is 0
      trunk.setAttribute('position', '0 1 0');


      const foliage = document.createElement('a-sphere');
      foliage.setAttribute('radius', '1.2');
      foliage.setAttribute('color', '#2E8B57');
      foliage.setAttribute('position', '0 2.2 0');

      this.entity.appendChild(trunk);
      this.entity.appendChild(foliage);
      // Position the whole tree so its base sits on the ground plane
      this.entity.setAttribute('position', `${x} 0 ${z}`);
      scene.appendChild(this.entity);
    }
  }


  for (let r = 0; r < maze.length; r++) {
    const row = maze[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      const x = c - Math.floor(row.length / 2);
      const z = -r + Math.floor(maze.length / 2);
      const y = 0.5;

      if (ch === 'B') {
        new Block(x, y, z);
      } else if (ch === 'T') {
        new Tree(x, y, z);
      } else if (ch === 'S') {
        const start = document.createElement('a-cylinder');
        start.setAttribute('position', `${x} ${0.25} ${z}`);
        start.setAttribute('height', '0.1');
        start.setAttribute('radius', '0.5');
        start.setAttribute('color', '#00FF00');
        scene.appendChild(start);
      }
    }
  }


});
