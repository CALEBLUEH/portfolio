(() => {
  'use strict';
  class GameAudio {
    constructor(){this.muted=false;this.suspended=false;this.started=false;this.tracks=new Set();this.bgm=null;this.desiredBgm='';try{this.muted=localStorage.getItem('lyh-game-muted')==='true';}catch{}}
    make(path){const a=new Audio(path);a.preload='none';a.muted=this.muted;a.hidden=true;a.dataset.gameAudio=path;document.body.append(a);this.tracks.add(a);a.addEventListener('ended',()=>{if(a!==this.bgm){this.tracks.delete(a);a.remove();}});return a;}
    play(a){if(!this.started||this.suspended)return;a.play().catch(e=>{if(e.name!=='AbortError'&&e.name!=='NotAllowedError')document.dispatchEvent(new CustomEvent('game-audio-error'));});}
    unlock(){this.started=true;if(this.desiredBgm&&!this.suspended)this.music(this.desiredBgm);}
    music(path){this.desiredBgm=path;if(!this.bgm||this.bgm.getAttribute('src')!==path){if(this.bgm){this.bgm.pause();this.tracks.delete(this.bgm);}this.bgm=this.make(path);this.bgm.loop=true;this.bgm.volume=.45;}this.play(this.bgm);}
    stopMusic(){this.desiredBgm='';if(this.bgm){this.bgm.pause();this.bgm.currentTime=0;}}
    effect(path){if(!this.started||this.suspended)return;const a=this.make(path);a.volume=.7;this.play(a);}
    setMuted(value){this.muted=value;for(const a of this.tracks)a.muted=value;try{localStorage.setItem('lyh-game-muted',String(value));}catch{}}
    suspend(value){this.suspended=value;if(value){for(const a of [...this.tracks]){a.pause();if(a!==this.bgm){this.tracks.delete(a);a.remove();}}}else if(this.desiredBgm&&this.bgm)this.play(this.bgm);}
    stop(){this.stopMusic();for(const a of this.tracks){a.pause();a.remove();}this.tracks.clear();this.bgm=null;}
  }
  window.mountPortfolioGame = function({title,width,height,create}) {
    const shell=document.getElementById('game-shell');
    shell.innerHTML=`<div class="toolbar" aria-label="Game controls"><span class="title"></span><button id="mute" type="button" aria-pressed="false">Mute</button><button id="fullscreen" type="button">Fullscreen</button><button id="restart" type="button">Restart</button><button id="pause" type="button" aria-pressed="false">Pause</button></div><div class="viewport"><canvas id="game" tabindex="0" aria-label="Game screen"></canvas></div><p class="game-note" id="game-note" role="status">Click the game to focus. Hold Esc about 2 seconds to exit fullscreen when Keyboard Lock is allowed.</p>`;
    shell.querySelector('.title').textContent=title;
    const canvas=document.getElementById('game');canvas.width=width;canvas.height=height;canvas.setAttribute('aria-label',title+' game screen');
    const viewport=shell.querySelector('.viewport');
    const resize=()=>{const scale=Math.min(viewport.clientWidth/width,viewport.clientHeight/height);canvas.style.width=(width*scale)+'px';canvas.style.height=(height*scale)+'px';};
    new ResizeObserver(resize).observe(viewport);resize();
    const audio=new GameAudio(),keys={},note=document.getElementById('game-note'),pauseButton=document.getElementById('pause');
    let paused=false,game,previous=0,frame=0,defaultNote='Click the game to focus. Hold Esc about 2 seconds to exit fullscreen when Keyboard Lock is allowed.';
    const setNote=text=>{defaultNote=text;if(!paused)note.textContent=text;};
    function setPaused(value){paused=value;for(const key of Object.keys(keys))delete keys[key];audio.suspend(value);pauseButton.textContent=value?'Resume':'Pause';pauseButton.setAttribute('aria-pressed',String(value));note.textContent=value?'Paused. Click the game or Resume to continue.':defaultNote;}
    function focus(){canvas.focus({preventScroll:true});audio.unlock();if(paused)setPaused(false);}
    const api={canvas,ctx:canvas.getContext('2d'),audio,keys,setNote,isPaused:()=>paused};game=create(api);
    const mute=document.getElementById('mute');
    function showMute(){mute.textContent=audio.muted?'Unmute':'Mute';mute.setAttribute('aria-pressed',String(audio.muted));}
    mute.addEventListener('click',()=>{audio.setMuted(!audio.muted);showMute();focus();});showMute();
    pauseButton.addEventListener('click',()=>{audio.unlock();setPaused(!paused);if(!paused)canvas.focus({preventScroll:true});});
    document.getElementById('restart').addEventListener('click',()=>{audio.stop();game.reset();focus();});
    const full=document.getElementById('fullscreen');
    full.addEventListener('click',async()=>{shell.dataset.fullscreenEnabled=String(document.fullscreenEnabled);shell.dataset.fullscreenGesture=String(navigator.userActivation?.isActive);try{if(document.fullscreenElement)await document.exitFullscreen();else await shell.requestFullscreen();delete shell.dataset.fullscreenError;focus();}catch(error){shell.dataset.fullscreenError=error.name+': '+error.message;note.textContent='Fullscreen is unavailable here. Use Open game in a new tab, then try again.';}});
    document.addEventListener('fullscreenchange',()=>{full.textContent=document.fullscreenElement?'Exit fullscreen':'Fullscreen';for(const k of Object.keys(keys))delete keys[k];});
    canvas.addEventListener('pointerdown',e=>{focus();const r=canvas.getBoundingClientRect();game.pointer?.((e.clientX-r.left)*width/r.width,(e.clientY-r.top)*height/r.height);});
    canvas.addEventListener('keydown',e=>{if(e.code==='Escape')return;if(['Tab','F5','F11','F12'].includes(e.code)||e.ctrlKey||e.metaKey||e.altKey)return;if(game.controls.includes(e.code)){e.preventDefault();audio.unlock();if(paused)setPaused(false);keys[e.code]=true;if(!e.repeat)game.key?.(e.code);}});
    window.addEventListener('keyup',e=>{delete keys[e.code];});
    canvas.addEventListener('blur',e=>{for(const key of Object.keys(keys))delete keys[key];if(!shell.querySelector('.toolbar').contains(e.relatedTarget))setPaused(true);});
    window.addEventListener('blur',()=>setPaused(true));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)setPaused(true);});
    window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);audio.stop();});
    window.addEventListener('storage',e=>{if(e.key==='lyh-game-muted'){audio.setMuted(e.newValue==='true');showMute();}});
    document.addEventListener('game-audio-error',()=>{note.textContent='Audio could not load. Gameplay is still available.';});
    function loop(now){const dt=Math.min(.05,Math.max(0,(now-(previous||now))/1000));previous=now;if(!paused)game.update?.(dt);game.draw();if(paused){const ctx=api.ctx;ctx.fillStyle='#000b';ctx.fillRect(0,0,width,height);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='24px monospace';ctx.fillText('PAUSED',width/2,height/2);ctx.font='16px monospace';ctx.fillText('Click to resume',width/2,height/2+32);}frame=requestAnimationFrame(loop);}
    frame=requestAnimationFrame(loop);
    // Expose a read-only diagnostic view through rendered DOM, useful for QA and accessibility.
    shell.dataset.game=title;
  };
})();
