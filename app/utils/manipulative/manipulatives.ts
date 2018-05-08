import {SoundManager} from "../soundmanager";
import {DropZone} from "../dropzone";

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

    dragPoints:DropZone[];

    constructor(
        theTargetScene:any,
        aValue:number,
        aType:ManipulativeType | string,
        // aResource:string,
        aSprite:any,
        someDragPoints:DropZone[],
        clickCallback?:()=>void,
        pointerdownCallback?:()=>void,
        pointeroverCallback?:()=>void,
        pointeroutCallback?:()=>void
    ){
        this.targetScene=theTargetScene;
        this.value=aValue;
        this.type=aType;
        // this.resourceKey=aResource;
        this.dragSprite=aSprite;
        this.onClick=clickCallback;
        this.onPointerDown=pointerdownCallback;
        this.onPointerOver=pointeroverCallback;
        this.onPointerOut=pointeroutCallback;
        this.dragPoints=someDragPoints;
        this.dragSprite=aSprite;

        this.dragSprite.visible=false;
    
        this.soundManager=new SoundManager(this.targetScene, ["pickUp", "dropHit", "dropMiss"])

    }
 
    isDragging:boolean=false;
    startDragMS:number=0;
    minDragDelay:number=400;
    origScale:number;
    dragSprite;

    private clickAndFollow(dragSprite, originX, originY){
        this.dragSprite = dragSprite;
        dragSprite.on("pointerdown", ()=>{
            if(!this.isDragging){
                this.startDrag();
             } else {
                this.stopDrag(originX, originY);
            }
        })
        dragSprite.on("pointerup", ()=>{
            if (this.isDragging) {
                var timeLapse:number = Date.now() - this.startDragMS;
                //var inOrigArea:boolean = this.checkBounds(dragSprite.x, dragSprite.y);    
                if(timeLapse>this.minDragDelay){
                    this.stopDrag(originX, originY);
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
    private startDrag() {
        // this.pickUp.play();
        this.soundManager.play("pickUp");
        //this.dragSprite.setScale(this.origScale *1.3);
        this.isDragging=true;
        this.startDragMS = Date.now();                
    }
    private stopDrag(originX, originY) {
        let isInBounds=false;
        for(let i=0;i<this.dragPoints.length;i++){
            if(this.dragPoints[i].checkBounds(this.dragSprite.x, this.dragSprite.y, this)){
                this.soundManager.play("dropHit");
                this.dragSprite.x=this.dragPoints[i].x;
                this.dragSprite.y=this.dragPoints[i].y;

                console.log("TRUE!")
                isInBounds=true;;
            }
        }
        if(!isInBounds){
            this.soundManager.play("dropMiss");
            this.dragSprite.x=originX;
            this.dragSprite.y=originY
        }

        console.log("FALSE!")

        this.isDragging=false;
    }
    private activateOnMouseOver(){
        this.dragSprite.on("pointerover", ()=>{
            this.dragSprite.setAlpha(0.75)
        })
        this.dragSprite.on("pointerout", ()=>{
            this.dragSprite.setAlpha(1);
        })
    }
    render(x, y, scale?){
        this.dragSprite.visible=true;
        // this.dragSprite = this.targetScene.add.sprite(x, y, this.resourceKey);
        this.dragSprite.x=x;
        this.dragSprite.y=y;
        this.dragSprite.setInteractive();
        this.origScale = this.dragSprite.scale;
        // this.pickUp=this.targetScene.sound.add("pickUp");
        // this.dropHit=this.targetScene.sound.add("dropHit");
        // this.dropMiss=this.targetScene.sound.add("dropMiss");
        let isDragging=false;
        this.clickAndFollow(this.dragSprite,x,y);
        this.activateOnMouseOver();
    }

}
export enum ManipulativeType{
    BAR="BAR",
    DOTCARD="DOTCARD",
    NUMBERTILE="NUMBERTILE"
}


