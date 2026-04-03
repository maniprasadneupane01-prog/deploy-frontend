import { useEffect } from 'react';

function createNoise() {
  const perm = new Uint8Array(512);
  const grad = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
  for (let i=0;i<256;i++) perm[i]=perm[i+256]=Math.floor(Math.random()*256);
  const dot2 = (g,x,y) => g[0]*x + g[1]*y;
  return function noise(xin, yin) {
    const F2=0.5*(Math.sqrt(3)-1), G2=(3-Math.sqrt(3))/6;
    const s=(xin+yin)*F2, i=Math.floor(xin+s), j=Math.floor(yin+s);
    const t=(i+j)*G2, X0=i-t, Y0=j-t;
    const x0=xin-X0, y0=yin-Y0;
    const i1=x0>y0?1:0, j1=x0>y0?0:1;
    const x1=x0-i1+G2, y1=y0-j1+G2, x2=x0-1+2*G2, y2=y0-1+2*G2;
    const ii=i&255, jj=j&255;
    const g0=grad[perm[ii+perm[jj]]%8];
    const g1=grad[perm[ii+i1+perm[jj+j1]]%8];
    const g2=grad[perm[ii+1+perm[jj+1]]%8];
    let n0=0, n1=0, n2=0;
    let t0=0.5-x0*x0-y0*y0; if(t0>=0){t0*=t0; n0=t0*t0*dot2(g0,x0,y0);}
    let t1=0.5-x1*x1-y1*y1; if(t1>=0){t1*=t1; n1=t1*t1*dot2(g1,x1,y1);}
    let t2=0.5-x2*x2-y2*y2; if(t2>=0){t2*=t2; n2=t2*t2*dot2(g2,x2,y2);}
    return 70*(n0+n1+n2);
  };
}

const COLORS_DARK  = ['#C0522A','#D4714A','#D4A017','#E8B83A','#A03E1C','#7D2E11'];
const COLORS_LIGHT = ['#C0522A','#D4A017','#A03E1C','#E8B83A','#7D2E11','#D4714A'];

export function useParticleCanvas(canvasRef, theme = 'dark') {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const noise  = createNoise();
    let rafId, lastTime = 0;
    const FPS_CAP = 30;
    const MS_PER_FRAME = 1000 / FPS_CAP;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile  = window.innerWidth < 768;
    const COUNT     = isMobile ? 55 : 110;
    const COLORS    = theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;
    let   mx = 0, my = 0;
    let   noiseTime = 0;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = e => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);

    const particles = Array.from({ length: COUNT }, (_, i) => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      0,
      vy:      0,
      size:    1.5 + Math.random() * 3.5,
      opacity: 0.15 + Math.random() * 0.55,
      color:   COLORS[i % COLORS.length],
      ox:      Math.random() * 200,
      oy:      Math.random() * 200,
    }));

    function tick(timestamp) {
      rafId = requestAnimationFrame(tick);
      if (timestamp - lastTime < MS_PER_FRAME) return;
      lastTime = timestamp;
      noiseTime += 0.0015;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        const n     = noise(p.ox + noiseTime, p.oy + noiseTime);
        const angle = n * Math.PI * 2;
        p.vx += Math.cos(angle) * 0.025;
        p.vy += Math.sin(angle) * 0.025;

        const dx   = mx - p.x;
        const dy   = my - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 0 && dist < 180) {
          const force = (180 - dist) / 180 * 0.04;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (speed > 1.4) { p.vx *= 0.90; p.vy *= 0.90; }
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;
        p.ox += 0.002;
        p.oy += 0.002;

        if (p.x < -10)             p.x = canvas.width + 10;
        if (p.x > canvas.width+10) p.x = -10;
        if (p.y < -10)             p.y = canvas.height + 10;
        if (p.y > canvas.height+10)p.y = -10;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
    };
  }, [theme]);
}
