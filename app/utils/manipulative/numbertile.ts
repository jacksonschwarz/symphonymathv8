import {Manipulative, ManipulativeType} from './manipulatives';
import {DropZone} from "../dropzone";

export class NumberTile extends Manipulative {
    
        constructor(        
            theTargetScene:any,
            aValue:number | string,
            someDragPoints:DropZone[],
            clickCallback?:()=>void,
            pointerdownCallback?:()=>void,
            pointeroverCallback?:()=>void,
            pointerupCallback?:()=>void,){
            
            let numberTile;
            let frame=aValue.toString()
            if(frame=="+"){
                numberTile=theTargetScene.add.sprite(0, 0, "numbertiles","plus_symbol.png")
            }
            else if(frame=="="){
                numberTile=theTargetScene.add.sprite(0, 0, "numbertiles", "equals_symbol.png")                
            }
            else{
                numberTile=theTargetScene.add.sprite(0, 0, "numbertiles", frame+"_tex.png")                
            }

           
            // console.log(numberTile)
            super(theTargetScene, aValue, ManipulativeType.NUMBERTILE, numberTile, someDragPoints);
    
            
        }
        //dotcard specific rendering method
        render(x, y){
            super.render(x, y);
        }
    
    }