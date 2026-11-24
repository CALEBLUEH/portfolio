/* Browser adaptations of the supplied C++ rules. Rendering and browser APIs stay outside these models. */
(function(root){
  'use strict';
  class SnakeGame {
    constructor(random=Math.random){this.random=random;this.width=40;this.height=20;this.reset();}
    reset(){this.x=20;this.y=10;this.tail=[];this.direction='stop';this.nextDirection='stop';this.score=0;this.over=false;this.won=false;this.quit=false;this.placeFruit();}
    placeFruit(){const free=[];for(let y=0;y<this.height;y++)for(let x=0;x<this.width;x++)if(!(x===this.x&&y===this.y)&&!this.tail.some(p=>p.x===x&&p.y===y))free.push({x,y});if(!free.length){this.won=true;this.over=true;this.fruit=null;return;}this.fruit=free[Math.min(free.length-1,Math.floor(this.random()*free.length))];}
    turn(direction){const opposite={left:'right',right:'left',up:'down',down:'up'};if(!this.over&&opposite[direction]&&direction!==opposite[this.direction])this.nextDirection=direction;}
    stop(){this.over=true;this.quit=true;}
    tick(){if(this.over)return;this.direction=this.nextDirection;if(this.direction==='stop')return;const old={x:this.x,y:this.y};const delta={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[this.direction];this.x=(this.x+delta[0]+40)%40;this.y=(this.y+delta[1]+20)%20;const ate=this.fruit&&this.x===this.fruit.x&&this.y===this.fruit.y;const tail=[old,...this.tail];if(!ate)tail.pop();this.tail=tail;if(this.tail.some(p=>p.x===this.x&&p.y===this.y)){this.over=true;return;}if(ate){this.score+=10;this.placeFruit();}}
  }
  class TicTacToe {
    constructor(){this.reset();}
    reset(){this.cells=Array(9).fill('');this.turn=1;this.over=false;this.winner='';this.line=[];this.message='';}
    move(index){if(this.over)return false;if(!Number.isInteger(index)||index<0||index>8||this.cells[index]){this.message='Choose an empty cell.';return false;}const symbol=this.turn%2?'X':'O';this.cells[index]=symbol;this.message='';for(const line of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]])if(line.every(i=>this.cells[i]===symbol)){this.winner=symbol;this.line=line;this.over=true;return true;}if(this.turn===9)this.over=true;else this.turn++;return true;}
  }
  class SpaceShooter {
    constructor(random=Math.random){this.random=random;this.reset();}
    range(a,b){return a+this.random()*(b-a);}
    reset(){this.state='start';this.time=0;this.loading=0;this.clock=0;this.resetRound();}
    resetRound(){this.x=0;this.y=0;this.angle=0;this.health=3;this.invincible=0;this.shootTimer=0;this.time=0;this.spawnTimer=0;this.meteors=[];this.bullets=[];this.events=[];this.won=false;}
    begin(){if(this.state==='start'||this.state==='over'){this.resetRound();this.loading=0;this.state='loading';this.events.push('enter');}}
    meteor(x,y){const dx=.15+this.x-x,dy=.05+this.y-y,length=Math.hypot(dx,dy)||1;return {x,y,dx:dx/length,dy:dy/length,speed:this.range(.225,.9),radius:this.range(.0175,.07),angle:this.range(0,360),rotation:this.range(50,150)*(this.random()<.5?-1:1),crater:Array.from({length:49},()=>this.random()<.2),colours:Array.from({length:49},()=>this.range(.4,.7))};}
    spawn(){const side=Math.floor(this.random()*4);this.meteors.push(this.meteor(side<2?this.range(-1,1):side===2?-1.2:1.2,side<2?(side===0?1.2:-1.2):this.range(-1,1)));}
    fire(){if(this.state!=='playing'||this.shootTimer>0)return;const angle=(this.angle+90)*Math.PI/180,dx=Math.cos(angle),dy=Math.sin(angle);this.bullets.push({x:this.x+dx*.08,y:this.y+dy*.08,dx,dy,radius:.02});this.shootTimer=3;this.events.push('shoot');}
    step(dt,keys={}){
      this.clock+=dt;
      if(this.state==='start'){if(keys.Space)this.begin();return;}
      if(this.state==='over'){if(keys.KeyR)this.begin();return;}
      if(this.state==='loading'){this.loading+=dt;if(this.loading>=2){this.state='playing';this.events.push('bgm');}return;}
      this.time+=dt;this.invincible=Math.max(0,this.invincible-dt);this.shootTimer=Math.max(0,this.shootTimer-dt);
      if(keys.KeyJ)this.angle+=150*dt;if(keys.KeyK)this.angle-=150*dt;
      const angle=(this.angle+90)*Math.PI/180,dx=Math.cos(angle),dy=Math.sin(angle),move=(Number(!!keys.KeyW)-Number(!!keys.KeyS))*.75*dt;
      this.x=Math.max(-.9,Math.min(.9,this.x+dx*move));this.y=Math.max(-.9,Math.min(.9,this.y+dy*move));
      if(keys.Space)this.fire();
      this.spawnTimer+=dt;const delay=Math.max(.2,1-this.time*.01);if(this.spawnTimer>delay){this.spawn();this.spawnTimer=0;}
      for(let i=this.meteors.length-1;i>=0;i--){const m=this.meteors[i];m.x+=m.dx*m.speed*dt;m.y+=m.dy*m.speed*dt;m.angle+=m.rotation*dt;if(this.invincible<=0&&Math.hypot(m.x-this.x,m.y-this.y)<m.radius+.08){this.health--;this.invincible=2;if(this.health>0)this.events.push('hit');this.meteors.splice(i,1);}else if(Math.abs(m.x)>1.5||Math.abs(m.y)>1.5)this.meteors.splice(i,1);}
      for(let i=this.bullets.length-1;i>=0;i--){const b=this.bullets[i];b.x+=b.dx*1.5*dt;b.y+=b.dy*1.5*dt;const hit=this.meteors.findIndex(m=>Math.hypot(b.x-m.x,b.y-m.y)<b.radius+m.radius);if(hit>=0){this.meteors.splice(hit,1);this.bullets.splice(i,1);this.events.push('explode');}else if(Math.abs(b.x)>1.5||Math.abs(b.y)>1.5)this.bullets.splice(i,1);}
      if(this.health<=0||this.time>=60){this.won=this.health>0;this.state='over';this.events.push(this.won?'win':'lose');}
    }
  }
  const api={SnakeGame,TicTacToe,SpaceShooter};if(typeof module==='object'&&module.exports)module.exports=api;else root.PortfolioGames=api;
})(typeof window==='object'?window:globalThis);
