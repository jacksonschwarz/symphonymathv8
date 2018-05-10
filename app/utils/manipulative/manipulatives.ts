import {SoundManager} from "../soundmanager";
import {DropZone} from "../dropzone";

import {Main} from "../../scenes/default";
export class Manipulative{
    targetScene:any;
    value:number | string;
    type: ManipulativeType | string;
    resourceKey:string;
    isInteractive:boolean=true;
    onClick:()=>void;
    onPointerDown:()=>void;
    onPointerOver:()=>void;
    onPointerOut:()=>void;

    soundManager;

    dragPoints:DropZone[];

    originalX:number;
    originalY:number;
    originalScale:number;

    constructor(
        theTargetScene:any,
        aValue:number | string,
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

        this.originalScale=this.dragSprite.scaleX

        this.dragSprite.visible=false;
        

        this.soundManager=new SoundManager(this.targetScene, [
            "dropHit",
            "dropMiss",
            "pickUp"
        ])
        this.dragSprite.setDepth(1)
        

    }
 
    isDragging:boolean=false;
    startDragMS:number=0;
    minDragDelay:number=200;
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
    toggleActive(isActive:boolean, targetSprite:any){
        if(isActive){
            targetSprite.setScale(this.originalScale * 1.25)
        }
        else{
            targetSprite.setScale(this.originalScale);
        }
    }
    private startDrag() {
        if(!this.isDragging){
            this.soundManager.play("pickUp");
            // this.dragSprite.setScale(this.originalScale*1.25);
            this.toggleActive(true, this.dragSprite)
            this.dragSprite.setDepth(100);
            this.isDragging=true;
            this.targetScene.input.mouse.requestPointerLock();
            this.startDragMS = Date.now(); 
        }               
    }
    private stopDrag(originX, originY) {
        let isInBounds=false;
        for(let i=0;i<this.dragPoints.length;i++){
            if(this.dragPoints[i].checkBounds(this.dragSprite.x, this.dragSprite.y, this)){

                if(!this.dragPoints[i].manipulativeInZone){
                    this.soundManager.play("dropHit");
                    this.dragSprite.x=this.dragPoints[i].x;
                    this.dragSprite.y=this.dragPoints[i].y;
                    this.dragPoints[i].manipulativeInZone=this;
                    isInBounds=true;;
                }
                else{
                    console.log("found manipulative in spot, switching...")
                    let man=this.dragPoints[i].manipulativeInZone
                    man.dragSprite.x=man.originalX;
                    man.dragSprite.y=man.originalY;
                    this.soundManager.play("dropHit");
                    this.dragSprite.x=this.dragPoints[i].x;
                    this.dragSprite.y=this.dragPoints[i].y;
                    this.dragPoints[i].manipulativeInZone=this;
                    isInBounds=true;
                }
            }
            else{
                this.dragPoints[i].manipulativeInZone=undefined;
            }
        }
        if(!isInBounds){
            this.soundManager.play("dropMiss");
            this.dragSprite.x=originX;
            this.dragSprite.y=originY;
        }

        // this.dragSprite.setScale(this.originalScale);
        this.toggleActive(false, this.dragSprite);
        this.dragSprite.setDepth(1);
        this.targetScene.input.mouse.releasePointerLock();
        console.log('drop')
        this.isDragging=false;
    }
    private activateOnMouseOver(){
        // this.dragSprite.on("pointerover", ()=>{
        //     this.dragSprite.setScale(this.originalScale*1.25)
        // })
        // this.dragSprite.on("pointerout", ()=>{
        //     this.dragSprite.setScale(this.originalScale);
        // })
    }
    setInteractive(interactiveBool:boolean){
        this.isInteractive=interactiveBool;
    }

    pulse(){
        let graphics=this.targetScene.add.graphics(this.dragSprite.x, this.dragSprite.y)
        graphics.alpha=0;
        graphics.fillStyle(0xffffff);
        graphics.fillRect(this.dragSprite.x-(this.dragSprite.width/2)-5, this.dragSprite.y-(this.dragSprite.height/2)-5, this.dragSprite.width+10, this.dragSprite.height+10)
        graphics.setDepth(0)
        this.targetScene.add.tween({
            targets:graphics,
            alpha:0.5,
            // tint:0xffffff,
            duration:250,
            yoyo:true,
            ease:"Sine.EaseInOut",
        })

    }
    render(x, y, scale?){

        this.originalX=x;
        this.originalY=y;
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
        if(this.isInteractive){
            this.clickAndFollow(this.dragSprite,x,y);
            this.activateOnMouseOver();
        }

    }

}
export enum ManipulativeType{
    BAR="BAR",
    DOTCARD="DOTCARD",
    NUMBERTILE="NUMBERTILE"
}


