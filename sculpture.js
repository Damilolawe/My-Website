// Three.js is loaded only for the decorative hero; essential UI is in script.js.
const canvas = document.querySelector('#sculpture');
const host = document.querySelector('#hero-art');
if (canvas && host) {
  try {
    const context=canvas.getContext('webgl2',{alpha:true,antialias:window.devicePixelRatio<2,powerPreference:'low-power'});
    if(!context)throw new Error('Use CPU artwork fallback');
    const THREE = await import('./vendor/three/three.module.min.js');
    const renderer = new THREE.WebGLRenderer({canvas,context,alpha:true,antialias:window.devicePixelRatio<2,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0,0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38,1,.1,30);
    camera.position.z=8.5;
    const group = new THREE.Group(); scene.add(group);
    // A continuous, bespoke inflated ribbon. Surface changes through a slow angular wave.
    const geometry = new THREE.TorusKnotGeometry(1.48,.47,180,24,2,3);
    const material = new THREE.MeshStandardMaterial({color:0xd1fa57,metalness:.72,roughness:.24});
    const knot = new THREE.Mesh(geometry,material); group.add(knot);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.45,.007,6,140),new THREE.MeshBasicMaterial({color:0x899e59,transparent:true,opacity:.5}));
    orbit.rotation.x=1.05;orbit.rotation.y=.4; group.add(orbit);
    scene.add(new THREE.AmbientLight(0xb5bd9f,2));
    [[0xffffff,100,[-2,4,5]],[0xd1fa57,65,[4,-2,2]],[0x9ba2ff,45,[-4,-1,-3]]].forEach(([color,intensity,pos])=>{
      const light=new THREE.PointLight(color,intensity);light.position.set(...pos);scene.add(light);
    });
    const resize=()=>{const {width,height}=host.getBoundingClientRect();if(!width||!height)return; renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();};
    new ResizeObserver(resize).observe(host);resize();
    let frame=0,visible=true,paused=!!window.AWE_MOTION_PAUSED,spin=0,last=0,angle=0;
    const target={x:0,y:0};
    host.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=host.getBoundingClientRect();target.x=((e.clientX-r.left)/r.width-.5)*.6;target.y=((e.clientY-r.top)/r.height-.5)*.6;});
    host.addEventListener('pointerleave',()=>{target.x=target.y=0;});
    document.querySelector('#sculpture-spin')?.addEventListener('click',()=>{spin+=Math.PI*1.3; if(paused){angle+=Math.PI/3;render(0);}});
    document.querySelector('#sculpture-material')?.addEventListener('click',e=>{material.wireframe=!material.wireframe;e.currentTarget.setAttribute('aria-pressed',String(material.wireframe));if(paused)render(0);});
    const render=(time)=>{
      frame=0; const dt=last?Math.min((time-last)/1000,.04):0;last=time;
      if(!paused){angle+=dt*.16;const change=spin*dt*3;angle+=change;spin-=change;}
      knot.rotation.set(angle*.7+target.y,angle+target.x,-.4);orbit.rotation.z=angle*.4;
      renderer.render(scene,camera);
      if(visible&&!paused&&!document.hidden)frame=requestAnimationFrame(render);
    };
    const sync=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!document.hidden)render(0);};
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'80px'}).observe(host);
    document.addEventListener('visibilitychange',sync);
    document.addEventListener('awe:motion',event=>{paused=event.detail.paused;sync();});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();visible=false;if(frame)cancelAnimationFrame(frame);host.classList.remove('ready');});
    canvas.addEventListener('webglcontextrestored',()=>location.reload());
    render(0);host.classList.add('ready');
  } catch { drawFallback(); }
}

// Software-projected 3D ribbon for browsers without GPU rendering.
// Same controls and visibility/motion lifecycle as the WebGL sculpture.
function drawFallback(){
  const ctx=canvas.getContext('2d');if(!ctx)return;
  let width=1,height=1,angle=.3,wire=false,frame=0,last=0,visible=true,paused=!!window.AWE_MOTION_PAUSED;
  const pointer={x:0,y:0};
  const points=Array.from({length:241},(_,i)=>{const t=i/240*Math.PI*2;return [(2+Math.cos(3*t))*Math.cos(2*t),(2+Math.cos(3*t))*Math.sin(2*t),Math.sin(3*t)];});
  const draw=time=>{
    frame=0;const dt=last?Math.min((time-last)/1000,.04):0;last=time;if(!paused)angle+=dt*.14;
    ctx.clearRect(0,0,width,height);
    const ry=angle+pointer.x,rx=.65+pointer.y,rz=-.35;
    const transformed=points.map(([x,y,z])=>{const a=x*Math.cos(ry)-z*Math.sin(ry),b=x*Math.sin(ry)+z*Math.cos(ry),c=y*Math.cos(rx)-b*Math.sin(rx),d=y*Math.sin(rx)+b*Math.cos(rx),xx=a*Math.cos(rz)-c*Math.sin(rz),yy=a*Math.sin(rz)+c*Math.cos(rz),scale=Math.min(width,height)*.105*(8/(8-d));return {x:width/2+xx*scale,y:height/2+yy*scale,z:d};});
    const pieces=transformed.slice(1).map((p,i)=>({a:transformed[i],b:p,z:(p.z+transformed[i].z)/2})).sort((a,b)=>a.z-b.z);
    const thick=Math.min(width,height)*.065;
    ctx.lineCap='round';ctx.lineJoin='round';
    pieces.forEach(({a,b,z})=>{const light=Math.max(18,Math.min(85,45+z*12));ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineWidth=wire?1:thick*(1+z*.04);ctx.strokeStyle=`hsl(76 75% ${light}%)`;ctx.stroke();if(!wire){ctx.beginPath();ctx.moveTo(a.x-thick*.12,a.y-thick*.16);ctx.lineTo(b.x-thick*.12,b.y-thick*.16);ctx.lineWidth=thick*.14;ctx.strokeStyle=`hsla(70,90%,90%,${.07+(z+3)*.025})`;ctx.stroke();}});
    if(visible&&!paused&&!document.hidden)frame=requestAnimationFrame(draw);
  };
  const sync=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!document.hidden)draw(0);};
  const resize=()=>{const r=host.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);width=r.width;height=r.height;canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);sync();};
  new ResizeObserver(resize).observe(host);
  host.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||paused)return;const r=host.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5;});
  host.addEventListener('pointerleave',()=>{pointer.x=pointer.y=0;});
  document.querySelector('#sculpture-spin')?.addEventListener('click',()=>{angle+=Math.PI/3;sync();});
  document.querySelector('#sculpture-material')?.addEventListener('click',e=>{wire=!wire;e.currentTarget.setAttribute('aria-pressed',String(wire));sync();});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'80px'}).observe(host);
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('awe:motion',e=>{paused=e.detail.paused;sync();});
  resize();host.classList.add('ready');host.dataset.renderer='software';
}
