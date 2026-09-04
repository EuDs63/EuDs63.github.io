(async function(){
  const parts = ["index-WZd05D1H.part0.js", "index-WZd05D1H.part1.js", "index-WZd05D1H.part2.js", "index-WZd05D1H.part3.js", "index-WZd05D1H.part4.js", "index-WZd05D1H.part5.js", "index-WZd05D1H.part6.js", "index-WZd05D1H.part7.js", "index-WZd05D1H.part8.js", "index-WZd05D1H.part9.js", "index-WZd05D1H.part10.js", "index-WZd05D1H.part11.js", "index-WZd05D1H.part12.js", "index-WZd05D1H.part13.js", "index-WZd05D1H.part14.js", "index-WZd05D1H.part15.js", "index-WZd05D1H.part16.js", "index-WZd05D1H.part17.js", "index-WZd05D1H.part18.js", "index-WZd05D1H.part19.js", "index-WZd05D1H.part20.js", "index-WZd05D1H.part21.js"];
  const base = new URL('.', import.meta.url);
  const texts = await Promise.all(parts.map(async (p) => {
    const res = await fetch(new URL(p, base));
    if (!res.ok) throw new Error('Failed to load ' + p + ': ' + res.status);
    return res.text();
  }));
  const code = texts.join('');
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
