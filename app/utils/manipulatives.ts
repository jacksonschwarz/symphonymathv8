export class Manipulative{
    targetScene:any;
    value:number;
    type: ManipulativeType | string;
    resourceKey:string;
    onClick:()=>void;
    onPointerDown:()=>void;
    onPointerOver:()=>void;
    onPointerOut:()=>void;

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

        this.dragPoint=aDragPoint

    }
    //the timeout function for the 
    // timeout:any;
    // canFollowMouse:boolean=false;
    // private checkDragging(spriteToCheck) {
    //     spriteToCheck.on("pointerdown", ()=>{
    //         this.timeout=setTimeout(()=>{
    //             this.canFollowMouse=true;
                
    //         }, 3000)
    //     })
    //     spriteToCheck.on("pointerup", ()=>{
    //         clearTimeout(this.timeout)
    //     })
    // }
    // private followMouse(spriteToMove, sounds, originX, originY){
    //     console.log(this.canFollowMouse)
    //     spriteToMove.on("pointermove", function(pointer){
    //         if(this.canFollowMouse){
    //             spriteToMove.x=pointer.x;
    //             spriteToMove.y=pointer.y;
    //         }
    //     })
    //     spriteToMove.on("pointerdown", (pointer)=>{
    //         if(this.canFollowMouse){
    //             if((pointer.x >= this.dragPoint.x-this.dragPoint.pullRadius && pointer.x <= this.dragPoint.x+this.dragPoint.pullRadius) 
    //             && (pointer.y >=this.dragPoint.y-this.dragPoint.pullRadius && pointer.y <=this.dragPoint.y+this.dragPoint.pullRadius)){
    //                     sounds[1].play();
    //                     spriteToMove.x=this.dragPoint.x
    //                     spriteToMove.y=this.dragPoint.y;         
    
    //             }
    //             else{
    //                 sounds[2].play();
    //                 spriteToMove.x=originX;
    //                 spriteToMove.y=originY;
    //             } 
    //             this.canFollowMouse=false;
    //         }
  
    //     })
    // }
    // private dragSprite(spriteToDrag, sounds:any[], originX, originY){
    //         spriteToDrag.on('pointerover', function () {
    //             this.setTint("0x555354");
    //         });
        
    //         spriteToDrag.on('pointerout', function () {
    //             this.clearTint();
    //         });
    //         this.targetScene.input.setDraggable(spriteToDrag);
        
    //         this.targetScene.input.on('dragstart', function (pointer, gameObject) {
    //             gameObject.setTint(0x555354);
    //             sounds[0].play()
    //         });
        
    //         this.targetScene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    //             gameObject.x = dragX;
    //             gameObject.y = dragY;
    //             clearTimeout(this.timeout)
                
    //         });
        
    //         this.targetScene.input.on('dragend', (pointer, gameObject)=> {
    //             gameObject.clearTint();
    //             if((pointer.x >= this.dragPoint.x-this.dragPoint.pullRadius && pointer.x <= this.dragPoint.x+this.dragPoint.pullRadius) 
    //             && (pointer.y >=this.dragPoint.y-this.dragPoint.pullRadius && pointer.y <=this.dragPoint.y+this.dragPoint.pullRadius)){
    //                     sounds[1].play();
    //                     gameObject.x=this.dragPoint.x;
    //                     gameObject.y=this.dragPoint.y;
    //             }
    //             else{
    //                 sounds[2].play();
    //                 gameObject.x=originX;
    //                 gameObject.y=originY;
    //             }
    //             // dropHit.play()
    //             // console.log(pointer.x, pointer.y)
    //         });
    // }

    canFollow:number=0;
    timeout;
    private clickAndFollow(dragSprite, originX, originY){
        dragSprite.on("pointerdown", ()=>{
            if(this.canFollow==0){
                console.log("pointer down, starting follow....")
                this.canFollow=1;
                
            }
            // if(this.canFollow==1 && this.checkBounds(dragSprite.x, dragSprite.y)){
            //     dragSprite.x=this.dragPoint.x;
            //     dragSprite.y=this.dragPoint.y;
            //     clearTimeout(this.timeout);
            //     this.canFollow=0
            // }
            // else{
            //     this.canFollow=false;
            // }
        })
        dragSprite.on("pointerup", ()=>{
            if(this.canFollow==1 && this.checkBounds(dragSprite.x, dragSprite.y)){
                console.log("pointer up, cancelling follow")
                dragSprite.x=this.dragPoint.x;
                dragSprite.y=this.dragPoint.y;
                this.canFollow=0;
            }
            // else if(this.canFollow==1 && !this.checkBounds(dragSprite.x, dragSprite.y)){
            //     dragSprite.x=originX;
            //     dragSprite.y=originY;
            //     this.canFollow=0;
            // }
        })
        // this.targetScene.input.on("pointerup", (pointer)=>{
        //     this.timeout=setTimeout(()=>{
        //         if(this.canFollow == 0 && this.checkBounds(pointer.x, pointer.y)){
        //             dragSprite.x=this.dragPoint.x;
        //             dragSprite.y=this.dragPoint.y;
        //             this.canFollow=0;
        //             clearTimeout(this.timeout)
        //         }
        //     }, 10000)

        // })
        this.targetScene.input.on("pointermove", (pointer)=>{
            if(this.canFollow > 0){
                dragSprite.x=pointer.x;
                dragSprite.y=pointer.y;
                // if(this.checkBounds(pointer.x, pointer.y)){
                //     if(!this.checkBounds(pointer.x, pointer.y)){
                //         dragSprite.x=this.dragPoint.x;
                //         dragSprite.y=this.dragPoint.y;
                //         this.canFollow=0;
                //     }
       

                // }
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
    render(x, y, scale?){
        console.log("render called!")
        let dragSprite = this.targetScene.add.sprite(x, y, this.resourceKey).setInteractive();
        if(scale){
            dragSprite.setScale(scale)
        }
        let pickUp=this.targetScene.sound.add("pickUp")
        let dropHit=this.targetScene.sound.add("dropHit")
        let dropMiss=this.targetScene.sound.add("dropMiss")
        
        let isDragging=false;
        this.clickAndFollow(dragSprite,x,y);

    }

}
enum ManipulativeType{
    BAR="BAR",
    DOTCARD="DOTCARD",
}
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
// export class DotCard extends Manipulative{
//     targetScene:Phaser.Scene;    
//     value:number;
//     type: ManipulativeType;
//     onClick:()=>void;
//     onPointerDown:()=>void;
//     onPointerOver:()=>void;
//     onPointerUp:()=>void;
//     //dot card specific rendering method
//     render(){

//     }
// }
// export class Grid extends Manipulative{
//     targetScene:Phaser.Scene;    
//     value:number;
//     type: ManipulativeType;
//     onClick:()=>void;
//     onPointerDown:()=>void;
//     onPointerOver:()=>void;
//     onPointerUp:()=>void;
//     //grid specific rendering method
//     render(){

//     }
// }
// export class NumberLine extends Manipulative{
//     targetScene:Phaser.Scene;    
//     value:number;
//     type: ManipulativeType;
//     onClick:()=>void;
//     onPointerDown:()=>void;
//     onPointerOver:()=>void;
//     onPointerUp:()=>void;
//     //number line specific rendering method
//     render(){

//     }
// }
