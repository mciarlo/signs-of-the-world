/* Shared geometry for sign frames (primitives). Works in Node and the browser. */
(function (root) {
  const rad = d => d * Math.PI / 180;

  // Polygon with optionally rounded corners -> exact SVG path + sampled outline
  function roundedPoly(V, r, arcN) {
    arcN = arcN || 10;
    const n = V.length, pts = [], segs = [];
    for (let i = 0; i < n; i++) {
      const v = V[i], p = V[(i - 1 + n) % n], q = V[(i + 1) % n];
      let u = [p[0] - v[0], p[1] - v[1]], w = [q[0] - v[0], q[1] - v[1]];
      const lu = Math.hypot(u[0], u[1]), lw = Math.hypot(w[0], w[1]);
      u = [u[0] / lu, u[1] / lu]; w = [w[0] / lw, w[1] / lw];
      const th = Math.acos(Math.max(-1, Math.min(1, u[0] * w[0] + u[1] * w[1])));
      let t = r > 0.01 && th < 3.1 ? r / Math.tan(th / 2) : 0, rr = r;
      const tmax = 0.5 * Math.min(lu, lw);
      if (t > tmax) { t = tmax; rr = t * Math.tan(th / 2); }
      if (t <= 0) { segs.push({ v, A: v, B: v, rr: 0 }); pts.push(v); continue; }
      const A = [v[0] + u[0] * t, v[1] + u[1] * t], B = [v[0] + w[0] * t, v[1] + w[1] * t];
      const bis = [u[0] + w[0], u[1] + w[1]], lb = Math.hypot(bis[0], bis[1]) || 1, dc = rr / Math.sin(th / 2);
      const c = [v[0] + bis[0] / lb * dc, v[1] + bis[1] / lb * dc];
      const a0 = Math.atan2(A[1] - c[1], A[0] - c[0]);
      let da = Math.atan2(B[1] - c[1], B[0] - c[0]) - a0;
      while (da > Math.PI) da -= 2 * Math.PI; while (da <= -Math.PI) da += 2 * Math.PI;
      for (let k = 0; k <= arcN; k++) { const a = a0 + da * k / arcN; pts.push([c[0] + rr * Math.cos(a), c[1] + rr * Math.sin(a)]); }
      segs.push({ v, A, B, rr, sweep: da > 0 ? 1 : 0 });
    }
    const f = x => +x.toFixed(2);
    let d = `M${f(segs[0].A[0])} ${f(segs[0].A[1])}`;
    for (let i = 0; i < n; i++) {
      const s = segs[i], nx = segs[(i + 1) % n];
      if (s.rr > 0) d += `A${f(s.rr)} ${f(s.rr)} 0 0 ${s.sweep} ${f(s.B[0])} ${f(s.B[1])}`;
      d += `L${f(nx.A[0])} ${f(nx.A[1])}`;
    }
    return { pts, d: d + 'Z' };
  }

  function circle(cx, cy, r, n) {
    n = n || 96; const pts = [];
    for (let i = 0; i < n; i++) { const a = 2 * Math.PI * i / n; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    const f = x => +x.toFixed(2);
    return { pts, d: `M${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 0 ${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 0 ${f(cx - r)} ${f(cy)}Z` };
  }

  // frame layer: {k:'circle',cx,cy,r} | {k:'poly',v:[[x,y]...],r}
  function outline(f) { return f.k === 'circle' ? circle(f.cx, f.cy, f.r) : roundedPoly(f.v, f.r || 0); }

  const api = { roundedPoly, circle, outline };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Shapes = api;
})(typeof window !== 'undefined' ? window : globalThis);
