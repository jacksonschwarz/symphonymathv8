import {Manipulative, ManipulativeType} from './manipulatives';
import {DropZone} from "../dropzone";
export class DotCard extends Manipulative {
    
        constructor(        
            theTargetScene:any,
            aValue:number,
            aDragPoint:DropZone,
            clickCallback?:()=>void,
            pointerdownCallback?:()=>void,
            pointeroverCallback?:()=>void,
            pointerupCallback?:()=>void,){
            let frame=aValue.toString();
            let dotCard=theTargetScene.add.sprite(0, 0, "dotcards", frame)
            console.log(dotCard)
            super(theTargetScene, aValue, ManipulativeType.DOTCARD, dotCard, aDragPoint);
    
            
        }
        //dotcard specific rendering method
        render(x, y){
            super.render(x, y);
        }
    
    }