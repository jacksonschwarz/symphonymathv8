import {Manipulative, ManipulativeType} from './manipulatives';
import {DropZone} from "../dropzone";

export class NumberTile extends Manipulative {
    
        constructor(        
            theTargetScene:any,
            aValue:number,
            someDragPoints:DropZone[],
            clickCallback?:()=>void,
            pointerdownCallback?:()=>void,
            pointeroverCallback?:()=>void,
            pointerupCallback?:()=>void,){
            let frame=aValue.toString();
            let numberTile=theTargetScene.add.sprite(0, 0, "numbertiles", frame+"_tex.png")
            // console.log(numberTile)
            super(theTargetScene, aValue, ManipulativeType.NUMBERTILE, numberTile, someDragPoints);
    
            
        }
        //dotcard specific rendering method
        render(x, y){
            super.render(x, y);
        }
    
    }