import{w as e,n,t}from"./shared.js";const s=e(new Worker(new URL("handpose.js",import.meta.url),{type:"module"})).default;function o(e,n){return s.loadPose(e,n)}function i(e){return s.getPose(e)}function a(e,n){return s.setPose(e,n)}window.addEventListener("enter-vr",h),window.addEventListener("exit-vr",h);const r=new EventTarget;class d{#e;constructor({source:e,handPose:n}){this.handPose=n,this.size=e.hand.size,this.jointKeys=Array.from(e.hand.keys()),this.hand=e.hand,this.jointMatrixArray=new Float32Array(16*e.hand.size),this.handedness=e.handedness,this.#e=!0}async update(e,n,s){if(!this.#e)return[];this.#e=!1,s.fillPoses(this.hand.values(),n,this.jointMatrixArray);const o=await this.handPose.update(e.transform.matrix,t(this.jointMatrixArray,[this.jointMatrixArray.buffer]),this.handedness);return this.jointMatrixArray=o.usedHandArrayBuffer,this.#e=!0,o.distances}}const c=new Map;function h(){c.clear()}let f=!1;function u(){f=!0}function l(e,t,s,o){const i={};for(const n of e)n.hand&&(i[n.handedness]=n.hand);if(i.left&&i.right){const e=i.left.size,a=1+16*e+16*e+e+e;if(void 0!==o&&o.byteLength<4*a)throw Error(`Provided buffer too small it needs to be a float32 and the size needs to be ${a} (${4*a} bytes)`);const r=o||new Float32Array(a);r[0]=e;const d=new Float32Array(r.buffer,4,16*e),c=new Float32Array(r.buffer,4+16*e*4,16*e);return new Float32Array(r.buffer,4+16*e*4*2,2*e).fill(1),s.fillPoses(i.left.values(),t,d),s.fillPoses(i.right.values(),t,c),n(d),n(c),r}}function y(e,n,t){const s={handedness:n.handedness,distances:e},o=new CustomEvent("pose",{detail:s});r.dispatchEvent(o),t&&t(s)}function w(e,n,t,o){if(e&&t){if(undefined!==t.session&&function(e){e.addEventListener("reset",h),e.addEventListener("end",h),e.addEventListener("visibilitychange",h),e.addEventListener("inputsourceschange",h)}(t.session),f){const s=l(e,n,t);s&&(f=!1,function(e){const n=window.document.createElement("a");n.href=window.URL.createObjectURL(new Blob([new Uint8Array(e.buffer)],{type:"application/octet-stream"})),n.download="untitled.handpose",document.body.appendChild(n),n.click(),document.body.removeChild(n)}(s))}const i=t.getViewerPose(n);for(const a of e){const e=a.handedness;if(a.hand)if(c.has(e)){const s=c.get(e);if(s instanceof Promise)continue;s.update(i,n,t).then((e=>{e.length&&y(e,s,o)})).catch((function(e){console.log(e)}))}else{const n=new s;c.set(e,n),n.then((n=>{const s=t.session,o=new d({session:s,source:a,handPose:n});c.set(e,o)}))}}}}export{u as dumpHands,l as generatePose,i as getPose,o as loadPose,h as resetHands,a as setPose,w as update};
//# sourceMappingURL=handy-work.js.map