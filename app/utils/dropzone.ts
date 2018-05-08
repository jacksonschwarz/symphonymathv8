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
    dropZone;
    render(){
        this.dropZone=this.targetScene.add.sprite(this.x, this.y, "dropzone");
        this.dropZone.setAlpha(0.8);
        this.targetScene.tweens.add({
            targets:[this.dropZone],
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
                this.dropZone.displayWidth=75
                this.dropZone.displayHeight=100

                break;
            case "NUMBERTILE":
            this.dropZone.displayWidth=60
            this.dropZone.displayHeight=60
                break;
            default:
                break;
        }
    }
    checkBounds(x, y,manipulative:Manipulative){
        if(
            (x < this.x + this.dropZone.displayWidth && x > this.x-this.dropZone.displayWidth)
            &&
            (y < this.y + this.dropZone.displayHeight && y > this.y-this.dropZone.displayHeight)
            && manipulative.type == this.acceptedType){
            return true;
        }
        else{
            return false;
        }
    }
}