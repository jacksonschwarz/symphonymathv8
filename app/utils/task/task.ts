import {Manipulative, DotCard, NumberTile} from "../manipulative" 

import {DropZone} from "../dropzone";
export class Task{
    targetScene:any;
    manipulativeArray:Manipulative[];

    taskID:number;
    levelNum:number;
    subLevel:number;
    active:boolean;
    CCSSgrade:string;
    CCSSdomain:string;
    CCSSstandard:number;
    wayOfKnowing:number;
    subSkill:string;
    representation:string;
    diffLevel:number;
    taskType:number;
    taskArray:string[][]
    directionsArray:string[]
    displayArray:any[];
    audReqArray:string[];
    sliderContents:string[];
    sliderType:string;
    randomSlider:boolean;
    requiredSolutions:string;
    wp:string;
    wpBritish:string;
    wpSpanish:string;
    endPoints:string[];
    steps:number;
    displayPoints:string;
    barType:string
    notices:any;
    displayGrid:string
    orient:string;

    constructor(
        aTargetScene:any,
        taskID:number,
        levelNum:number,
        subLevel:number,
        active:boolean,
        CCSSgrade:string,
        CCSSdomain:string,
        CCSSstandard:number,
        wayOfKnowing:number,
        subSkill:string,
        representation:string,
        diffLevel:number,
        taskType:number,
        taskArray:string[][],
        directionsArray:string[],
        displayArray:any[],
        audReqArray:string[],
        sliderContents:string[],
        sliderType:string,
        randomSlider:boolean,
        requiredSolutions:string,
        wp:string,
        wpBritish:string,
        wpSpanish:string,
        endPoints:string[],
        steps:number,
        displayPoints:string,
        barType:string,
        notices:any,
        displayGrid:string,
        orient:string
    ){
        this.targetScene=aTargetScene;
        this.manipulativeArray=[];

        this.taskID=taskID;
        this.levelNum=levelNum;
        this.subLevel=subLevel;
        this.active=active;
        this.CCSSgrade=CCSSgrade;
        this.CCSSdomain=CCSSdomain;
        this.CCSSstandard=CCSSstandard;
        this.wayOfKnowing=wayOfKnowing;
        this.subSkill=subSkill;
        this.representation=representation;
        this.diffLevel=diffLevel;
        this.taskType=taskType;
        this.taskArray=taskArray;
        this.directionsArray=directionsArray;
        this.displayArray=displayArray;
        this.audReqArray=audReqArray;
        this.sliderContents=sliderContents;
        this.sliderType=sliderType;
        this.randomSlider=randomSlider;
        this.requiredSolutions=requiredSolutions;
        this.wp=wp;
        this.wpBritish=wpBritish;
        this.wpSpanish=wpSpanish;
        this.endPoints=endPoints;
        this.steps=steps;
        this.displayPoints=displayPoints;
        this.barType=barType;
        this.notices=notices;
        this.displayGrid=displayGrid;
        this.orient=orient;
    }
    private addDropZone(manipulativeIndex:number, dropZone:DropZone){
        this.manipulativeArray[manipulativeIndex].dragSprite.visible=false
        let x=this.manipulativeArray[manipulativeIndex].originalX
        let y=this.manipulativeArray[manipulativeIndex].originalY
        dropZone.x=x;
        dropZone.y=y;
        dropZone.render()
        return dropZone;
    }
    render(){
        console.log(this.displayArray[1]["numbers"])
        let y=400;
        for(let i=0;i<this.taskArray.length;i++){
            for(let j=0;j<this.taskArray[i].length;j++){
                let numberTile=new NumberTile(this.targetScene, this.taskArray[i][j], [])
                this.manipulativeArray.push(numberTile)
                numberTile.render((75*(j+1))+250, y)
            }
        }

        this.addDropZone(this.displayArray[1]["numbers"][0], new DropZone(this.targetScene, 500, 500, 50, "NUMBERTILE"))
        
    }
}  