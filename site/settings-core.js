(() => {
  const defaults = {background:'#ffffff',ink:'#202020',accent:'#315b4e',layout:'art-right',artSize:112,contentWidth:1320,heroSpace:76,titleSize:92,showArt:true,statusEn:'Looking for an internship',statusZh:'正在寻找实习机会',introEn:'',introZh:''};
  function normalize(value) {
    const out = {...defaults};
    if (!value || typeof value !== 'object') return out;
    for (const key of ['background','ink','accent']) if (/^#[0-9a-f]{6}$/i.test(value[key])) out[key] = value[key];
    if (['art-right','art-left','stacked'].includes(value.layout)) out.layout = value.layout;
    for (const [key,min,max] of [['artSize',70,125],['contentWidth',960,1480],['heroSpace',24,120],['titleSize',60,112]]) {
      const n = Number(value[key]); if (Number.isFinite(n)) out[key] = Math.min(max,Math.max(min,n));
    }
    if (typeof value.showArt === 'boolean') out.showArt = value.showArt;
    for (const key of ['statusEn','statusZh','introEn','introZh']) if (typeof value[key] === 'string') out[key] = value[key].slice(0,600);
    return out;
  }
  window.PortfolioSettings = {normalize};
})();
