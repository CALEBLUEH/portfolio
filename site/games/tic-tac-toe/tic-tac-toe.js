mountPortfolioGame({title:'Tic Tac Toe',width:600,height:600,create({canvas,ctx,setNote}){
  const model=new PortfolioGames.TicTacToe();
  function reset(){model.reset();setNote('Two players · Keys 1–9 or click an empty cell · R to restart. No audio.');}reset();
  function move(i){model.move(i);canvas.dataset.state=model.over?(model.winner?'won':'draw'):'playing';canvas.dataset.board=model.cells.map(c=>c||'-').join('');canvas.dataset.turn=model.turn;}
  return {controls:['Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Numpad1','Numpad2','Numpad3','Numpad4','Numpad5','Numpad6','Numpad7','Numpad8','Numpad9','KeyR'],reset,
    key(code){if(code==='KeyR')reset();else move(Number(code.at(-1))-1);},
    pointer(x,y){if(x>=120&&x<480&&y>=150&&y<510)move(Math.floor((y-150)/120)*3+Math.floor((x-120)/120));},
    update(){canvas.dataset.state=model.over?(model.winner?'won':'draw'):'playing';canvas.dataset.board=model.cells.map(c=>c||'-').join('');canvas.dataset.turn=model.turn;},
    draw(){ctx.fillStyle='#080808';ctx.fillRect(0,0,600,600);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#fff';ctx.font='27px Consolas,monospace';ctx.fillText('T i c  T a c  T o e',300,40);ctx.font='19px Consolas,monospace';ctx.fillText('Player 1 [X]   Player 2 [O]',300,84);ctx.fillStyle='#ddd';ctx.fillText(model.over?(model.winner?`Player ${model.winner==='X'?1:2} [${model.winner}] won!`:'Draw.'):`Turn ${model.turn}: Player ${model.turn%2?1:2} [${model.turn%2?'X':'O'}]`,300,122);ctx.strokeStyle='#ddd';ctx.lineWidth=2;for(let i=1;i<3;i++){ctx.beginPath();ctx.moveTo(120+i*120,150);ctx.lineTo(120+i*120,510);ctx.stroke();ctx.beginPath();ctx.moveTo(120,150+i*120);ctx.lineTo(480,150+i*120);ctx.stroke();}for(let i=0;i<9;i++){ctx.fillStyle=model.line.includes(i)?'#a8e1be':model.cells[i]?'#fff':'#929292';ctx.font=(model.cells[i]?'50':'25')+'px Consolas,monospace';ctx.fillText(model.cells[i]||String(i+1),180+(i%3)*120,210+Math.floor(i/3)*120);}ctx.fillStyle='#bbb';ctx.font='17px Consolas,monospace';ctx.fillText(model.message|| (model.over?'Press R or Restart to play again.':'Choose a cell using keys 1–9 or a click.'),300,558);}
  };
}});
