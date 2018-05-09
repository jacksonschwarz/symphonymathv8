import {Manipulative, ManipulativeType} from "../utils/manipulative/manipulatives";
import {Bar} from "../utils/manipulative/bar";
import {DotCard} from "../utils/manipulative/dotcard";
import {NumberTile} from "../utils/manipulative/numbertile";

import {DropZone} from "../utils/dropzone";
import {Background} from "../utils/background";

import {NarrationManager} from "../utils/narrationmanager";
import {SoundManager} from "../utils/soundmanager";

import{Task} from "../utils/task/task";

export class TestSpace extends Phaser.Scene{

    constructor(){
        super({
            key:"TestSpace"
        })
    }
    preload=()=>{
        this.load.audio("dropHit", "sounds/dropHit.mp3", null, null)
        this.load.audio("dropMiss", "sounds/dropMiss.mp3", null, null)
        this.load.audio("pickUp", "sounds/pickUp.mp3", null, null)
    
        this.load.audio("plus", "sounds/plus.mp3", null, null)
        this.load.audio("pre_3", "sounds/pre_3.mp3", null, null)
        this.load.audio("post_9", "sounds/post_9.mp3", null, null)
        this.load.audio("post_10", "sounds/pre_10.mp3", null, null)
        this.load.audio("equals", "sounds/equals.mp3", null, null)
        this.load.image("obstacle", "obstacle.png")
        this.load.image("manipulative", "test_manipulative.png");
        this.load.image("dropzone", "dropzone.png")
        this.load.image("plains", "plain 2.jpg")
        this.load.atlas("dotcards", "atlas/dotCards.png", "atlas/dotCards.json")
        this.load.atlas("testing", "atlas/megasetHD-1.png", "atlas/megasetHD-1.json")
        this.load.atlas("numbertiles", "atlas/numberTiles.png", "atlas/numberTiles.json")

    }
    create=()=>{
        let bg=new Background(this, "plains");
        // let dropZones=[
        //     new DropZone(this, 200, 200, 50, "DOTCARD"),
        //     new DropZone(this, 200, 350, 50, "DOTCARD"),
        //     new DropZone(this, 300, 200, 50, "NUMBERTILE"),
        //     new DropZone(this, 300, 300, 50, "NUMBERTILE"),
            
        // ]
        // for(let dropZone of dropZones){
        //     dropZone.render()
        // }
    
        // this.add.image(400, 400, "obstacle");
        // let manipulative=this.add.sprite(0, 0, 'manipulative')
        
        // this.add.sprite(200, 300, "dotcards", "1").setScale(0.5)

        // let dropZone=new DropZone(this, 400, 400, 50, "BAR")
        // let bar=new Bar(this, 10, manipulative, dropZone);
        // bar.render(300, 300);



        // let dotCards=[
        //     new DotCard(this, 3, [dropZones[0], dropZones[1]]),
        //     new DotCard(this, 4, [dropZones[0], dropZones[1]])
        // ];

        // let numberTiles=[
        //     new NumberTile(this, 3, [dropZones[2], dropZones[3]]),
        //     new NumberTile(this, "plus_symbol", [dropZones[2], dropZones[3]])
        // ];
        // for(let dotCard of dotCards){
        //     dotCard.dragSprite.setScale(0.5)
        // }
        // let y=500;
        // let x=100;
        // for(let dotCard of dotCards){
        //     dotCard.render(x, y)
        //     x+=100
        // }
        // for(let numberTile of numberTiles){
        //     numberTile.render(x, y)
        //     x+=100;
        // }
        // let narrationManager=new NarrationManager(this, ["pre_3", "plus", "post_9", "equals"])
        // narrationManager.play(800)

        let task=new Task(
            this, 
            310030,
            3,
            1,
            true,
            "K",
            "OA",
            2,
            2,
            "Beginning Addition: Missing Result",
            "cards",
            2,
            7,
            [["1","+","2","=","3"]],
            ["matchCards"],
            [{"cards":[0,2,4]},{"numbers":[4]}],
            [],
            ["0","1","2","3","4","5","6","7","8","9"],
            "cardsnumbers",
            false,
            "3",
            null,
            "",
            "",
            [""],
            0,
            "all",
            "0",
            {"cardsnumbers":"3_1"},
            "none",
            "h"
        )
        task.render()
    }
}