export class Background{
    targetScene:any;

    backgroundImageKey:string;
    constructor(aTargetScene:any, aBackgroundImageKey:string){
        this.targetScene=aTargetScene;
        this.targetScene.add.image(0,0, aBackgroundImageKey).setOrigin(0, 0);
    }
}