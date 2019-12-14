!function(t){var i={};function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)e.d(s,n,function(i){return t[i]}.bind(null,n));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);var s=function(t,i){this.audio=t,this.sounds=i,this.playHandler=this.bind(this._playHandler)};s.prototype.sound=[0,0],s.prototype.play=function(t){this.sound=this.sounds[t],this.audio.currentTime=this.sound[0],this.audio.play(),this.audio.addEventListener("timeupdate",this.playHandler)},s.prototype.stop=function(){this.sound=[0,0],this.audio.currentTime=0,this.audio.pause(),this.audio.removeEventListener("timeupdate",this.playHandler)},s.prototype.bind=function(t){var i=this;return function(e){return t.call(i,e)}},s.prototype._playHandler=function(){this.audio.currentTime>=this.sound[1]&&this.stop()};var n,h,r,o=s,d=function(t){return ROCK.MATH.roundTo(t/(O/2),1)},a=function(){return ROCK.MATH.random(80,180)},c=function(){var t=P.toString().split(""),i=0,e=0,s=0;W.x=T,P>99?(i=Number(t[0]),e=Number(t[1]),s=Number(t[2]),W.visible=!0,X.visible=!0,z.visible=!0,W.x-=12):P>9?(e=Number(t[0]),s=Number(t[1]),W.visible=!1,X.visible=!0,z.visible=!0,W.x-=15):(s=Number(t[0]),W.visible=!1,X.visible=!1,z.visible=!0,W.x-=18),n!==R.GAME_OVER&&n!==R.SCORE||(W.x=ot.x+ot.width-34,W.y=87),W.frame=i,X.frame=e,z.frame=s,X.x=W.x+W.width+1,z.x=X.x+X.width+1,X.y=W.y,z.y=W.y},u=function(){var t=C.toString().split(""),i=0,e=0,s=0;C>99?(i=Number(t[0]),e=Number(t[1]),s=Number(t[2]),q.visible=!0,$.visible=!0,J.visible=!0):C>9?(e=Number(t[0]),s=Number(t[1]),q.visible=!1,$.visible=!0,J.visible=!0):(s=Number(t[0]),q.visible=!1,$.visible=!1,J.visible=!0),q.frame=i,$.frame=e,J.frame=s,$.x=q.x+q.width+1,J.x=$.x+$.width+1,$.y=q.y,J.y=q.y},l=function(t){switch(n=t){case R.SPLASH:ft.reset(),bt.reset(),P=0,W.y=15,c(),Z.visible=!1,ot.visible=!1,ht.visible=!1,rt.visible=!1,W.visible=!1,X.visible=!1,z.visible=!1,q.visible=!1,$.visible=!1,J.visible=!1,nt.visible=!1,it.visible=!1,tt.visible=!1,dt.visible=!1,D.visible=!1,at.visible=!1,et.visible=!0,st.visible=!0,Q.visible=!0,ft.bird.x=Q.x+Q.width+15,ft.bird.y=80,ft.hit.x=Q.x+Q.width+16,ft.hit.y=80;break;case R.GET_READY:et.visible=!1,st.visible=!1,Q.visible=!1,tt.visible=!0,dt.visible=!0,at.visible=!0,ft.bird.x=45,ft.bird.y=100,ft.hit.x=46,ft.hit.y=100;break;case R.PLAY:c(),tt.visible=!1,dt.visible=!1,it.visible=!0;break;case R.GAME_OVER:at.visible=!1,it.visible=!1,Z.visible=!0,ht.visible=!0,rt.visible=!0,f();break;case R.SCORE:at.visible=!1,it.visible=!1,et.visible=!1,st.visible=!1,ht.visible=!0,rt.visible=!0,f()}},f=function(){var t;ot.visible=!0,t=P,n===R.SCORE&&(t=C),t>=10&&(D.visible=!0),t>=40?D.frame=3:t>=30?D.frame=2:t>=20?D.frame=1:t>=10&&(D.frame=0),c(),P>C&&(C=P,_.set("best",C),nt.visible=!0),u()},b=function(){return new M("number",K,[[157,245],[165,245],[173,245],[181,245],[189,245],[197,245],[205,245],[213,245],[221,245],[229,245]],7,10,10,15)},p=function(t){yt&&vt.play(t)},x="ontouchstart"in window,v="touchstart",y="touchend",m=innerWidth,w=innerHeight,g=ROCK.MATH.truncate(w/(4/3)),O=(r=4,w>=1e3&&(r*=2),r),A=d(m=!x&&m>g?g:m),E=d(w),T=A/2,P=0,C=0,_=new ROCK.LocalStorage("frappybird"),R={SPLASH:1,GET_READY:2,PLAY:3,GAME_OVER:4,SCORE:5},S={},N=ROCK.Object.extend({x:0,y:0,z:0,width:0,height:0,rotation:0,visible:!0,xOffset:0,yOffset:0,opacity:1,bind:function(t,i){var e=this;if(this.scene.renderer){var s=function(t){var s,n,h;e.visible&&(x?(n=(s=t.changedTouches[0]).clientX-s.target.offsetLeft,h=s.clientY-s.target.offsetTop):(n=(s=t).offsetX,h=s.offsetY),new G("red",6,d(n),d(h)).hitTest(e)&&i.call(e,t,n,h),t.preventDefault())};this.scene.renderer.node.addEventListener(t,s),S[this.name]=S[this.name]||[],S[this.name].push({type:t,handler:i,handlerProxy:s})}return this},unbind:function(t,i){var e=S[this.name].filter((function(e){return e.type===t&&e.handler===i}))[0];S[this.name].splice(S[this.name].indexOf(e),1),this.scene.renderer.node.removeEventListener(t,e.handlerProxy)},move:function(t,i){return this[t]+=i,this[t]}}),M=N.extend({constructor:function(t,i,e,s,n,h,r){this.name=t,this.texture=i,this.x=h,this.y=r,this.width=s,this.height=n,this.frames=e},render:function(t){this.visible&&(t.context.imageSmoothingEnabled=!1,t.context.save(),t.context.scale(t.scale,t.scale),t.context.translate(this.x,this.y),this.rotation&&t.context.rotate(this.rotation*Math.PI/180),t.context.globalAlpha=this.opacity,t.context.drawImage(this.texture.img,this.frames[this.frame][0],this.frames[this.frame][1],this.width,this.height,this.xOffset,this.yOffset,this.width,this.height),t.context.restore(),this.renderer=t)},nextFrame:function(){this.frame<this.frames.length-1?this.frame++:this.frame=0},frame:0}),L=N.extend({constructor:function(t,i,e,s,n,h){this.name=t,this.fill=i,this.x=n,this.y=h,this.width=e,this.height=s},render:function(t){this.visible&&(t.context.save(),t.context.scale(t.scale,t.scale),t.context.translate(this.x,this.y),t.context.globalAlpha=this.opacity,t.context.fillStyle=this.fill,t.context.fillRect(0,0,this.width,this.height),t.context.restore(),this.renderer=t)}}),G=N.extend({constructor:function(t,i,e,s){this.fill=t,this.x=e,this.y=s,this.radius=i},render:function(t){this.visible&&(t.context.save(),t.context.scale(t.scale,t.scale),t.context.translate(this.x,this.y),t.context.globalAlpha=this.opacity,t.context.fillStyle=this.fill,t.context.beginPath(),t.context.arc(0,0,this.radius,0,2*Math.PI),t.context.closePath(),t.context.fill(),t.context.restore(),this.renderer=t)},hitTest:function(t){var i=this.x-Math.max(t.x,Math.min(this.x,t.x+t.width)),e=this.y-Math.max(t.y,Math.min(this.y,t.y+t.height));return i*i+e*e<this.radius*this.radius}}),I=ROCK.Object.extend({constructor:function(){this.children=[]},add:function(t){this.children.push(t),t.scene=this,t.z=this.children.length}}),j=ROCK.Object.extend({constructor:function(t,i,e){this.width=t,this.height=i,this.scale=e,this.node=document.createElement("canvas"),this.context=this.node.getContext(this.type),this.node.width=2*this.width,this.node.height=2*this.height,this.node.style.width=this.width+"px",this.node.style.height=this.height+"px"},render:function(){var t=this.scene.children.length;this.scene.renderer=this,this.node.width=2*this.width;for(var i=0;i<t;i++)this.scene.children[i].render(this);return this},appendTo:function(t){return t.appendChild(this.node),this},start:function(){var t=this;return this.frame=requestAnimationFrame((function(){t.start()})),this.render(),this.paused?this:(this.onFrameChange.call(this),this)},stop:function(){return cancelAnimationFrame(this.frame),this},setScene:function(t){return this.scene=t,this},pause:function(){return this.paused=!this.paused,this},type:"2d",width:500,height:500,scene:null,scale:1,frame:0,paused:!1}),k=ROCK.Object.extend({constructor:function(t){this.img=new Image,this.img.src=t}}),U=ROCK.Object.extend({constructor:function(){var t=[258,57],i=[258,70],e=[258,83];this.bird=new M("bird",K,[t,t,t,i,i,i,e,e,e,i,i,i],17,12,10,100),this.hit=new G("red",6,0,0),this.hit.opacity=0,this.bird.xOffset=this.bird.width/-2,this.bird.yOffset=this.bird.height/-2},update:function(){return this.updateVelocity(),this.updateRotation(),this.checkCollision(),this},flap:function(){if(!this.dead)return this.velocity=this.FLAP_IMPULSE,p("wing"),this},updateVelocity:function(){if(!this.floored)return this.velocity+=this.GRAVITY,this.velocity>this.MAX_VELOCITY&&(this.velocity=this.MAX_VELOCITY),this.bird.y+=this.velocity,this.hit.y+=this.velocity,this},updateRotation:function(){return this.velocity>0?this.bird.rotation+=this.velocity:this.bird.rotation=this.MAX_UP_ANGLE,this.bird.rotation>this.MAX_DOWN_ANGLE&&(this.bird.rotation=this.MAX_DOWN_ANGLE),this},updateWings:function(){return this.bird.rotation<=0&&this.bird.nextFrame(),this},checkCollision:function(){if(!this.floored){var t=bt.pipes[0],i=t[0],e=t[1];if(this.hit.y<0&&this.hit.x+this.hit.radius/2>=i.x&&(this.dead=!0),this.dead||!this.hit.hitTest(i)&&!this.hit.hitTest(e)||(this.dead=!0),!this.floored&&this.hit.hitTest(ut)&&(this.dead=!0,this.floored=!0,this.bird.y=ut.y+this.bird.yOffset),this.dead)return p("hit"),void(n!==R.GAME_OVER&&l(R.GAME_OVER));this.bird.x===i.x+i.width&&(P++,p("point"),c())}},reset:function(){this.velocity=0,this.dead=!1,this.floored=!1,this.bird.rotation=0},addTo:function(t){t.add(this.bird),t.add(this.hit)},FLAP_IMPULSE:-4,GRAVITY:.25,MAX_VELOCITY:15,MAX_UP_ANGLE:-20,MAX_DOWN_ANGLE:90,velocity:0,dead:!1,floored:!1}),Y=ROCK.Object.extend({constructor:function(){var t,i;this.pipes=[];for(var e=0;e<this.COUNT;e++)t=new M("pipeTop",K,[[293,0]],26,182,0,0),i=new M("pipeBottom",K,[[319,0]],26,182,0,0),this.pipes.push([t,i])},update:function(){for(var t,i,e,s,n,h=this.pipes[0],r=this.pipes[this.pipes.length-1],o=h[0],d=h[1],c=r[0],u=0;u<this.COUNT;u++)s=(t=this.pipes[u])[0],n=t[1],s.x-=1,n.x-=1;o.x+o.width<0&&(i=c.x+c.width+this.PIPE_SPACE,e=a(),o.x=i,d.x=i,o.y=e,d.y=e,o.y-=o.height+this.PIPE_GAP,this.pipes.push(this.pipes.shift()))},reset:function(){for(var t,i,e,s=A,n=a(),h=0;h<this.COUNT;h++)i=(t=this.pipes[h])[0],e=t[1],i.x=s,i.y=n,i.y-=i.height+this.PIPE_GAP,e.x=s,e.y=n,s=i.x+i.width+this.PIPE_SPACE,n=a()},addTo:function(t){for(var i,e,s,n=0;n<this.COUNT;n++)e=(i=this.pipes[n])[0],s=i[1],t.add(e),t.add(s)},COUNT:4,PIPE_SPACE:60,PIPE_GAP:50}),H=ROCK.Object.extend({constructor:function(){this.floors=[];for(var t,i=0,e=0;e<this.COUNT;e++)t=new M("floor",K,[[139,0]],154,56,i,200),this.floors.push(t),i+=t.width},addTo:function(t){for(var i=0;i<this.COUNT;i++)t.add(this.floors[i])},update:function(){for(var t=this.floors[0],i=this.floors[this.floors.length-1],e=0;e<this.COUNT;e++)this.floors[e].x-=1;t.x+t.width<0&&(t.x=i.x+i.width,this.floors.push(this.floors.shift()))},COUNT:5}),V=ROCK.Object.extend({constructor:function(){this.backgrounds=[];for(var t,i=0,e=0;e<this.COUNT;e++)t=new M("background",K,[[0,0]],138,256,i,0),this.backgrounds.push(t),i+=t.width},addTo:function(t){for(var i=0;i<this.COUNT;i++)t.add(this.backgrounds[i])},COUNT:3}),K=new k("spritesheet.png?v=2.0"),B=new j(m,w,O),F=new I,D=new M("medal",K,[[189,120],[212,120],[189,143],[212,143]],22,22,70,10),W=b(),X=b(),z=b(),q=b(),$=b(),J=b(),Q=new M("title",K,[[139,173]],96,22,30,20),Z=new M("gameOver",K,[[139,199]],94,19,30,40),tt=new M("getReady",K,[[139,221]],87,22,30,50),it=new M("playPauseButton",K,[[280,57],[280,72]],13,14,10,15),et=new M("startButton",K,[[246,199]],40,14,30,170),st=new M("scoreButton",K,[[246,169]],40,14,90,170),nt=new M("newBest",K,[[139,245]],16,7,90,170),ht=new M("okButton",K,[[246,139]],40,14,30,170),rt=new M("shareButton",K,[[246,184]],40,14,90,170),ot=new M("scoreBoard",K,[[139,57]],113,58,24,70),dt=new M("tap",K,[[139,120]],40,50,65,110),at=new L("hit","red",A,E-50,0,50),ct=new L("floorFill","#DBDA96",A,E,0,250),ut=new L("floorHit","red",A,50,0,200),lt=new V,ft=new U,bt=new Y,pt=new H,xt={sprite:(h="soundsprite",new Audio(`/audio/${h}.mp3`))},vt=window.soundSprite=new o(xt.sprite,{die:[0,1],hit:[2,3],point:[4,5],swoosh:[6,7],wing:[8,9]}),yt=!1,mt=function(){n!==R.PLAY&&l(R.PLAY),ft.flap()},wt=function(){ht.y+=1,this.unbind(v,wt),this.bind(y,gt)},gt=function(){this.y-=1,l(R.SPLASH),this.bind(v,wt),this.unbind(y,gt)},Ot=function(){this.y+=1,this.unbind(v,Ot),this.bind(y,At)},At=function(){this.y-=1;var t="https://twitter.com/intent/tweet?text=",i="I scored "+P+" on Frappy Bird! frappybird.com";n===R.SCORE&&(i="My best score on Frappy Bird is "+C+"! frappybird.com"),t+=encodeURIComponent(i),this.bind(v,Ot),this.unbind(y,At),location=t},Et=function(){this.y+=1,this.unbind(v,Et),this.bind(y,Tt)},Tt=function(){this.y-=1,l(R.GET_READY),this.bind(v,Et),this.unbind(y,Tt)},Pt=function(){this.y+=1,this.unbind(v,Pt),this.bind(y,Ct)},Ct=function(){this.y-=1,l(R.SCORE),this.bind(v,Pt),this.unbind(y,Ct)},_t=function(){this.y+=1,this.unbind(v,_t),this.bind(y,Rt)},Rt=function(){this.y-=1,0===this.frame?this.frame=1:this.frame=0,B.pause(),this.bind(v,_t),this.unbind(y,Rt)};x||(v="mousedown",y="mouseup"),at.opacity=0,ut.opacity=0,tt.x=T,tt.x-=tt.width/2,Z.x=T,Z.x-=Z.width/2,dt.x=T,dt.x-=dt.width/2,dt.x+=10,ot.x=T,ot.x-=ot.width/2,D.x=ot.x+13,D.y=ot.y+21,Q.x=T,Q.x-=Q.width/2,Q.x-=10,Q.y=70,q.x=ot.x+ot.width-34,q.y=108,nt.x=q.x-nt.width-2,nt.y=108,et.x=T,et.x-=et.width,et.x-=10,st.x=T,st.x+=10,ht.x=T,ht.x-=ht.width,ht.x-=10,rt.x=T,rt.x+=10,lt.addTo(F),F.add(Q),F.add(tt),F.add(dt),bt.addTo(F),ft.addTo(F),F.add(Z),F.add(ot),F.add(nt),F.add(W),F.add(X),F.add(z),F.add(q),F.add($),F.add(J),F.add(D),F.add(ht),F.add(rt),F.add(st),F.add(et),pt.addTo(F),F.add(ct),F.add(ut),F.add(at),F.add(it),l(R.SPLASH),B.setScene(F),B.onFrameChange=function(){switch(n){case R.SPLASH:case R.GET_READY:pt.update(),ft.updateWings();break;case R.PLAY:pt.update(),ft.update(),ft.updateWings(),bt.update();break;case R.GAME_OVER:ft.update()}},B.start(),at.bind(v,mt),ht.bind(v,wt),rt.bind(v,Ot),et.bind(v,Et),st.bind(v,Pt),it.bind(v,_t),C=_.get("best")||0,B.appendTo(document.body),"serviceWorker"in navigator?navigator.serviceWorker.register("/js/worker.js").then((function(t){console.log("Registration succeeded. Scope is "+t.scope)})).catch((function(t){console.log("Registration failed with "+t)})):console.log("no serviceWorker")}]);