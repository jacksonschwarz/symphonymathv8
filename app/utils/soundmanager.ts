export class SoundManager{
    //phaser scene
    targetScene:any;
    //an array of sound keys to play
    soundKeys:string[];
    //an array of sound objects to play
    sounds:any[]=[];
    constructor(aTargetScene:any, someSoundKeys:string[]){
        this.targetScene=aTargetScene;
        this.soundKeys=someSoundKeys;
        for(let i=0;i<someSoundKeys.length;i++){
            aTargetScene.load.audio(someSoundKeys[i], `sounds/${someSoundKeys[i]}.mp3`)
            this.sounds.push(aTargetScene.sound.add(someSoundKeys[i]));
            
        }
    }
    play(sound:string){
        let index=this.soundKeys.indexOf(sound)
        this.sounds[index].play()
    }
}