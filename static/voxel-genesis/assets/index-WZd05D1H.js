(async function(){
  const parts = ["bundle.p0s0.b64","bundle.p0s1.b64","bundle.p0s2.b64","bundle.p1s0.b64","bundle.p1s1.b64","bundle.p1s2.b64","bundle.p2s0.b64","bundle.p2s1.b64","bundle.p2s2.b64","bundle.p3s0.b64","bundle.p3s1.b64","bundle.p3s2.b64","bundle.p4s0.b64","bundle.p4s1.b64","bundle.p4s2.b64","bundle.p5s0.b64","bundle.p5s1.b64","bundle.p5s2.b64","bundle.p6s0.b64","bundle.p6s1.b64","bundle.p6s2.b64","bundle.p7s0.b64","bundle.p7s1.b64","bundle.p7s2.b64","bundle.p8s0.b64"];
  const base = new URL('.', import.meta.url);
  const chunks = await Promise.all(parts.map(async (p) => {
    const res = await fetch(new URL(p, base));
    if (!res.ok) throw new Error('Failed to load ' + p + ': ' + res.status);
    return res.text();
  }));
  const b64 = chunks.join('').replace(/\s+/g, '');
  const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const stream = new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'));
  const code = await new Response(stream).text();
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const s = document.createElement('script');
  s.src = url;
  s.onload = () => URL.revokeObjectURL(url);
  document.head.appendChild(s);
})().catch((err) => {
  console.error(err);
  const t = document.createElement('pre');
  t.style.cssText = 'color:#ff6b2d;padding:1rem;white-space:pre-wrap';
  t.textContent = 'Voxel Genesis failed to load: ' + err;
  document.body.appendChild(t);
});
