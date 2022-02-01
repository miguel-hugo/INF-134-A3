import {Window} from "./core"
import {Button} from "./button"

let w = new Window('500','500');

let btn = new Button(w);
btn.text = "Button 1"
btn.fontSize = 20
btn.move(50, 50)
btn.stateEvent().attach(function(input, event){
    console.log(event.target);
});