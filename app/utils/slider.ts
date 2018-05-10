import {Manipulative,DotCard,NumberTile, Bar } from "./manipulative";
import {DropZone} from "./dropzone"
export class Slider{
    targetScene:any;
    sliderContents:Manipulative[][];
    sliderType:string;
    contentSprites:any[];
    sliderAsset:any;
    y=634;
    isHidden=false;
    sliderDuration=350;
    constructor(aTargetScene, theSliderContents:string[], theSliderType:string){
        this.targetScene=aTargetScene;
        this.sliderContents=[];
        this.contentSprites=[];
        switch(theSliderType){
            case "bars":
                break;
            case "cards":
                break;
            case "numbers":
                break;
            case "barsnumbers":
                break;
            case "cardsnumbers":
                this.sliderAsset=this.targetScene.add.sprite(512, this.y+20, "slider", "CardsNumbersSlider.png")
                this.sliderAsset.setInteractive();
                this.contentSprites.push(this.sliderAsset)
                this.sliderContents.push([]);
                this.sliderContents.push([]);
                for(let i=0;i<theSliderContents.length;i++){
                    let dotcard=new DotCard(aTargetScene, parseInt(theSliderContents[i]), [])
                    this.sliderContents[0].push(dotcard)
                    this.contentSprites.push(dotcard.dragSprite);
                }
                for(let i=0;i<theSliderContents.length;i++){
                    let numbertile=new NumberTile(aTargetScene, parseInt(theSliderContents[i]), [])
                    this.sliderContents[1].push(numbertile)
                    this.contentSprites.push(numbertile.dragSprite)
                }
                break;
        
        }
    }
    render(){
        console.log(this.sliderContents)
        let xOffset=0
        let yOffset=this.y;
        for(let i=0;i<this.sliderContents.length;i++){
            for(let j=0;j<this.sliderContents[i].length;j++){
                this.sliderContents[i][j].render(92*(j+1)+xOffset, yOffset)
            }
            yOffset+=100
        }
        this.sliderAsset.on("pointerup", ()=>{
            if(this.isHidden){
                this.show()
                
            }
            else{
                this.hide()  
            }
            this.isHidden=!this.isHidden
            
        })
    }
    setDropZones(dropZones:DropZone[]){
        for(let i=0;i<this.sliderContents.length;i++){
            for(let j=0;j<this.sliderContents[i].length;j++){
                this.sliderContents[i][j].dragPoints=dropZones;
            }
        }
    }
    hide(){
        for(let i=0;i<this.contentSprites.length;i++){
            this.targetScene.add.tween({
                targets:this.contentSprites[i],
                y:this.contentSprites[i].y+200,
                ease:"linear",
                duration:this.sliderDuration
            })
        }
        // this.targetScene.add.tween({
        //     targets:this.contentSprites,
        //     y:this.y+200,
        //     ease:"linear",
        //     duration:500
        // })
    }
    show(){
        for(let i=0;i<this.contentSprites.length;i++){
            this.targetScene.add.tween({
                targets:this.contentSprites[i],
                y:this.contentSprites[i].y-200,
                ease:"linear",
                duration:this.sliderDuration
            })
        }
        // this.targetScene.add.tween({
        //     targets:this.contentSprites,
        //     y:this.y+20,
        //     ease:"linear",
        //     duration:500
        // })
    }
}