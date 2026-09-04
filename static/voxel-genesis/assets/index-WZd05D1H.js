(async function(){
  const parts = ["bundle.part0.b64", "bundle.part1.b64", "bundle.part2.b64", "bundle.part3.b64", "bundle.part4.b64", "bundle.part5.b64", "bundle.part6.b64", "bundle.part7.b64", "bundle.part8.b64"];
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
