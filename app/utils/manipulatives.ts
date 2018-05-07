export class Manipulative{
    targetScene:any;
    value:number;
    type: ManipulativeType | string;
    resourceKey:string;
    onClick:()=>void;
    onPointerDown:()=>void;
    onPointerOver:()=>void;
    constructor(
        theTargetScene:any,
        aValue:number,
        aType:ManipulativeType | string,
        aResource:string,
        clickCallback?:()=>void,
        pointerdownCallback?:()=>void,
        pointeroverCallback?:()=>void,
    ){
        this.targetScene=theTargetScene;
        this.value=aValue;
        this.type=aType;
        this.resourceKey=aResource;
        this.onClick=clickCallback;
        this.onPointerDown=pointerdownCallback;
        this.onPointerOver=pointeroverCallback;


    }
    render(x, y){
        console.log("render called!")
        var image = this.targetScene.add.sprite(200, 300, this.resourceKey).setInteractive();
        let pickUp=this.targetScene.sound.add("pickUp")
        let dropHit=this.targetScene.sound.add("dropHit")
        let dropMiss=this.targetScene.sound.add("dropMiss")
   
        image.on('pointerover', function () {
    
            this.setTint("0x555354");
        });
    
        image.on('pointerout', function () {
    
            this.clearTint();

    
        });
    
        this.targetScene.input.setDraggable(image);
    
        this.targetScene.input.on('dragstart', function (pointer, gameObject) {
    
            gameObject.setTint(0x555354);
            pickUp.play()
    
        });
    
        this.targetScene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    
        this.targetScene.input.on('dragend', function (pointer, gameObject) {
            gameObject.clearTint();
            dropHit.play()
        });
    }

}
enum ManipulativeType{
    BAR="BAR",
    DOTCARD="DOTCARD",
    GRID="GRID",
    NUMBERLINE="NUMBERLINE",
    NUMBERTILE=""
}
export class Bar extends Manipulative {
    constructor(        
        theTargetScene:any,
        aValue:number,
        aType:ManipulativeType,
        aResource:string,
        clickCallback?:()=>void,
        pointerdownCallback?:()=>void,
        pointeroverCallback?:()=>void,
        pointerupCallback?:()=>void,){
        super(theTargetScene, aValue, ManipulativeType.BAR, aResource);
        
    }
    render(){
        
    }
    //bar specific rendering method

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
