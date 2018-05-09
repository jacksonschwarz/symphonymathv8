import {TestSpace} from "./testSpace"
import {SoundManager} from "../utils/soundmanager";
export class Main extends Phaser.Scene{
  public static soundManager:SoundManager;
  constructor(){
      super({
          key:"Main"
      })
  }
  preload(){
    
    this.scene.add("TestSpace", TestSpace, true);
  }
  create(){
    //this.add.text(100, 100, "Hello, world!")
  }
}