(() => {
  const $ = s => document.querySelector(s);
  const escape = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const data = window.PORTFOLIO_DATA;
  let settings = PortfolioSettings.normalize(window.PORTFOLIO_SETTINGS);
  let language = 'en';
  try {language = localStorage.getItem('lyh-language') === 'zh' ? 'zh' : 'en';} catch {}
  const t = (en,zh) => language === 'zh' ? zh : en;
  const route = () => (location.hash.startsWith('#/') ? location.hash.slice(1) : '/').split('?')[0];
  const safeUrl = url => {if(typeof url !== 'string' || !url.trim()) return '';try {const u = new URL(url,location.href);return ['http:','https:'].includes(u.protocol) || (u.protocol === 'file:' && !url.includes(':')) ? escape(url) : '';}catch{return '';}};
  function applySettings() {
    const s = document.documentElement.style;
    for (const [key,name] of [['background','--paper'],['ink','--ink'],['accent','--accent']]) s.setProperty(name,settings[key]);
    for (const [key,name,unit] of [['contentWidth','--width','px'],['heroSpace','--hero-space','px'],['titleSize','--title-size','px'],['artSize','--art-size','']]) s.setProperty(name,settings[key]+unit);
  }
  function home() {
    return `<div class="wrap"><section class="hero ${settings.layout} ${settings.showArt?'':'no-art'}" aria-labelledby="home-title"><div class="hero-copy"><p class="eyebrow">${escape(t(settings.statusEn,settings.statusZh))}</p><h1 id="home-title"><span>Lueh</span><span>Yi Hong.</span></h1><p class="intro">${escape(t(settings.introEn,settings.introZh))}</p><div class="actions"><a class="button" href="#/games">${t('Explore games','浏览游戏')}</a><a class="button secondary" href="#/resume">${t('View resume','查看简历')}</a></div></div>${settings.showArt?`<img class="hero-art" src="assets/cover.png" alt="${t('Line art of a character surrounded by game, art, and 3D creation tools','被游戏、美术与 3D 创作工具围绕的角色线稿')}" width="1920" height="1080">`:''}</section><section class="section-rule" aria-labelledby="work-title"><div class="section-heading"><h2 id="work-title">${t('Choose a collection','作品分类')}</h2><p class="quiet">${t('Games, moving images, and objects.','游戏、动画与模型。')}</p></div><div class="entry-list"><a href="#/games" class="entry"><small>01 / ${t('INTERACTIVE','互动作品')}</small><h3>Game</h3><p class="quiet">${t('Explore individual game projects.','浏览各个游戏项目。')}</p></a><a href="#/visual" class="entry"><small>02 / ${t('VISUAL WORK','视觉作品')}</small><h3>Visual Production</h3><p class="quiet">${t('2D animation, 3D models, and 3D animation in one scrolling collection.','在一个连续页面中浏览 2D 动画、3D 模型与 3D 动画。')}</p></a></div></section></div>`;
  }
  const groups = [['mini-games','Mini Games','小游戏'],['projects','Projects','项目']];
  function games() {return `<div class="wrap"><div class="page-head"><p class="eyebrow">01 / ${t('INTERACTIVE','互动作品')}</p><h1>Game</h1><p class="quiet">${t('Choose a project to visit its page. Browser versions will be added as they become ready.','选择项目进入独立页面。浏览器版本将在准备完成后陆续加入。')}</p></div>${groups.map(([id,en,zh])=>`<section aria-labelledby="${id}"><h2 class="group-title" id="${id}">${t(en,zh)}</h2><div class="game-grid">${data.games.filter(g=>g.group===id).map(g=>`<a class="game-card" href="#/games/${g.id}"><div><span class="project-index">${escape(g.kind)}</span><h2>${escape(g.title)}</h2></div><span class="quiet">${t('View project','查看项目')}</span></a>`).join('')}</div></section>`).join('')}</div>`;}
  function game(id) {
    const g=data.games.find(g=>g.id===id);if(!g)return missing();
    const play=safeUrl(g.playUrl),video=safeUrl(g.videoUrl),download=safeUrl(g.downloadUrl);
    return `<div class="wrap project-layout"><div class="page-head"><a class="text-link" href="#/games">${t('All games','全部游戏')}</a><h1>${escape(g.title)}</h1><p class="quiet">${escape(g.kind)}</p></div>${play?`<section class="player ${g.portrait?'portrait':''}" style="--player-ratio:${escape(g.playerRatio||'800 / 689')}"><div class="launch-panel" id="launch-panel"><button class="button" id="launch-game" data-url="${play}">${t('Launch game','启动游戏')}</button><p class="quiet">${t(g.inputHint||'Desktop keyboard recommended. Click the game to focus.',g.inputHintZh||'建议使用电脑键盘。请点击游戏画面以启用操作。')}</p></div><div class="player-tools"><button class="button secondary" data-portfolio-fullscreen type="button">Fullscreen</button><span data-fullscreen-status role="status"></span></div><div id="game-frame"></div><p class="player-hint">${t(g.playerHint||'Mute and Fullscreen are beside the game. Hold Esc for about 2 seconds to exit fullscreen when Keyboard Lock is supported and allowed. Leaving the game pauses it.',g.playerHintZh||'静音与全屏按钮位于游戏旁。支持并允许 Keyboard Lock 时，按住 Esc 约 2 秒退出全屏。离开游戏画面时会暂停。')} <a href="${play}" target="_blank" rel="noopener">${t('Open game in a new tab','在新标签页中打开游戏')}</a></p></section>`:`<section class="placeholder"><h2>${t('Browser version coming later','浏览器版本尚未上线')}</h2><p>${t('This project has not been added to the website yet. Please check back for a playable version or a video.','本项目尚未加入网站。可玩版本或演示视频将在后续更新。')}</p></section>`}${g.overview?`<section class="game-description"><h2>${t('Overview','游戏简介')}</h2><p>${escape(t(g.overview,g.overviewZh||g.overview))}</p><h2>${t('Controls','操作说明')}</h2><p>${escape(t(g.controls,g.controlsZh||g.controls))}</p></section>`:''}${video?`<video controls preload="none" src="${video}"></video>`:''}${g.role?`<p>${escape(t(g.role,g.roleZh||g.role))}</p>`:''}${download?`<div class="actions"><a class="button secondary" href="${download}" target="_blank" rel="noopener">${t('Download game','下载游戏')}</a></div>`:''}</div>`;
  }
  function visuals() {return `<div class="wrap project-layout"><div class="page-head"><h1>Visual Production</h1></div><section class="placeholder"><p>${t('Visual work will be added later.','视觉作品将在之后加入。')}</p></section></div>`;}
  function resume() {return `<div class="wrap"><div class="page-head"><p class="eyebrow">${t('BACKGROUND & CONTACT','背景与联系')}</p><h1>Resume</h1><p class="quiet">${t('Choose the English or Chinese version.','选择英文或中文版本。')}</p></div><div class="resume-grid">${[['English','en'],['中文','zh']].map(([label,code])=>`<section class="resume-option"><h2>${label}</h2><p> Lueh Yi Hong · PDF</p><div class="actions"><a class="button" href="assets/resume-${code}.pdf" target="_blank" rel="noopener">${t('Open PDF','打开 PDF')}</a><a class="button secondary" href="assets/resume-${code}.pdf" download="LuehYiHong_Resume_${code}.pdf">${t('Download','下载')}</a></div></section>`).join('')}</div></div>`;}
  function missing(){return `<div class="wrap page-head"><h1>${t('Page not found','未找到页面')}</h1><a class="button" href="#/">${t('Return home','返回首页')}</a></div>`;}
  function render(focus=false) {
    applySettings();document.documentElement.lang=language==='zh'?'zh-Hans':'en';
    const path=route();
    $('#navigation').innerHTML=[['/','Home','首页'],['/games','Game','游戏'],['/visual','Visual Production','视觉作品'],['/resume','Resume','简历']].map(([url,en,zh])=>`<a href="#${url}" ${path===url||(url==='/games'&&path.startsWith('/games/'))?'aria-current="page"':''}>${t(en,zh)}</a>`).join('');
    $('#language').textContent=t('中文','EN');$('#language').setAttribute('aria-label',t('Switch to Chinese','切换至英文'));
    $('#menu-toggle').textContent=t('Menu','菜单');$('#navigation').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');
    $('#footer-note').textContent=t('Game development · Visual production','游戏开发 · 视觉作品');
    $('#main').innerHTML=path==='/'?home():path==='/games'?games():path.startsWith('/games/')?game(path.slice(7)):path==='/visual'?visuals():path==='/resume'?resume():missing();
    window.PortfolioFullscreen?.refresh();
    const heading=$('h1');document.title=(path==='/'?'Portfolio':heading?.textContent||'Portfolio')+' | Lueh Yi Hong';
    if(focus) {window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true});}
    const work=new URLSearchParams(location.hash.split('?')[1]||'').get('work');if(path==='/visual'&&work)requestAnimationFrame(()=>document.getElementById('work-'+work)?.scrollIntoView({behavior:'instant'}));
    $('#launch-game')?.addEventListener('click',e=>{const frame=document.createElement('iframe');frame.src=e.currentTarget.dataset.url;frame.title=heading.textContent+' game';frame.allow='fullscreen; gamepad; autoplay';const selectedGame=data.games.find(g=>g.playUrl===e.currentTarget.dataset.url);if(selectedGame?.motionSensors){const origins='https://itch.io https://html-classic.itch.zone https://html.itch.zone';frame.allow+='; accelerometer '+origins+'; gyroscope '+origins;}frame.allowFullscreen=true;$('#game-frame').replaceChildren(frame);$('#launch-panel').remove();});
  }
  $('.skip').addEventListener('click',e=>{e.preventDefault();$('#main').focus();$('#main').scrollIntoView({behavior:'instant'});});
  $('#language').addEventListener('click',()=>{language=language==='en'?'zh':'en';try{localStorage.setItem('lyh-language',language);}catch{}render();});
  $('#menu-toggle').addEventListener('click',()=>{const open=$('#navigation').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});
  window.addEventListener('hashchange',()=>render(true));
  window.addEventListener('message',e=>{if(window.parent===window||e.source!==window.parent)return;if(e.data?.type==='portfolio-preview'){settings=PortfolioSettings.normalize(e.data.settings);render();}});
  render();
  if(window.parent!==window)window.parent.postMessage({type:'portfolio-ready'},'*');
})();
