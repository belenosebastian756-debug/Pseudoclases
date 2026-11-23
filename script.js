const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
const fmt=c=>c.replace(/\{/g," {\n  ").replace(/;(?=[^}])/g,";\n  ").replace(/\}/g,"\n}\n").trim();
const scope=(c,id)=>c.replace(/(^|\})\s*([^{}]+)\{/g,(m,a,s)=>a+"#"+id+" "+s.trim()+"{");
let n=0,css="",nav="",out="";
CATS.forEach((c,i)=>{
  nav+=`<a href="#c${i}">${c.t}</a>`;
  out+=`<section id="c${i}"><h2>${c.t}</h2>`;
  c.e.forEach(([sel,desc,html,code,note])=>{
    const id="d"+(n++);
    if(html)css+=scope(code,id)+"\n";
    out+=`<article><div><h3><code>${esc(sel)}</code></h3><p>${desc}</p><pre><code>${esc(fmt(code))}</code></pre></div><div class="demo"${html?` id="${id}"`:""}>${html||`<p class="nodemo">${note}</p>`}</div></article>`;
  });
  out+="</section>";
});
document.getElementById("nav").innerHTML=nav;
document.getElementById("main").innerHTML=out;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
document.addEventListener("click",e=>{if(e.target.closest(".demo a[data-x]"))e.preventDefault()});
