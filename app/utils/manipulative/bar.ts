import {Manipulative, ManipulativeType} from './manipulatives';
import {DropZone} from '../dropzone'
export class Bar extends Manipulative {
    
        constructor(        
            theTargetScene:any,
            aValue:number,
            aResource:any,
            aDragPoint:DropZone,
            clickCallback?:()=>void,
            pointerdownCallback?:()=>void,
            pointeroverCallback?:()=>void,
            pointerupCallback?:()=>void,){
            super(theTargetScene, aValue, ManipulativeType.BAR, aResource, aDragPoint);
    
            
        }
        //bar specific rendering method
        render(x, y){
            super.render(x, y);
        }
    
    }