import {Manipulative} from "../utils/manipulative/manipulatives";
import {Bar} from "../utils/manipulative/bar";
import {DotCard} from "../utils/manipulative/dotcard";

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
        this.load.image("plains", "plain 2.jpg")
        this.load.atlas("dotcards", "atlas/dotCards.png", "atlas/dotCards.json")
        this.load.atlas("testing", "atlas/megasetHD-1.png", "atlas/megasetHD-1.json")
        this.load.audio("dropHit", "sounds/dropHit.mp3", null, null)
        this.load.audio("dropMiss", "sounds/dropMiss.mp3", null, null)
        this.load.audio("pickUp", "sounds/pickUp.mp3", null, null)


    }
    create=()=>{
        let bg=new Background(this, "plains");
        this.add.text(10, 200, "Try to drag and drop the white bar onto the red circle. The dot card will not drag to the red circle", {fontSize:12});
        this.add.image(400, 400, "obstacle");
        let manipulative=this.add.sprite(0, 0, 'manipulative')

        // this.add.sprite(200, 300, "dotcards", "1").setScale(0.5)

        let dropZone=new DropZone(400, 400, 50, "BAR")
        let bar=new Bar(this, 10, manipulative, dropZone);
        bar.render(300, 300);

        let dotCard=new DotCard(this, 3, dropZone);
        dotCard.dragSprite.setScale(0.5)
        dotCard.render(500, 500);
    }
}