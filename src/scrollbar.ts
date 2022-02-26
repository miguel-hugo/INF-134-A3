import {Window, Widget, WidgetState, IWidgetStateEvent,States,InputType} from "./core";
import {SVG, Svg, G, Rect, Container, Text, Circle} from "./core";

class ScrollBar extends Widget{
    private _rect: Rect;
    private _group: G;
    private _text: Text;
    private _input: string;
    private defaultWidth: number = 20;
    private thumbHeight: number = 50;
    private _thumb: Rect;
    private barX: number;
    private barY: number;

    constructor(parent: Window, height: number){
        super(parent);
        this.height = height;
        this.width = this.defaultWidth;
        this.render();
        this.idleState();
    }

    move(x: number, y: number): void {
        if(this._group != null){
            this._group.move(x,y);
            this.barX = x;
            this.barY = y;
        }
    }
    render(): void {
        this._group = this.parent.window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._thumb = this._group.rect(this.width, this.thumbHeight);
        this._rect.radius(5);
        this._thumb.radius(5);
        
        this.registerEvent(this._group);
        this.registerEvent(this._thumb);
    }
    update(): void {
        throw new Error("Method not implemented.");
    }
    transition(inputType: InputType, event: any): void {
        if (inputType == InputType.MouseDown){
            if (this.currentState() == States.Hover){
                this.current = States.Pressed;
                this.pressedState(event);
            }
        }else if(inputType == InputType.MouseUp){
            if(this.currentState() == States.HoverPressed){
                this.current = States.Hover;
                // this.hoverState();
            }else if(this.currentState() == States.IdleDn){
                this.current = States.IdleUp;
            }else if(this.currentState() == States.Pressed){
                this.current = States.Hover;
                
                // this.hoverState();
                // this.pressRelease()
                this.raise(inputType, event);
            }
        }else if(inputType == InputType.MouseOver){
            if(this.currentState() == States.IdleDn){
                this.current = States.HoverPressed;
                this.pressedState(event);
            }else if(this.currentState() == States.IdleUp){
                this.current = States.Hover;
                // this.hoverState();
            }else if(this.currentState() == States.PressedOut){
                this.current = States.Pressed;
            }
        }else if(inputType == InputType.MouseOut){
            if(this.currentState() == States.HoverPressed){
                this.current = States.IdleDn;
            }else if(this.currentState() == States.Hover){
                this.current = States.IdleUp;
                this.idleState();
            }else if(this.currentState() == States.Pressed){
                this.current = States.PressedOut;
                this.pressedState(event);
            }
        }else if (inputType == InputType.MouseMove){
            if (this.currentState() == States.Pressed){
                // console.log(event.offsetY)
                // console.log(this._thumb.y(), event.y);
                this.pressedState(event);
            }
        } 
        // console.log("Widget: " + InputType[inputType] + " State: " + States[this.currentState()]);
    }

    private idleState(){
        this._rect.stroke("orange");
        this._rect.fill("white");
        this._thumb.stroke("orange");
        this._thumb.fill("orange");
        this._thumb.opacity(.9);
    }

    private pressedState(event: any){
        console.log(<number>this._thumb.y() - this.barY)
        if (((<number>this._thumb.y()) - this.barY >= 0) && ((<number>this._thumb.y()) - this.barY <= (this.height - this.barY))) {
            this._thumb.y(event.offsetY - (this.thumbHeight/2));
        }else if ((<number>this._thumb.y()  - this.barY) <= 0){
            this._thumb.y(this.barY);
        }else if (((<number>this._thumb.y() - 1) - this.barY) <= (this.height - this.barY)){
            this._thumb.y(150);
        }
    }

    private hoverState(){

    }
    
}

export {ScrollBar}