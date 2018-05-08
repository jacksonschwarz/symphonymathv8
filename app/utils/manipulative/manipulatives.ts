import {SoundManager} from "../soundmanager";

export class Manipulative{
    targetScene:any;
    value:number;
    type: ManipulativeType | string;
    resourceKey:string;
    onClick:()=>void;
    onPointerDown:()=>void;
    onPointerOver:()=>void;
    onPointerOut:()=>void;

    soundManager;

    dragPoint:{
        x:number,
        y:number,
        pullRadius:number
        acceptedType:string | ManipulativeType
    }

    constructor(
        theTargetScene:any,
        aValue:number,
        aType:ManipulativeType | string,
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
        pointeroutCallback?:()=>void
    ){
        this.targetScene=theTargetScene;
        this.value=aValue;
        this.type=aType;
        this.resourceKey=aResource;
        this.onClick=clickCallback;
        this.onPointerDown=pointerdownCallback;
        this.onPointerOver=pointeroverCallback;
        this.onPointerOut=pointeroutCallback;
        this.dragPoint=aDragPoint;


        this.soundManager=new SoundManager(this.targetScene, ["pickUp", "dropHit", "dropMiss"])

    }
 
    isDragging:boolean=false;
    startDragMS:number=0;
    minDragDelay:number=400;
    origScale:number;
    dragSprite;
    pickUp;
    dropHit;
    dropMiss;

    private clickAndFollow(dragSprite, originX, originY){
        this.dragSprite = dragSprite;
        dragSprite.on("pointerdown", ()=>{
            if(!this.isDragging){
                this.startDrag();
             } else {
                this.stopDrag();
            }
        })
        dragSprite.on("pointerup", ()=>{
            if (this.isDragging) {
                var timeLapse:number = Date.now() - this.startDragMS;
                //var inOrigArea:boolean = this.checkBounds(dragSprite.x, dragSprite.y);    
                if(timeLapse>this.minDragDelay){
                    this.stopDrag();
                }   
            }
          
         })

        this.targetScene.input.on("pointermove", (pointer)=>{
            if(this.isDragging){
                dragSprite.x=pointer.x;
                dragSprite.y=pointer.y;
            }
        })
    }
    private checkBounds(x, y){
        if((x >= this.dragPoint.x-this.dragPoint.pullRadius && x <= this.dragPoint.x+this.dragPoint.pullRadius) 
        && (y >=this.dragPoint.y-this.dragPoint.pullRadius && y <=this.dragPoint.y+this.dragPoint.pullRadius)){
            return true;
        }
        else{
            return false;
        }
    }
    private startDrag() {
        console.log("pointer down, starting follow....");
        // this.pickUp.play();
        this.soundManager.play("pickUp");
        //this.dragSprite.setScale(this.origScale *1.3);
        this.isDragging=true;
        this.startDragMS = Date.now();                
    }
    private stopDrag() {
        console.log("pointer up, cancelling follow");
        //dragSprite.x=this.dragPoint.x;
        //dragSprite.y=this.dragPoint.y;
        //this.dragSprite.setScale(this.origScale);
        // this.dropHit.play();
        this.soundManager.play("dropHit");
        this.isDragging=false;
    }
    render(x, y, scale?){
        console.log("render called!")
        this.dragSprite = this.targetScene.add.sprite(x, y, this.resourceKey);
        this.dragSprite.setInteractive();
        this.origScale = this.dragSprite.scale;
        console.log(this.origScale);
        // this.pickUp=this.targetScene.sound.add("pickUp");
        this.dropHit=this.targetScene.sound.add("dropHit");
        this.dropMiss=this.targetScene.sound.add("dropMiss");
        let isDragging=false;
        this.clickAndFollow(this.dragSprite,x,y);
    }

}
export enum ManipulativeType{
    BAR="BAR",
    DOTCARD="DOTCARD",
}


