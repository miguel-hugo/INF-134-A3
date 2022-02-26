import {Window, Widget, WidgetState, IWidgetStateEvent,States,InputType} from "./core";
import {SVG, Svg, G, Rect, Container, Text} from "./core";

class Checkbox extends Widget{
    private _rect: Rect;
    private _group: G;
    private _text: Text;
    private _input: string;
    private defaultLength: number = 15;
    check: boolean

    constructor(parent: Window){
        super(parent);
        this.height = this.defaultLength;
        this.width = this.defaultLength;
        this.check = false;
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
        this.backcolor = "white";
        this._rect.stroke("orange");
        this._rect.radius(2);
        this._text = this._group.text("");
        this._text.x(20);
        this._text.y(13);
        this._text.fill("orange");
        this.registerEvent(this._group);
        this.registerEvent(this._rect);
    }
    update(): void {
        if(this._text != null){
            this._text.text(this.text);
        }
        if(this._rect != null){
            this._rect.fill(this.backcolor);
        }
    }
    transition(inputType: InputType, event: string): void {
        if (inputType == InputType.MouseDown){
            if (this.currentState() == States.Hover){
                this.current = States.Pressed;
                if (this.check){
                    this.idleState();
                    this.check = false;
                }else{
                    this.pressedState();
                    this.check = true;
                }
            }
        }else if(inputType == InputType.MouseUp){
            if(this.currentState() == States.HoverPressed){
                this.current = States.Hover;
            }else if(this.currentState() == States.IdleDn){
                this.current = States.IdleUp;
            }else if(this.currentState() == States.Pressed){
                this.current = States.Hover;
                this.raise(inputType, event);
            }
        }else if(inputType == InputType.MouseOver){
            if(this.currentState() == States.IdleDn){
                this.current = States.HoverPressed;
            }else if(this.currentState() == States.IdleUp){
                this.current = States.Hover;
            }else if(this.currentState() == States.PressedOut){
                this.current = States.Pressed;
            }
        }else if(inputType == InputType.MouseOut){
            if(this.currentState() == States.HoverPressed){
                this.current = States.IdleDn;
                if (this.check){this.pressedState();
                }else {this.idleState();}
            }else if(this.currentState() == States.Hover){
                this.current = States.IdleUp;
                if (this.check){this.pressedState();
                }else {this.idleState();}
            }else if(this.currentState() == States.Pressed){
                this.current = States.PressedOut;
                if (this.check){this.pressedState();
                }else {this.idleState();}
            }
        }
        // console.log("Widget: " + InputType[inputType] + " State: " + States[this.currentState()]);
        //console.log(this.check);
    }

    private idleState(){
        this.backcolor = "white";
        this._rect.stroke("orange");
    }

    private pressedState(){
        this.backcolor = "orange";
        this._rect.stroke("orange");
    }

     private hoverState(){
         this.backcolor = "orange";
         this._rect.stroke("orange").opacity(1);
         this._rect.opacity(.7);
    }
}

export {Checkbox}