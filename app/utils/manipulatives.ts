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
    }

    constructor(
        theTargetScene:any,
        aValue:number,
        aType:ManipulativeType | string,
        aResource:string,
        aDragPoint:{
            x:number,
            y:number,
            pullRadius:number
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
    render(x, y){
        console.log("render called!")
        var image = this.targetScene.add.sprite(200, 300, this.resourceKey).setInteractive();
        let pickUp=this.targetScene.sound.add("pickUp")
        let dropHit=this.targetScene.sound.add("dropHit")
        let dropMiss=this.targetScene.sound.add("dropMiss")
        
        // let emitter=new Phaser.Events.EventEmitter()
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
    
        this.targetScene.input.on('dragend', (pointer, gameObject)=> {
            gameObject.clearTint();
            console.log(pointer.x, pointer.y)
            console.log(this.dragPoint)
            if((pointer.x >= this.dragPoint.x-this.dragPoint.pullRadius && pointer.x <= this.dragPoint.x+this.dragPoint.pullRadius) 
            && (pointer.y >=this.dragPoint.y-this.dragPoint.pullRadius && pointer.y <=this.dragPoint.y+this.dragPoint.pullRadius)){
                    dropHit.play();
                    gameObject.x=this.dragPoint.x
                    gameObject.y=this.dragPoint.y;         

            }
            else{
                dropMiss.play();
                gameObject.x=x;
                gameObject.y=y;
            }
            // dropHit.play()
            // console.log(pointer.x, pointer.y)
        });
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
