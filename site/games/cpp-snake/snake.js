mountPortfolioGame({title:'C++ Snake Game',width:672,height:552,create({canvas,ctx,setNote}){
  const model=new PortfolioGames.SnakeGame();let accumulator=0;
  function reset(){model.reset();accumulator=0;setNote('W A S D to move · X to stop · R to restart. Original game has no audio.');}reset();
  return {controls:['KeyW','KeyA','KeyS','KeyD','KeyX','KeyR'],reset,
    key(code){if(code==='KeyR'){reset();return;}if(code==='KeyX')model.stop();else model.turn({KeyW:'up',KeyA:'left',KeyS:'down',KeyD:'right'}[code]);},
    update(dt){accumulator+=dt;while(accumulator>=.05){model.tick();accumulator-=.05;}canvas.dataset.state=model.over?(model.won?'won':model.quit?'stopped':'lost'):model.direction==='stop'?'ready':'playing';canvas.dataset.score=model.score;canvas.dataset.head=`${model.x},${model.y}`;},
    draw(){ctx.fillStyle='#080808';ctx.fillRect(0,0,672,552);ctx.font='20px Consolas,monospace';ctx.textBaseline='top';ctx.textAlign='left';ctx.fillStyle='#e8e8e8';const cell=(x,y,c)=>ctx.fillText(c,x*16+1,y*22+5);for(let x=0;x<42;x++){cell(x,0,'#');cell(x,21,'#');}for(let y=0;y<20;y++){cell(0,y+1,'#');cell(41,y+1,'#');}if(model.fruit){ctx.fillStyle='#f1dd8c';cell(model.fruit.x+1,model.fruit.y+1,'F');}ctx.fillStyle='#b9d2be';for(const p of model.tail)cell(p.x+1,p.y+1,'o');ctx.fillStyle='#fff';cell(model.x+1,model.y+1,'O');ctx.font='18px Consolas,monospace';ctx.fillText('Score: '+model.score,16,492);ctx.fillStyle='#bbb';ctx.font='16px Consolas,monospace';ctx.fillText(model.over?(model.won?'Board cleared!':model.quit?'Game stopped.':'Game over. Press R to restart.'):'W A S D to move. The edges wrap.',16,522);}
  };
}});
