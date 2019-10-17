/*!
 * bulma-toast 1.5.3 
 * (c) 2018-present @rfoel <rafaelfr@outlook.com> 
 * Released under the MIT License.
 */
const defaults={message:"Your message here",duration:2e3,position:"top-right",closeOnClick:!0,opacity:1};let initialized=!1,containers={},positions={},doc=document;function init(){containers={noticesTopLeft:doc.createElement("div"),noticesTopRight:doc.createElement("div"),noticesBottomLeft:doc.createElement("div"),noticesBottomRight:doc.createElement("div"),noticesTopCenter:doc.createElement("div"),noticesBottomCenter:doc.createElement("div"),noticesCenter:doc.createElement("div")};for(let a in containers.noticesTopLeft.setAttribute("style",`${"width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"}left:0;top:0;text-align:left;align-items:flex-start;`),containers.noticesTopRight.setAttribute("style",`${"width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"}right:0;top:0;text-align:right;align-items:flex-end;`),containers.noticesBottomLeft.setAttribute("style",`${"width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"}left:0;bottom:0;text-align:left;align-items:flex-start;`),containers.noticesBottomRight.setAttribute("style",`${"width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"}right:0;bottom:0;text-align:right;align-items:flex-end;`),containers.noticesTopCenter.setAttribute("style",`${"width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"}top:0;left:0;right:0;text-align:center;align-items:center;`),containers.noticesBottomCenter.setAttribute("style",`${"width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"}bottom:0;left:0;right:0;text-align:center;align-items:center;`),containers.noticesCenter.setAttribute("style",`${"width:100%;z-index:99999;position:fixed;pointer-events:none;display:flex;flex-direction:column;padding:15px;"}top:0;left:0;right:0;bottom:0;flex-flow:column;justify-content:center;align-items:center;`),containers)doc.body.appendChild(containers[a]);positions={"top-left":containers.noticesTopLeft,"top-right":containers.noticesTopRight,"top-center":containers.noticesTopCenter,"bottom-left":containers.noticesBottomLeft,"bottom-right":containers.noticesBottomRight,"bottom-center":containers.noticesBottomCenter,center:containers.noticesCenter},initialized=!0}function toast(a){initialized||init();let b=Object.assign({},defaults,a);const c=new Toast(b),d=positions[b.position]||positions[defaults.position];d.appendChild(c.element)}function setDoc(a){for(let b in containers){let a=containers[b];a.parentNode.removeChild(a)}doc=a,init()}class Toast{constructor(a){this.element=doc.createElement("div"),this.opacity=a.opacity,this.type=a.type,this.animate=a.animate,this.dismissible=a.dismissible,this.closeOnClick=a.closeOnClick,this.message=a.message,this.duration=a.duration,this.pauseOnHover=a.pauseOnHover;let b=`width:auto;pointer-events:auto;display:inline-flex;white-space:pre-wrap;opacity:${this.opacity};`,c=["notification"];if(this.type&&c.push(this.type),this.animate&&this.animate.in&&(c.push(`animated ${this.animate.in}`),this.onAnimationEnd(()=>this.element.classList.remove(this.animate.in))),this.element.className=c.join(" "),this.dismissible){let a=doc.createElement("button");a.className="delete",a.addEventListener("click",()=>{this.destroy()}),this.element.insertAdjacentElement("afterbegin",a)}else b+="padding: 1.25rem 1.5rem";this.closeOnClick&&this.element.addEventListener("click",()=>{this.destroy()}),this.element.setAttribute("style",b),"string"==typeof this.message?this.element.insertAdjacentHTML("beforeend",this.message):this.element.appendChild(this.message);const d=new Timer(()=>{this.destroy()},this.duration);this.pauseOnHover&&(this.element.addEventListener("mouseover",()=>{d.pause()}),this.element.addEventListener("mouseout",()=>{d.resume()}))}destroy(){this.animate&&this.animate.out?(this.element.classList.add(this.animate.out),this.onAnimationEnd(()=>this.removeChild(this.element))):this.removeChild(this.element)}removeChild(a){a.parentNode&&a.parentNode.removeChild(a)}onAnimationEnd(a=()=>{}){const b={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(const c in b)if(this.element.style[c]!==void 0){this.element.addEventListener(b[c],()=>a());break}}}class Timer{constructor(a,b){this.timer,this.start,this.remaining=b,this.callback=a,this.resume()}pause(){window.clearTimeout(this.timer),this.remaining-=new Date-this.start}resume(){this.start=new Date,window.clearTimeout(this.timer),this.timer=window.setTimeout(this.callback,this.remaining)}}export{setDoc,toast};
