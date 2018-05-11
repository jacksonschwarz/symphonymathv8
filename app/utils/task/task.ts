import {Manipulative, DotCard, NumberTile} from "../manipulative" 

import {DropZone} from "../dropzone";
import {NarrationManager} from "../narrationmanager";

import {Slider} from "../slider";
import {Button} from "../button";

export class Task{
    targetScene:any;
    manipulativeArray={
        "cards":[],
        "numbers":[]
     };
    dropZones:DropZone[];
    narrationManager:NarrationManager;

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
    slider:Slider;
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
        this.manipulativeArray={
            "numbers":[],
            "cards":[]
        };
        this.dropZones=[];

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

        this.narrationManager=new NarrationManager(this.targetScene, audReqArray, []);

        this.slider=new Slider(this.targetScene, sliderContents, sliderType)

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
    addDropZone(manipulativeType:string, manipulativeIndex:number, dropZone:DropZone){

        if(this.manipulativeArray[manipulativeType].length > 0){
            this.manipulativeArray[manipulativeType][manipulativeIndex].dragSprite.visible=false
            let x=this.manipulativeArray[manipulativeType][manipulativeIndex].originalX
            let y=this.manipulativeArray[manipulativeType][manipulativeIndex].originalY
            dropZone.x=x;
            dropZone.y=y;
            dropZone.render()
            this.dropZones.push(dropZone);
        }


    }

    checkTask(): void {
        console.log(this.narrationManager);
        this.narrationManager.play(800);
    }

    render(){
        this.slider.render();
        let y=300;
        //i will be the same as the row of the actual task when displaying. In the test case, row 0 will be cards, because displayArray[i] has the key "cards"
        for(let i=0;i<this.taskArray.length;i++){
            let type="";
            switch(Object.keys(this.displayArray[i])[0]){
                case "cards":
                    type="DOTCARD"
                    break;
                case "numbers":
                    type="NUMBERTILE"
                    break;
                default:
                    break;
            }
            for(let j=0;j<this.taskArray[i].length;j++){
                switch(type){
                    case "DOTCARD":
                        let dotCard=new NumberTile(this.targetScene, this.taskArray[i][j], [])
                        dotCard.setInteractive(false);
                        this.manipulativeArray["cards"].push(dotCard)
                        dotCard.render((80*(j+1))+250, (75*(i+1))+100)
                        break;
                    case "NUMBERTILE":
                        let numberTile=new NumberTile(this.targetScene, this.taskArray[i][j], [])
                        numberTile.setInteractive(false);
                        this.manipulativeArray["numbers"].push(numberTile)
                        numberTile.render((80*(j+1))+250, (100*(i+1))+100)
                        break;
                }

            }
        }
        for(let i=0;i<this.displayArray.length;i++){
            if(Object.keys(this.displayArray[i])[0] == "cards"){
                for(let j=0;j<this.displayArray[i]["cards"].length;j++){
                    this.addDropZone("cards",this.displayArray[i]["cards"][j], new DropZone(this.targetScene, 0, 0, 0, "DOTCARD"))
                }
            }
            else if(Object.keys(this.displayArray[i])[0] == "numbers"){
                for(let j=0;j<this.displayArray[i]["numbers"].length;j++){
                    this.addDropZone("numbers",this.displayArray[i]["numbers"][j], new DropZone(this.targetScene, 0, 0, 0, "NUMBERTILE"))
                }
            }
        }
        this.narrationManager.manipulatives=this.manipulativeArray[Object.getOwnPropertyNames(this.manipulativeArray)[0]];
        this.slider.setDropZones(this.dropZones);

        let checkBtn = new Button(0,0,this.targetScene.add.sprite(0,0,"menu","CheckBtn.png"),this,()=>{
            this.checkTask();
        }).render();
        
    }
}  