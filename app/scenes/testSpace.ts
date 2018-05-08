import {Manipulative, ManipulativeType} from "../utils/manipulative/manipulatives";
import {Bar} from "../utils/manipulative/bar";
import {DotCard} from "../utils/manipulative/dotcard";
import {NumberTile} from "../utils/manipulative/numbertile";

import {DropZone} from "../utils/dropzone";
import {Background} from "../utils/background";

export class TestSpace extends Phaser.Scene{
    constructor(){
        super({
            key:"TestSpace"
        })
    }
    preload=()=>{
        this.load.image("obstacle", "obstacle.png")
        this.load.image("manipulative", "test_manipulative.png");
        this.load.image("dropzone", "dropzone.png")
        this.load.image("plains", "plain 2.jpg")
        this.load.atlas("dotcards", "atlas/dotCards.png", "atlas/dotCards.json")
        this.load.atlas("testing", "atlas/megasetHD-1.png", "atlas/megasetHD-1.json")
        this.load.atlas("numbertiles", "atlas/numberTiles.png", "atlas/numberTiles.json")
        this.load.audio("dropHit", "sounds/dropHit.mp3", null, null)
        this.load.audio("dropMiss", "sounds/dropMiss.mp3", null, null)
        this.load.audio("pickUp", "sounds/pickUp.mp3", null, null)

    }
    create=()=>{
        let bg=new Background(this, "plains");
        let dropZones=[
            new DropZone(this, 200, 200, 50, "DOTCARD"),
            new DropZone(this, 200, 350, 50, "DOTCARD"),
            new DropZone(this, 300, 200, 50, "NUMBERTILE"),
            new DropZone(this, 300, 300, 50, "NUMBERTILE"),
            
        ]
        for(let dropZone of dropZones){
            dropZone.render()
        }
    
        // this.add.image(400, 400, "obstacle");
        // let manipulative=this.add.sprite(0, 0, 'manipulative')
        
        // this.add.sprite(200, 300, "dotcards", "1").setScale(0.5)

        // let dropZone=new DropZone(this, 400, 400, 50, "BAR")
        // let bar=new Bar(this, 10, manipulative, dropZone);
        // bar.render(300, 300);
        let dotCards=[
            new DotCard(this, 3, [dropZones[0], dropZones[1]]),
            new DotCard(this, 4, [dropZones[0], dropZones[1]])
        ];
        let numberTiles=[
            new NumberTile(this, 3, [dropZones[2], dropZones[3]]),
            new NumberTile(this, 4, [dropZones[2], dropZones[3]])
        ];
        let y=500;
        let x=100;
        for(let dotCard of dotCards){
            dotCard.render(x, y)
            dotCard.dragSprite.setScale(0.5)
            x+=100
        }
        for(let numberTile of numberTiles){
            numberTile.render(x, y)
            x+=100;
        }
        // let dotCard=new DotCard(this, 3, dropZone);
        // dotCard.dragSprite.setScale(0.5)
        // dotCard.render(500, 500);

    }
}