(function(){
var $=function(i){return document.getElementById(i)},W=1080,H=1920,NAVY="#0e1a3a",GOLD="#C9A24B",CREAM="#f6efdc",URL=location.href.split("#")[0].split("?")[0];
function mk(){var c=document.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d");
 var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#0e1a3a");g.addColorStop(1,"#26356e");x.fillStyle=g;x.fillRect(0,0,W,H);
 x.strokeStyle=GOLD;x.lineWidth=6;x.strokeRect(40,40,W-80,H-80);x.lineWidth=2;x.strokeRect(58,58,W-116,H-116);
 x.textAlign="center";x.fillStyle=GOLD;x.font="700 34px Georgia,serif";
 x.fillText("✝",W/2,150);return [c,x]}
function foot(x){x.textAlign="center";x.fillStyle=GOLD;x.font="700 44px Georgia,serif";x.fillText("Cristo es el Mensaje",W/2,H-170);
 x.fillStyle=CREAM;x.font="30px Georgia,serif";x.fillText("Mallín Ahogado, Río Negro · Barrio Los Milagros",W/2,H-120);x.font="26px system-ui,sans-serif";x.fillStyle="#b9c2e0";x.fillText(URL.replace(/^https?:\/\//,""),W/2,H-80)}
function wrap(x,t,w){var ws=t.split(/\s+/),l=[],c="";ws.forEach(function(s){var n=c?c+" "+s:s;if(x.measureText(n).width>w&&c){l.push(c);c=s}else c=n});if(c)l.push(c);return l}
function verseImg(){var r=mk(),c=r[0],x=r[1],t=($("vtxt")||{}).textContent||"",ref=($("vref")||{}).textContent||"";
 x.fillStyle=CREAM;x.font="700 40px system-ui,sans-serif";x.fillText("PALABRA DEL DÍA",W/2,260);
 x.fillStyle=GOLD;x.fillRect(W/2-60,290,120,4);
 var fs=70,lines,lh,box=1000-0;
 for(;fs>=34;fs-=2){x.font="italic "+fs+"px Georgia,serif";lines=wrap(x,t,W-240);lh=fs*1.4;if(lines.length*lh<=1000)break}
 var y=330+(1000-lines.length*lh)/2+fs;x.fillStyle=CREAM;x.textAlign="center";
 lines.forEach(function(s,i){x.fillText(s,W/2,y+i*lh)});
 x.fillStyle=GOLD;x.font="700 48px Georgia,serif";x.fillText(ref,W/2,1480);foot(x);return c}
var MS=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
function calImg(){var r=mk(),c=r[0],x=r[1],n=new Date(Date.now()-3*3600*1000),y=n.getUTCFullYear(),m=n.getUTCMonth(),td=n.getUTCDate();
 x.fillStyle=CREAM;x.font="700 40px system-ui,sans-serif";x.fillText("CALENDARIO DE LA IGLESIA",W/2,260);
 x.fillStyle=GOLD;x.font="700 76px Georgia,serif";x.fillText(MS[m]+" "+y,W/2,370);
 var first=new Date(Date.UTC(y,m,1)).getUTCDay(),days=new Date(Date.UTC(y,m+1,0)).getUTCDate(),cw=130,gx=(W-cw*7)/2,gy=470;
 x.font="700 34px system-ui,sans-serif";x.fillStyle="#b9c2e0";["D","L","M","M","J","V","S"].forEach(function(l,i){x.fillText(l,gx+i*cw+cw/2,gy)});
 for(var d=1;d<=days;d++){var p=first+d-1,col=p%7,row=Math.floor(p/7),cx=gx+col*cw,cy=gy+20+row*cw,fast=d===(m===0?2:1),ev=col===6||col===2;
  if(fast||ev){x.fillStyle=fast?"#6f95d6":GOLD;x.beginPath();x.roundRect?x.roundRect(cx+8,cy+8,cw-16,cw-16,22):x.rect(cx+8,cy+8,cw-16,cw-16);x.fill()}
  if(d===td){x.strokeStyle="#fff";x.lineWidth=5;x.beginPath();x.roundRect?x.roundRect(cx+8,cy+8,cw-16,cw-16,22):x.rect(cx+8,cy+8,cw-16,cw-16);x.stroke()}
  x.fillStyle=(fast||ev)?NAVY:CREAM;x.font="700 44px system-ui,sans-serif";x.fillText(d,cx+cw/2,cy+cw/2+16)}
 var ly=1180;x.textAlign="left";x.font="34px system-ui,sans-serif";
 [[GOLD,"Sábados 17 hs · Merendero"],[GOLD,"Sábados 19 hs · Reunión"],[GOLD,"Martes 19 hs · Casa de oración"],["#6f95d6","Ayuno grupal"]].forEach(function(a,i){x.fillStyle=a[0];x.fillRect(190,ly+i*70-28,34,34);x.fillStyle=CREAM;x.fillText(a[1],245,ly+i*70)});
 x.textAlign="center";foot(x);return c}
function share(c,name,txt,btn){
 c.toBlob(function(b){var f;try{f=new File([b],name,{type:"image/png"})}catch(e){}
  var old=btn.textContent;
  if(f&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],text:txt}).catch(function(){})}
  else{var a=document.createElement("a");a.href=URL.createObjectURL?window.URL.createObjectURL(b):"";a.download=name;document.body.appendChild(a);a.click();a.remove();btn.textContent="✅ Imagen guardada: subila a tu estado";setTimeout(function(){btn.textContent=old},4000);
   if(navigator.share)navigator.share({text:txt,url:location.href}).catch(function(){})}
 },"image/png")}
function btn(label,after,fn){var b=document.createElement("button");b.type="button";b.textContent=label;
 b.setAttribute("style","display:block;margin:14px auto 0;padding:12px 20px;border:0;border-radius:999px;background:#25D366;color:#fff;font:700 15px system-ui,sans-serif;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,.2)");
 b.addEventListener("click",fn);after.appendChild(b);return b}
function init(){var v=$("vref"),cal=document.querySelector(".cal");
 if(v&&v.parentNode){var b1=btn("📲 Compartir en mi estado",v.parentNode,function(){share(verseImg(),"palabra-del-dia.png","Palabra del día 🙏 "+URL,b1)})}
 if(cal){var b2=btn("📲 Compartir el calendario",cal,function(){share(calImg(),"calendario-iglesia.png","Calendario de Cristo es el Mensaje 🙏 "+URL,b2)})}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
window.__ci=[verseImg,calImg];
})();
