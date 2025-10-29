// Clean, fixed script.js — generates rockets (matching the given HTML snippet)
// and UFOs. Rockets use the declarative animation__rise attribute so the
// JS does not fight the animation. This file replaces a corrupted script.
  // Clean, fixed script.js — generates rockets (matching the given HTML snippet)
  // and UFOs. Rockets use the declarative animation__rise attribute so the
  // JS does not fight the animation. This file replaces a corrupted script.

  let rnd = (l, u) => Math.floor(Math.random() * (u - l) + l);

  window.addEventListener('DOMContentLoaded', function () {
    const scene = document.querySelector('a-scene');
    if (!scene) {
      console.error('a-scene not found');
      return;
    }
    console.log('script.js loaded — scene found');

    class Rocket {
      constructor(x, y, z) {
        this._pos = { x: x, y: y, z: z };
        this._startY = y;
        this.entity = document.createElement('a-entity');

        // set world position and declarative animation (to Y=12)
        this.entity.setAttribute('position', `${x} ${y} ${z}`);
        const toY = 12;
        this.entity.setAttribute(
          'animation__rise',
          `property: position; to: ${x} ${toY} ${z}; dur: 3000; dir: alternate; loop: true; easing: easeOutCubic`
        );

        const topCone = document.createElement('a-cone');
        topCone.setAttribute('radius-top', '0');
        topCone.setAttribute('radius-bottom', '0.5');
        topCone.setAttribute('height', '1');
        topCone.setAttribute('color', 'red');
        topCone.setAttribute('position', '0 0 -2');

        const body = document.createElement('a-cylinder');
        body.setAttribute('radius', '0.5');
        body.setAttribute('height', '2');
        body.setAttribute('color', 'gray');
        body.setAttribute('position', '0 -1.5 -2');

        const bottomCone = document.createElement('a-cone');
        bottomCone.setAttribute('radius-top', '0');
        bottomCone.setAttribute('radius-bottom', '0.25');
        bottomCone.setAttribute('height', '2');
        bottomCone.setAttribute('color', 'orange');
        bottomCone.setAttribute('position', '0 -3.5 -2');
        bottomCone.setAttribute('rotation', '-180 0 0');

        this.entity.appendChild(topCone);
        this.entity.appendChild(body);
        this.entity.appendChild(bottomCone);

        scene.appendChild(this.entity);
      }

      // JS fallback — won't run if declarative animation exists
      launch() {
        if (this.entity.hasAttribute('animation__rise')) return;
        if (!this._vy) this._vy = rnd(1, 5) * 0.02;
        if (!this._maxY) this._maxY = this._startY + rnd(5, 15);
        if (this._pos.y < this._maxY) {
          this._pos.y += this._vy;
          this.entity.setAttribute('position', `${this._pos.x} ${this._pos.y} ${this._pos.z}`);
        } else {
          this._pos.y = this._startY;
          this.entity.setAttribute('position', `${this._pos.x} ${this._pos.y} ${this._pos.z}`);
        }
      }
    }

    class UFO {
      constructor(x, y, z) {
        this._pos = { x: x, y: y, z: z };
        this._vy = rnd(1, 5) * 0.02;
        this._groundY = 0;
        this.entity = document.createElement('a-entity');

        const body = document.createElement('a-sphere');
        body.setAttribute('position', '0 0 0');
        body.setAttribute('radius', '0.5');
        body.setAttribute('color', '#00FF00');

        const dome = document.createElement('a-entity');
        dome.setAttribute('geometry', 'primitive: sphere; radius: 0.3');
        dome.setAttribute('position', '0 0.3 0');
        dome.setAttribute('scale', '1 0.5 1');
        dome.setAttribute('material', 'color: #0000FF');

        this.entity.appendChild(body);
        this.entity.appendChild(dome);
        this.entity.setAttribute('position', `${x} ${y} ${z}`);
        scene.appendChild(this.entity);
      }
    }

    const rockets = [];
    const rocketCount = 20; 
    const area = { xMin: -12, xMax: 12, zMin: -12, zMax: 12, yMin: -2, yMax: 2 };
    for (let i = 0; i < rocketCount; i++) {
      const x = Math.random() * (area.xMax - area.xMin) + area.xMin;
      const z = Math.random() * (area.zMax - area.zMin) + area.zMin;
      const y = Math.random() * (area.yMax - area.yMin) + area.yMin;
      rockets.push(new Rocket(Number(x.toFixed(2)), Number(y.toFixed(2)), Number(z.toFixed(2))));
    }
    console.log(`spawned ${rockets.length} rockets at random positions`);

    function animateRockets() {
      rockets.forEach((r) => {
        if (!r.entity.hasAttribute('animation__rise')) r.launch();
      });
      requestAnimationFrame(animateRockets);
    }
    animateRockets();
    console.log(`spawned ${rockets.length} rockets`);

    // spawn ufos
    const ufos = [];
    for (let i = 0; i < 20; i++) {
      const x = rnd(-10, 10);
      const z = rnd(-10, 10);
      const y = rnd(5, 15);
      ufos.push(new UFO(x, y, z));
    }

    function animateUFOs() {
      ufos.forEach((u) => {
        u._pos.y -= u._vy;
        if (u._pos.y <= u._groundY) u._pos.y = u._groundY;
        u.entity.setAttribute('position', `${u._pos.x} ${u._pos.y} ${u._pos.z}`);
      });
      requestAnimationFrame(animateUFOs);
    }
    animateUFOs();
    console.log(`spawned ${ufos.length} ufos`);

  });

