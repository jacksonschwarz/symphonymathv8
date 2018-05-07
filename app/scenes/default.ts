import {TestSpace} from "./testSpace"
export class Main extends Phaser.Scene{
  constructor(){
      super({
          key:"Main"
      })
  }
  preload(){
    this.scene.add("TestSpace", TestSpace, true);
  }
  create(){
    this.add.text(100, 100, "Hello, world!")
  }
}