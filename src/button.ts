import {Window, Widget, WidgetState, IWidgetStateEvent,States,InputType} from "./core";
import {SVG, Svg, G, Rect, Container, Text} from "./core";

class Button extends Widget{
    move(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    render(): void {
        throw new Error("Method not implemented.");
    }
    update(): void {
        throw new Error("Method not implemented.");
    }
    transition(inputType: InputType, event: string): void {
        throw new Error("Method not implemented.");
    }
}


export {Button}