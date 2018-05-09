export class Button{
    targetScene:any;
    x:number;
    y:number;
    resource:any;
    onClick:()=>void;;

    constructor(anX, aY, aResource, aTargetScene, clickCallback){
        this.x=anX;
        this.y=aY;
        this.resource=aResource;
        this.targetScene=aTargetScene;
        this.onClick=clickCallback;
        this.resource.visible=false;
    }
    render(){
        this.resource.visible=true;
        this.resource.x=this.x;
        this.resource.y=this.y;
        this.resource.setInteractive();

        this.resource.on("pointerover", ()=>{
            this.resource.setTint(0xBEBEBE)
        })
        this.resource.on("pointerout", ()=>{
            this.resource.clearTint();
        })
        this.resource.on("pointerup", ()=>{
            this.onClick();
        })
        
    }
}