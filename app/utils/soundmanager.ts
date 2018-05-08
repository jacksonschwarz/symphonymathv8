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
        console.log(aTargetScene)
        for(let i=0;i<someSoundKeys.length;i++){
            aTargetScene.load.audio(someSoundKeys[i], `sounds/${someSoundKeys[i]}.mp3`)
            this.sounds.push(aTargetScene.sound.add(someSoundKeys[i]));
            
        }
        console.log(this.sounds)
    }
    play(sound:string){
        let index=this.soundKeys.indexOf(sound)
        console.log(sound, index)
        this.sounds[index].play()
    }
}