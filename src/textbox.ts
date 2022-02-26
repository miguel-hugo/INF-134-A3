import {Window, Widget, WidgetState, IWidgetStateEvent,States,InputType} from "./core";
import {SVG, Svg, G, Rect, Container, Text, Circle, Line} from "./core";

class TextBox extends Widget{
    private _rect: Rect;
    private _group: G;
    private _text: Text;
    private _input: string;
    private _caret: any;
    private defaultWidth: number = 300;
    private defaultHeight: number = 20;

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

    move(x: number, y: number): void {
        if(this._group != null){
            this._group.move(x,y);
        }
    }

    render(): void {
        this._group = this.parent.window.group();
        this._rect = this._group.rect(this.defaultWidth, this.defaultHeight);
        this._rect.stroke("orange");
        this._rect.fill("white");
        this._text = this._group.text("");
        this._text.y(15)
        this._text.x(5);
        this._caret = "|"
        

        this.registerEvent(this._group);
        this.registerEvent(this._rect);
        this.registerEvent(this._text);
        // this.registerEvent(this._caret);
    }

    update(): void {
        if(this._text != null)
            this._text.text(this.text);
        if(this._rect != null)
            this._rect.fill(this.backcolor);
    }
    transition(inputType: InputType, event: any): void {
        if (inputType == InputType.MouseDown){
            if (this.currentState() == States.Hover){
                this.current = States.Pressed;
            }
        }else if(inputType == InputType.MouseUp){
            if(this.currentState() == States.HoverPressed){
                this.current = States.Hover;
                //this.hoverState();
            }else if(this.currentState() == States.Pressed){
                this.current = States.Hover;
                this.raise(inputType, event);
            }
        }/* else if (inputType == InputType.MouseOver){
            if(this.currentState() == States.Hover){
                if (this._text.text().length == 0){
                    this._text.text(" |");
                }else{
                    var currentText = this._text.text().substring(0,this._text.text().length-2);
                    this._text.text(currentText + " |");
                }
            }
        }else if (inputType == InputType.MouseOut){
            if(this.currentState() == States.IdleUp){
                var currentText = this._text.text().substring(0,this._text.text().indexOf(" |"));
                this._text.text(currentText);
            }
        } */else if (inputType == InputType.KeyPress){
            console.log(event)
            var currentText = this._text.text().substring(0,this._text.text().length-2);
            if (event.key == "Backspace"){
                currentText = this._text.text().slice(0,this._text.text().length-3);
                this._text.text(currentText + " |");
            }else if (event.key.match(/[^\W_]+/)){
                this._text.text(currentText + event.key + " |");
            }
            
        }

        /* if (this.currentState() == States.Pressed){
            if (inputType == InputType.KeyPress){
                console.log(inputType);
            }
        } */
        console.log("Widget: " + InputType[inputType] + " State: " + States[this.currentState()]);
    }

    private idleState(){
        this._rect.stroke("orange");
        this._rect.fill("white");
    }

    private pressedState(){
        this._text.text("|");
    }

    private keyDownState(){
    }

    private hoverState(){

    }

}

export {TextBox}