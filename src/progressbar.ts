import {Window, Widget, WidgetState, IWidgetStateEvent,States,InputType} from "./core";
import {SVG, Svg, G, Rect, Container, Text, Circle} from "./core";

class ProgressBar extends Widget{
    private _rect: Rect;
    private _progRect: Rect;
    private _group: G;
    private _value: number;
    private _input: number;
    private defaultHeight: number = 30;
    private _width: number;
    private _progWidth: number = 0;

    constructor(parent: Window, width: number){
        super(parent);
        this.height = this.defaultHeight;
        this.width = width;
        this.render();
        this.idleState();
    }

    set value(val:number){
        this._input = val;
        this.update();
    }

    get value(){
        return this._value;
    }


    move(x: number, y: number): void {
        if(this._group != null){
            this._group.move(x,y);
        }
    }

    render(): void {
        console.log(this.width)
        console.log(this._input)
        this._group = this.parent.window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.radius(5);
        this._progRect = this._group.rect(this._progWidth,this.height);
        this._progRect.radius(5);
        this.registerEvent(this._group);
        this.registerEvent(this._rect);
        this.registerEvent(this._progRect);
    }

    update(): void {
        if(this._input != null)
            this._value = this._input;
    }

    transition(inputType: InputType, event: string): void {
        if (inputType == InputType.MouseDown){
            if (this.currentState() == States.Hover){
                this.current = States.Pressed;
                if (this._progWidth < 100){
                    this._progWidth += this.value;
                }else if (this._progWidth == 100){
                    this._progWidth = 0;
                }
                console.log(this._progWidth);
                this.pressedState();
                
            }
        }else if(inputType == InputType.MouseUp){
            if(this.currentState() == States.HoverPressed){
                this.current = States.Hover;
                //this.hoverState();
            }else if(this.currentState() == States.IdleDn){
                this.current = States.IdleUp;
            }else if(this.currentState() == States.Pressed){
                this.current = States.Hover;
                if (this._progWidth + this.value > 100) {
                    this._progWidth += (100 - this._progWidth)
                }
                // this.hoverState();
                // this.pressRelease()
                this.raise(inputType, event);
            }
        }else if(inputType == InputType.MouseOver){
            if(this.currentState() == States.IdleDn){
                this.current = States.HoverPressed;
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
            }
        }
        console.log("Widget: " + InputType[inputType] + " State: " + States[this.currentState()]);
    }

    private idleState(){
        this._rect.stroke("orange");
        this._rect.fill("white");
    }

    private pressedState(){
        this._progRect.width(this.width * (this._progWidth/100));
        this._progRect.fill("orange");       
    }
}

export{ProgressBar}