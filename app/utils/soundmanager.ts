
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

        aTargetScene.load.audio("pre_3", "sounds/pre_3.mp3")
        for(let i=0;i<someSoundKeys.length;i++){
            let sound=this.targetScene.sound.add(someSoundKeys[i])
            this.sounds.push(sound);
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