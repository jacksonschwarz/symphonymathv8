import {Manipulative, ManipulativeType} from './manipulatives';
import {DropZone} from "../dropzone";
export class DotCard extends Manipulative {
    
        constructor(        
            theTargetScene:any,
            aValue:number,
            someDragPoints:DropZone[],
            clickCallback?:()=>void,
            pointerdownCallback?:()=>void,
            pointeroverCallback?:()=>void,
            pointerupCallback?:()=>void,){
            let frame=aValue.toString();
            let dotCard=theTargetScene.add.sprite(0, 0, "dotcards", frame)
            super(theTargetScene, aValue, ManipulativeType.DOTCARD, dotCard, someDragPoints);
    
            
        }
        //dotcard specific rendering method
        render(x, y){
            super.render(x, y);
            
        }
    
    }