import {Window} from "./core"
import {Button} from "./button"
import {Checkbox} from "./checkbox"
import {RadioButton} from "./radiobutton"
import {TextBox} from "./textbox"
import {ProgressBar} from "./progressbar"
import {ScrollBar} from "./scrollbar"

let w = new Window('500','500');

let btn = new Button(w);
btn.text = "Button";
btn.fontSize = 20;
btn.move(50, 50);
/* btn.stateEvent().attach(function(input, event){
    console.log(event.target);
}); */

let chk = new Checkbox(w);
let chk2 = new Checkbox(w);
chk.text = "Option 1";
chk.move(200, 50);
chk2.text = "Option 2";
chk2.move(200, 80);
/* chk.stateEvent().attach(function(input, event){
    console.log(event.target);
});
 */
let rdbtn = new RadioButton(w, 4);
rdbtn.move(50, 150);

let txt = new TextBox(w);
txt.move(50, 300);

let bar = new ProgressBar(w, 400);
bar.move(50, 400);
bar.value = 8;

let scrll = new ScrollBar(w, 200);
scrll.move(400, 50);
