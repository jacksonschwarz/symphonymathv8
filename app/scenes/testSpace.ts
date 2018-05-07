import {Manipulative} from "../utils/manipulatives";
export class TestSpace extends Phaser.Scene{
    constructor(){
        super({
            key:"TestSpace"
        })
    }
    preload=()=>{
        this.load.image("obstacle", "obstacle.png")
        this.load.image("manipulative", "test_manipulative.png");
        this.load.atlas("dotcards", "atlas/dotcards.png", "atlas/dotcards.json")
        this.load.atlas("testing", "atlas/megasetHD-1.png", "atlas/megasetHD-1.json")
        this.load.audio("dropHit", "sounds/dropHit.mp3", null, null)
        this.load.audio("dropMiss", "sounds/dropMiss.mp3", null, null)
        this.load.audio("pickUp", "sounds/pickUp.mp3", null, null)

    }
    create=()=>{
        this.add.text(100, 200, "Hello, Space!");
        let bar=new Manipulative(this, 10, "NUMBERTILE", "manipulative")
        bar.render(300, 300)
    }
}