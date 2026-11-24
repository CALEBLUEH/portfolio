/* A master bus for Unity's Web Audio output. Does not suspend the engine's AudioContext. */
(function(root){
  function installUnityAudioBus({AudioNodeType=root.AudioNode,onChange=()=>{}}={}){
    let muted=false;try{muted=root.localStorage.getItem('lyh-game-muted')==='true';}catch{}
    const buses=new Map(),nativeConnect=AudioNodeType?.prototype.connect;
    const report=()=>onChange({muted,buses:buses.size,gains:[...buses.values()].map(b=>b.gain.value)});
    if(nativeConnect)AudioNodeType.prototype.connect=function(target,...args){
      const context=this.context;
      if(target===context.destination){
        let bus=buses.get(context);
        if(!bus){bus=context.createGain();bus.gain.value=muted?0:1;nativeConnect.call(bus,context.destination);buses.set(context,bus);report();}
        return nativeConnect.call(this,bus,...args);
      }
      return nativeConnect.call(this,target,...args);
    };
    function setMuted(value,persist=true){muted=!!value;for(const [context,bus] of buses){bus.gain.cancelScheduledValues?.(context.currentTime);bus.gain.value=muted?0:1;}if(persist)try{root.localStorage.setItem('lyh-game-muted',String(muted));}catch{}report();}
    report();return {setMuted,isMuted:()=>muted};
  }
  if(typeof module==='object'&&module.exports)module.exports={installUnityAudioBus};else root.installUnityAudioBus=installUnityAudioBus;
})(typeof window==='object'?window:globalThis);
