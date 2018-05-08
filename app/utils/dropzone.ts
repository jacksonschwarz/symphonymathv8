import {Manipulative, ManipulativeType} from "./manipulative/manipulatives"
/**
 * For dragging manipulatives to the drop area
 */
export class DropZone{
    targetScene:any;
    x:number;
    y:number;
    pullRadius:number;
    acceptedType:ManipulativeType | string;

    //thinking for the future
    manipulativeInZone:Manipulative;
    
    constructor(aTargetScene:any,
                destX:number, 
                destY:number, 
                aPullRadius:number, 
                anAcceptedType:ManipulativeType | string)
    {
        this.targetScene=aTargetScene;
        this.x=destX;
        this.y=destY;
        this.pullRadius=aPullRadius;
        this.acceptedType=anAcceptedType;
    }
    render(){
        let dropZone=this.targetScene.add.sprite(this.x, this.y, "dropzone");
        dropZone.setAlpha(0.8);
        this.targetScene.tweens.add({
            targets:[dropZone],
            alpha:0.3,
            duration:2000,
            ease:"Sine.easeInOut",
            yoyo:true,
            repeat:-1
        })
        switch(this.acceptedType){
            case "BAR":
                break;
            case "DOTCARD":
                console.log("DOTCARD")
                dropZone.scaleX=1.5
                dropZone.scaleY=2
                break;
            case "NUMBERTILE":

                break;
            default:
                break;
        }
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