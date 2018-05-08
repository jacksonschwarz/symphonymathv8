import {Manipulative, ManipulativeType} from "./manipulative/manipulatives"
/**
 * For dragging manipulatives to the drop area
 */
export class DropZone{
    x:number;
    y:number;
    pullRadius:number;
    acceptedType:ManipulativeType | string;
    constructor(destX:number, 
                destY:number, 
                aPullRadius:number, 
                anAcceptedType:ManipulativeType | string)
    {
        this.x=destX;
        this.y=destY;
        this.pullRadius=aPullRadius;
        this.acceptedType=anAcceptedType;
    }
    render(){

    }
    checkBounds(x, y,manipulative:Manipulative){
        if(((x >= this.x-this.pullRadius && x <= this.x+this.pullRadius) 
        && (y >=this.y-this.pullRadius && y <=this.y+this.pullRadius))
        && manipulative.type == this.acceptedType){
            return true;
        }
        else{
            return false;
        }
    }
}