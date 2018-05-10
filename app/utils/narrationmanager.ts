import {SoundManager} from "./soundmanager";
import {Main} from "../scenes/default";
import {Manipulative} from "./manipulative";
export class NarrationManager{
    targetScene:any;
    sounds:string[];
    soundManager:SoundManager;
    manipulatives:Manipulative[];

    constructor(aTargetScene:any, someSounds:string[], someManipulatives:Manipulative[]){
        this.sounds=someSounds;
        this.targetScene=aTargetScene;
        this.soundManager=new SoundManager(aTargetScene, someSounds)
        this.manipulatives=someManipulatives;
        // this.soundManager=Main.soundManager;
    }

    play(delay:number){
        let  i = 0
        let howManyTimes = this.sounds.length;
        let f=()=>{
            this.soundManager.play(this.sounds[i])
            this.manipulatives[i].pulse()        
            i++;
            
            if( i < howManyTimes ){
                setTimeout( f, delay );
                
            }
        }
        f();
    }
}