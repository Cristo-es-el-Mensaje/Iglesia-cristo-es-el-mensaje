(function(){
var SB="https://pljstzzscnhwtqgvdped.supabase.co",KEY="sb_publishable_StcU_tWQizcDQMgKFmtY8A_xOT9Zlt1";
var $=function(i){return document.getElementById(i)};
function get(p){return fetch(SB+"/rest/v1/"+p,{headers:{apikey:KEY}}).then(function(r){if(!r.ok)throw 0;return r.json()})}
function ar(){return new Date(Date.now()-3*3600*1000)}
var EV=[{d:6,h:17,n:"Merendero",s:"Compartimos una merienda y hermandad"},{d:6,h:19,n:"Reunión",s:"Alabanza, oración y la Palabra"},{d:2,h:19,n:"Casa de oración",s:"La dirección se avisa en el grupo de WhatsApp"}];
var DN=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
function next(){
 var n=ar(),best=null;
 EV.forEach(function(e){
  for(var k=0;k<8;k++){
   var t=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()+k,e.h,0));
   if(t.getUTCDay()!==e.d)continue;
   var diff=t-n;
   if(diff<-2*3600*1000)continue;
   if(!best||diff<best.diff)best={e:e,diff:diff,t:t};
   break;
  }
 });
 if(!best)return;
 var e=best.e,diff=best.diff,days=Math.round((Date.UTC(best.t.getUTCFullYear(),best.t.getUTCMonth(),best.t.getUTCDate())-Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()))/864e5);
 var k=$("nextk"),tt=$("nextt"),ss=$("nexts");
 if(diff<=0){k.textContent="Ahora";tt.textContent=e.n+" en curso";ss.textContent="Todavía llegás a tiempo. "+e.s}
 else{
  var when=days===0?"Hoy":days===1?"Mañana":"El "+DN[e.d];
  k.textContent=days===0?"Hoy nos vemos":"Próxima reunión";
  tt.textContent=when+" "+e.h+" hs · "+e.n;
  ss.textContent=days>1?("Faltan "+days+" días. "+e.s):e.s;
 }
}
function cal(){
 var n=ar(),y=n.getUTCFullYear(),m=n.getUTCMonth(),today=n.getUTCDate();
 var M=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
 $("calt").textContent=M[m]+" "+y;
 var first=new Date(Date.UTC(y,m,1)).getUTCDay(),days=new Date(Date.UTC(y,m+1,0)).getUTCDate();
 var h="";["D","L","M","M","J","V","S"].forEach(function(x){h+="<b>"+x+"</b>"});
 for(var i=0;i<first;i++)h+="<i></i>";
 for(var d=1;d<=days;d++){var w=(first+d-1)%7,c="";if(w===6||w===2)c+="ev ";if(d===today)c+="today";h+='<i class="'+c+'">'+d+"</i>"}
 $("calg").innerHTML=h;
}
function gcd(a,b){return b?gcd(b,a%b):a}
function rot(){get("verses?select=ref,body&order=id").then(function(v){if(!v.length)return;var n=v.length,slot=Math.floor((Date.now()-3*3600*1000)/(12*3600*1000)),P=211;while(gcd(P,n)!==1)P+=2;var x=v[(slot*P)%n];$("vtxt").textContent="“"+x.body+"”";$("vref").textContent=x.ref}).catch(function(){})}
function txt(id,v){var e=$(id);if(e&&v)e.textContent=v}
function load(){
 get("settings?select=key,value").then(function(rows){
  var s={};rows.forEach(function(r){s[r.key]=r.value});
  if(s.verse_text)$("vtxt").textContent="“"+s.verse_text.replace(/^[“"]|[”"]$/g,"")+"”";
  txt("vref",s.verse_ref);if(!s.verse_text)rot();
  txt("sattitle",s.sat_title);
  if(s.sat_text){$("sattext").textContent="“"+s.sat_text+"”";txt("satref",s.sat_ref)}else{$("sat").hidden=true}
  if(s.audio_path){var a=$("aud");a.src=SB+"/storage/v1/object/public/media/"+s.audio_path;a.load()}
 }).catch(function(){$("sat").hidden=true});
 get("gallery?select=path,caption&order=created_at.desc&limit=24").then(function(rows){
  if(!rows.length)return;
  $("galsec").hidden=false;
  var g=$("gal");
  rows.forEach(function(r){
   var f=document.createElement("figure"),u=SB+"/storage/v1/object/public/media/"+r.path,vid=/\.(mp4|webm|mov)$/i.test(r.path),im;
   if(vid){im=document.createElement("video");im.src=u+"#t=0.1";im.controls=true;im.playsInline=true;im.preload="metadata";im.setAttribute("playsinline","");im.addEventListener("play",function(){document.querySelectorAll("#gal video").forEach(function(v){if(v!==im)v.pause()})})}else{im=document.createElement("img");im.src=u;im.loading="lazy";im.alt=r.caption||"Foto de la comunidad"}
   f.appendChild(im);
   if(r.caption){var c=document.createElement("figcaption");c.textContent=r.caption;f.appendChild(c)}
   if(!vid)f.addEventListener("click",function(){$("lbi").src=u;$("lbc").textContent=r.caption||"";$("lb").classList.add("on")});
   g.appendChild(f);
  });
 }).catch(function(){});
}
(function(){var b=document.createElement("a"),t="¡Hola! Te invito a la iglesia Cristo es el Mensaje en Mallín Ahogado 🙏 Mirá nuestra página: "+location.href.split("#")[0];b.href="https://wa.me/?text="+encodeURIComponent(t);b.target="_blank";b.rel="noopener";b.textContent="💬 Invitar por WhatsApp";b.setAttribute("style","position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:50;background:#25D366;color:#fff;font:700 15px system-ui,sans-serif;padding:12px 16px;border-radius:999px;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,.3)");document.body.appendChild(b)})();
$("lbx").addEventListener("click",function(){$("lb").classList.remove("on")});
$("lb").addEventListener("click",function(e){if(e.target.id==="lb")$("lb").classList.remove("on")});
var a=$("aud"),p=$("play");a.addEventListener("play",function(){p.classList.add("on")});a.addEventListener("pause",function(){p.classList.remove("on")});
document.querySelectorAll(".divl,.next,.sat,.cal").forEach(function(el){if("IntersectionObserver" in window){new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");o.unobserve(e.target)}})},{threshold:.15}).observe(el)}else el.classList.add("in")});
next();cal();load();setInterval(next,60000);
})();
