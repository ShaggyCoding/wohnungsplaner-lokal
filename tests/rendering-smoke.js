const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
class ClassList{constructor(){this.s=new Set}add(...x){x.forEach(v=>this.s.add(v))}remove(...x){x.forEach(v=>this.s.delete(v))}toggle(x,on){if(on===undefined)on=!this.s.has(x);on?this.s.add(x):this.s.delete(x)}contains(x){return this.s.has(x)}}
const gradient={addColorStop(){}};
const context=new Proxy({measureText:t=>({width:String(t).length*7}),createLinearGradient:()=>gradient},{get:(o,p)=>p in o?o[p]:(()=>{}),set:(o,p,v)=>(o[p]=v,true)});
class Element{constructor(id=''){this.id=id;this.value=id==='gridSize'?'50':id==='wallMode'?'cutaway':id==='wallHeight'?'250':'';this.checked=['snap','showFloor'].includes(id);this.classList=new ClassList;this.style={};this.clientWidth=1000;this.clientHeight=700;this.width=1000;this.height=700;this.files=[];this.dataset={}}getContext(){return context}getBoundingClientRect(){return{left:0,top:0,width:this.clientWidth,height:this.clientHeight}}querySelector(){return new Element}querySelectorAll(){return[]}append(){}appendChild(){}addEventListener(){}setPointerCapture(){}showModal(){}close(){}click(){}focus(){}matches(){return false}toDataURL(){return'data:image/png;base64,'}}
const elements=new Map,el=id=>{if(!elements.has(id))elements.set(id,new Element(id));return elements.get(id)};
const document={querySelector:s=>s.startsWith('#')?el(s.slice(1)):el(s),querySelectorAll:()=>[],createElement:t=>new Element(t)};
const sandbox={console,document,window:{},localStorage:{getItem:()=>null,setItem(){}},crypto:{randomUUID:()=>Math.random().toString(36)},Image:Element,URL:{createObjectURL:()=>''},confirm:()=>true,prompt:()=>'',setTimeout,clearTimeout,devicePixelRatio:1};
sandbox.window=sandbox;sandbox.globalThis=sandbox;
const code=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8')+String.raw`
;(()=>{
  variant=freshVariant(); project={id:'p',name:'Test',variants:[variant]}; projects=[project];
  const wall={id:'w',x1:0,y1:0,x2:500,y2:0,thickness:15}; variant.walls=[wall];
  variant.openings=[{id:'win',kind:'window',wallId:'w',t:.5,width:120,height:120,sill:90}];
  const parts=wallParts3D(wall,250);
  if(parts.length<4) throw new Error('Fenster segmentiert die 3D-Wand nicht korrekt');
  const a={x:0,y:100,w:100,d:40,h:80,rotation:35,elevation:0};
  const b={x:300,y:100,w:100,d:40,h:80,rotation:-20,elevation:0};
  if(overlapOBB(a,b)) throw new Error('Getrennte OBBs kollidieren fälschlich');
  b.x=20;if(!overlapOBB(a,b)) throw new Error('Überlappende OBBs werden nicht erkannt');
  const picture={id:'pic',name:'Bild',wallMount:true,wallId:'w',t:.5,side:1,w:80,d:4,h:60,elevation:140,rotation:0,color:'#999999'};
  variant.furniture=[picture];syncWallObjects();
  if(Math.abs(picture.x-250)>.01||picture.y<=0) throw new Error('Wandobjekt wird nicht an Wandfläche gebunden');
  viewMode='2d';draw();viewMode='3d';camera3d.initialized=false;draw();
})();`;
vm.runInNewContext(code,sandbox,{filename:'app.js'});
console.log('Rendering smoke test: OK');
