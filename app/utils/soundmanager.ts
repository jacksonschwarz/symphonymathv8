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
            //aTargetScene.load.audio(someSoundKeys[i], `sounds/${someSoundKeys[i]}.mp3`);
            this.sounds.push(aTargetScene.sound.add(someSoundKeys[i]));
            
        }
        aTargetScene.load.once('filecomplete', this.doneLoad);
    }
    doneLoad():void {
        console.log('a file is done loading');
    }
    play(sound:string){
        let index=this.soundKeys.indexOf(sound);
        if (index>=0) {
            this.sounds[index].play();
        } else {
            console.log('audio not found:',sound);
        }
        
    }
}