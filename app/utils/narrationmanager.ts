import {SoundManager} from "./soundmanager";
import {Main} from "../scenes/default";
export class NarrationManager{
    targetScene:any;
    sounds:string[];
    soundManager:SoundManager;
    constructor(aTargetScene:any, someSounds:string[]){
        this.sounds=someSounds;
        this.targetScene=aTargetScene;
        this.soundManager=new SoundManager(aTargetScene, someSounds)
        // this.soundManager=Main.soundManager;
    }
    play(delay:number){
        let  i = 0
        let howManyTimes = this.sounds.length;
        let f=()=>{
            this.soundManager.play(this.sounds[i])
            i++;
            if( i < howManyTimes ){
                setTimeout( f, delay );
            }
        }
        f();
    }
}