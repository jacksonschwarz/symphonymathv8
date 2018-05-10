import {Manipulative,DotCard,NumberTile, Bar } from "./manipulative";
import {DropZone} from "./dropzone"
export class Slider{
    targetScene:any;
    sliderContents:Manipulative[][];
    sliderType:string;
    contentSprites:any[];
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
    y=600;
    render(){
        console.log(this.sliderContents)
        let xOffset=0
        let yOffset=this.y;
        for(let i=0;i<this.sliderContents.length;i++){
            for(let j=0;j<this.sliderContents[i].length;j++){
                this.sliderContents[i][j].render(92*(j+1)+xOffset, yOffset)
            }
            yOffset+=125
        }
    }
    setDropZones(dropZones:DropZone[]){
        for(let i=0;i<this.sliderContents.length;i++){
            for(let j=0;j<this.sliderContents[i].length;j++){
                this.sliderContents[i][j].dragPoints=dropZones;
            }
        }
    }
    hide(){
        this.targetScene.add.tween({
            targets:this.contentSprites,
            y:this.y+300,
            ease:"linear",
            duration:1000
        })
    }
    show(){
        this.targetScene.add.tween({
            targets:this.contentSprites,
            y:this.y,
            ease:"linear",
            duration:1000
        })
    }
}