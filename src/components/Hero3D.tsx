import { useEffect, useRef } from "react";

// Forme 3D décorative dessinée à la main dans un canvas 2D (aucune bibliothèque) :
// deux icosaèdres en fil de fer qui tournent en sens inverse et s'inclinent vers la souris.

type V = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const RAW: V[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const VERTS: V[] = RAW.map((v) => {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
});

// Les arêtes sont les paires de sommets les plus proches l'une de l'autre (30 au total).
const EDGES: [number, number][] = (() => {
  const d = (a: V, b: V) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  let min = Infinity;
  for (let i = 0; i < VERTS.length; i++) for (let j = i + 1; j < VERTS.length; j++) min = Math.min(min, d(VERTS[i], VERTS[j]));
  const out: [number, number][] = [];
  for (let i = 0; i < VERTS.length; i++) for (let j = i + 1; j < VERTS.length; j++) if (d(VERTS[i], VERTS[j]) < min * 1.01) out.push([i, j]);
  return out;
})();

function rotate([x, y, z]: V, ax: number, ay: number, az: number): V {
  let c = Math.cos(ay), s = Math.sin(ay);
  [x, z] = [x * c + z * s, -x * s + z * c];
  c = Math.cos(ax); s = Math.sin(ax);
  [y, z] = [y * c - z * s, y * s + z * c];
  c = Math.cos(az); s = Math.sin(az);
  [x, y] = [x * c - y * s, x * s + y * c];
  return [x, y, z];
}

function hexToRgb(hex: string, fallback: string): string {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  return m ? `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}` : fallback;
}

export default function Hero3D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = 0;
    let raf = 0;
    let frame = 0;
    let visible = true;
    let c1 = "108,140,255";
    let c2 = "255,122,224";
    const mouse = { x: 0, y: 0 }; // -1 .. 1
    const tilt = { x: 0, y: 0 };
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = cv.clientWidth;
      cv.width = size * dpr;
      cv.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readColors = () => {
      const st = getComputedStyle(document.documentElement);
      c1 = hexToRgb(st.getPropertyValue("--accent-3"), c1);
      c2 = hexToRgb(st.getPropertyValue("--accent-2"), c2);
    };

    const shape = (scale: number, ax: number, ay: number, az: number, width: number) => {
      // Perspective : plus un sommet est proche (z grand), plus il est éloigné du centre.
      // Le rayon à l'écran vaut 0,3 × la taille du canvas (0,45 au plus près) : la forme reste dans le cadre.
      const cam = 3;
      const f = size * 0.3 * scale * cam;
      const pts = VERTS.map((v) => {
        const [x, y, z] = rotate(v, ax, ay, az);
        const k = f / (cam - z);
        return { x: size / 2 + x * k, y: size / 2 + y * k, z };
      });
      ctx.lineWidth = width;
      for (const [a, b] of EDGES) {
        const p = pts[a], q = pts[b];
        const depth = (p.z + q.z) / 2; // -1 (loin) .. 1 (près)
        const alpha = 0.12 + 0.5 * ((depth + 1) / 2);
        const g = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
        g.addColorStop(0, `rgba(${c1},${alpha})`);
        g.addColorStop(1, `rgba(${c2},${alpha})`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(${c2},${0.25 + 0.6 * ((p.z + 1) / 2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 + 1.8 * ((p.z + 1) / 2), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = () => {
      if (frame++ % 60 === 0) readColors();
      // La souris incline doucement la forme (mouvement amorti)
      tilt.x += (mouse.y * 0.5 - tilt.x) * 0.05;
      tilt.y += (mouse.x * 0.7 - tilt.y) * 0.05;
      ctx.clearRect(0, 0, size, size);
      shape(1, t * 0.5 + tilt.x, t * 0.8 + tilt.y, t * 0.2, 1.1);
      shape(0.5, -t * 0.7 - tilt.x, -t * 0.5 - tilt.y, -t * 0.3, 0.9);
    };

    const loop = () => {
      if (visible && !document.hidden) {
        t += 0.008;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    resize();
    readColors();
    t = 0.6;
    draw();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("pointermove", onMove);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="hero-3d" aria-hidden />;
}
