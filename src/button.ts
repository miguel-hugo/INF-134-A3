import {Window, Widget, WidgetState, IWidgetStateEvent,States,InputType} from "./core";
import {SVG, Svg, G, Rect, Container, Text} from "./core";

class Button extends Widget{
    private _rect: Rect;
    private _group: G;
    private _text: Text;
    private _input: string;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;

    constructor(parent: Window){
        super(parent);
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this.render();
        this.idleState();
    }

    set text(text:string){
        this._input = text;
        this.update();
    }

    get text():string{
        return this._input;
    }

    set fontSize(size:number){
        this._text.font('size', size);
        this.update();
    }

    move(x: number, y: number): void {
        if(this._group != null){
            this._group.move(x,y);
        }
    }

    render(): void {
        this._group = this.parent.window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("black");
        this._rect.radius(5);
        this._text = this._group.text("");
        this._text.x(12);
        this._text.y(20);

        this.backcolor = "white";
        this.registerEvent(this._group);
        this.registerEvent(this._rect);
    }
    update(): void {
        if(this._text != null)
            this._text.text(this.text);
        if(this._rect != null)
            this._rect.fill(this.backcolor);
    }

    private idleState(){
        this.backcolor = "white";
        this._rect.stroke("orange");
        this._rect.opacity(1);
        this._text.fill("orange");
    }

    private pressedState(){
        this.backcolor = "orange";
        this._rect.stroke("orange");
        this._text.dx(0.5);
        this.forecolor = "white";
        this._rect.opacity(1);
        this._text.fill("white");
    }

    private hoverState(){
        this.backcolor = "orange";
        this._rect.stroke("orange").opacity(1);
        this._rect.opacity(.7);
        this._text.fill("white");
    }

    private pressRelease(){
        this._rect.stroke("orange");
        this._text.fill("white");
        this._text.dx(-0.5);
    }

    private hoverPressedState(){}
    private idleDownState(){}
    private pressedOut(){}

    transition(inputType: InputType, event: string): void {
        if (inputType == InputType.MouseDown){
            if (this.currentState() == States.Hover){
                this.current = States.Pressed;
                this.pressedState();
            }
        }else if(inputType == InputType.MouseUp){
            if(this.currentState() == States.HoverPressed){
                this.current = States.Hover;
                this.hoverState();
            }else if(this.currentState() == States.IdleDn){
                this.current = States.IdleUp;
            }else if(this.currentState() == States.Pressed){
                this.current = States.Hover;
                this.hoverState();
                this.pressRelease()
                this.raise(inputType, event);
            }
        }else if(inputType == InputType.MouseOver){
            if(this.currentState() == States.IdleDn){
                this.current = States.HoverPressed;
            }else if(this.currentState() == States.IdleUp){
                this.current = States.Hover;
                this.hoverState();
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
            }
        }
        // console.log("Widget: " + InputType[inputType] + " State: " + States[this.currentState()]);
    }
}


export {Button}