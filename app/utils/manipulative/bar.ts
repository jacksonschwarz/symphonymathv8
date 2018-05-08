import {Manipulative, ManipulativeType} from './manipulatives';
export class Bar extends Manipulative {
    
        constructor(        
            theTargetScene:any,
            aValue:number,
            aResource:string,
            aDragPoint:{
                x:number,
                y:number,
                pullRadius:number,
                acceptedType:string | ManipulativeType
            },
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