import {Window, Widget, WidgetState, IWidgetStateEvent,States,InputType} from "./core";
import {SVG, Svg, G, Rect, Container, Text, Circle} from "./core";

class RadioButton extends Widget{
    private _rect: Rect;
    private _circ: Circle;
    private _group: G;
    private _text: Text;
    private _input: string;
    amount: number = 2;
    private _radioButtons: Array<Circle>;
    private _buttonsCheck: Array<boolean>;
    ycoord: number;
    

    constructor(parent: Window, amt: number){
        super(parent);
        this.amount = amt;
        this.render();
    }

    setText(text:string, num:number){
        this._radioButtons[num]
    }

    move(x: number, y: number): void {
        this.ycoord = y;
        if(this._group != null){
            this._group.move(x,y);
        }
    }
    render(): void {
        this._group = this.parent.window.group();
        this._radioButtons = [];
        this._buttonsCheck = [];
        for (var i = 0; i < this.amount; i++){
            this._radioButtons.push(this._group.circle(15));
            this._radioButtons[i].stroke("orange");
            this._radioButtons[i].fill("white");
            this._radioButtons[i].dy(i*20);
            this._buttonsCheck[i] = false;
            this.registerEvent(this._radioButtons[i]);
        }
    }
    update(): void {
        throw new Error("Method not implemented.");
    }
    transition(inputType: InputType, event: any): void {
        var coords = [event.clientX, event.clientY];
        var option = Math.floor((coords[1] - (this.ycoord + 7))/19)
        if (inputType == InputType.MouseDown){
            if (this.currentState() == States.Hover){
                this.current = States.Pressed;
                this.pressedState(option)
                console.log(option);
                for (var i = 0; i < this._buttonsCheck.length; i++){
                    console.log(i, this._buttonsCheck[i]);
                    if (this._buttonsCheck[i] != true){this.idleState(option)}
                }
                // this.pressedState(option);
            }
        }else if(inputType == InputType.MouseUp){
            if(this.currentState() == States.HoverPressed){
                this.current = States.Hover;
                // this.hoverState(coords);
            }else if(this.currentState() == States.IdleDn){
                this.current = States.IdleUp;
            }else if(this.currentState() == States.Pressed){
                this.current = States.Hover;
                
                // this.hoverState(coords);
                // this.pressRelease()
                this.raise(inputType, event);
            }
            console.log(this._buttonsCheck)
        }else if(inputType == InputType.MouseOver){
            if(this.currentState() == States.IdleDn){
                this.current = States.HoverPressed;
            }else if(this.currentState() == States.IdleUp){
                this.current = States.Hover;
                // this.hoverState(coords);
            }else if(this.currentState() == States.PressedOut){
                this.current = States.Pressed;
            }
        }else if(inputType == InputType.MouseOut){
            if(this.currentState() == States.HoverPressed){
                this.current = States.IdleDn;
                /* if (this._buttonsCheck[option]){
                    this.idleState(coords)
                }else{
                    this.pressedState(coords)
                } */
            }else if(this.currentState() == States.Hover){
                this.current = States.IdleUp;
                /* if (this._buttonsCheck[option]){
                    this.idleState(coords)
                }else{
                    this.pressedState(coords)
                } */
            }else if(this.currentState() == States.Pressed){
                this.current = States.PressedOut;
                /* if (this._buttonsCheck[option]){
                    this.idleState(coords)
                }else{
                    this.pressedState(coords)
                } */
            }
        }
        console.log("Widget: " + InputType[inputType] + " State: " + States[this.currentState()]);

    }

    private idleState(option:number){
        this._radioButtons[option].stroke("orange");
        this._radioButtons[option].fill("white");
        this._buttonsCheck[option] = false;
    }

    private pressedState(option:number){
        this._radioButtons[option].fill("orange");
        this._buttonsCheck[option] = true;
        //console.log(this._buttonsCheck);
    }

    private hoverState(option:number){
        this._radioButtons[option].fill("orange");
        this._radioButtons[option].opacity(0.7);
    }
}

export {RadioButton}

/*  */