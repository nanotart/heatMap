"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Look up the Web Speech API (https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
// Initialize this variable when the window first loads
let VOICE_SYNTH;
// The current speaking rate of the screen reader
let VOICE_RATE = 1;
// Stores elements and their handler functions
// Think of an appropriate data structure to do this
// Assign this variable in mapPage()
let ELEMENT_HANDLERS;
let ELEMENT_IDS;
let PAUSED = false;
let SKIPPED = false;
// Indicates the current element that the user is on
// You can decide the type of this variable
let current;
let currOriginalColor;
let link = null;
/**
 * Speaks out text.
 * @param text the text to speak
 */
function speak(text) {
    if (VOICE_SYNTH) {
        let utterance = new SpeechSynthesisUtterance(text);
        VOICE_SYNTH.speak(utterance);
        utterance.rate = VOICE_RATE;
        //utterance.onstart = () => element.classList.add("highlight");
        // initialize a speech request using SpeechSynthesisUtterance
        // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
        // check out the onstart and onend attributes of SpeechSynthesisUtterance
        // consider what might happen if this function is called several times
        // HINT: use Promises and async/await!
        return new Promise(resolve => {
            utterance.onend = () => {
                //console.log("Finished");
                resolve();
            };
        });
    }
}
window.onload = () => {
    PAUSED = false;
    VOICE_SYNTH = window.speechSynthesis;
    generateHandlers();
    document.body.innerHTML = `
        <div id="screenReader">
            <button onclick="start()">Start [Space]</button>
            <button onclick="pause()">Pause/Resume [P]</button>
            <button onclick="changeVoiceRate(1.1);">Speed Up [Right Arrow]</button>
            <button onclick="changeVoiceRate(0.9);">Slow Down [Left Arrow]</button>
            <button onclick="next()">Next [Down Arrow]</button>
            <button onclick="previous()">Previous [Up Arrow]</button>
        </div>
    ` + document.body.innerHTML;
    document.addEventListener("keydown", globalKeystrokes);
};
function generateHandlers() {
    //TODO: get all the HTML elements in the DOM using document.getElementsByTagName("*")
    let elements = document.getElementsByTagName("*");
    ELEMENT_HANDLERS = new Map();
    ELEMENT_IDS = new Array();
    //TODO: assign every element an id (you can use the id to locate an element when you implement highlighting)
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.id = i;
        //ELEMENT_IDS.set(element,i);
    }
    //TODO: generate handler functions for all elements based on their tag name
    for (const element of elements) {
        let tag = element.tagName;
        if (tag.startsWith('H') && tag != 'HTML' && tag != 'HEAD' || tag === 'P' || tag === "LABEL" || tag === "TH"
            || tag === "TD") {
            ELEMENT_HANDLERS.set(element.id, textHandler);
            ELEMENT_IDS.push(element.id);
        }
        else if (tag === "IMG") {
            ELEMENT_HANDLERS.set(element.id, imageHandler);
            ELEMENT_IDS.push(element.id);
        }
        else if (tag === "A") {
            ELEMENT_HANDLERS.set(element.id, linkHandler);
            ELEMENT_IDS.push(element.id);
        }
        else if (tag === "INPUT") {
            let input = element;
            if (input.type === "submit") {
                ELEMENT_HANDLERS.set(element.id, buttonHandler);
                ELEMENT_IDS.push(element.id);
            }
            else if (input.type === "text") {
                ELEMENT_HANDLERS.set(element.id, inputHandler);
                ELEMENT_IDS.push(element.id);
            }
        }
    }
    //console.log(ELEMENT_HANDLERS);
    ``;
    //TODO: add each element to ELEMENT_HANDLERS, along with its handler
}
function textHandler(element) {
    return element.textContent;
}
function imageHandler(element) {
    return "image of" + element.alt;
}
function linkHandler(element) {
    return __awaiter(this, void 0, void 0, function* () {
        link = element.href;
        let text = element.text;
        element.style.backgroundColor = "yellow";
        yield speak(text);
        yield speak("If you want to follow the link, press L");
        return " ";
    });
}
function buttonHandler(element) {
    return __awaiter(this, void 0, void 0, function* () {
        let text = element.value;
        element.style.backgroundColor = "yellow";
        element.focus();
        yield speak(text);
        yield speak("Press Enter to Press the button");
        yield new Promise(resolve => {
            element.onsubmit = () => {
                //console.log("Finished");
                resolve();
            };
        });
        return " ";
    });
}
function inputHandler(element) {
    return __awaiter(this, void 0, void 0, function* () {
        let text = "Type your input now";
        element.style.backgroundColor = "yellow";
        element.focus();
        yield speak(text);
        yield new Promise(resolve => {
            element.onkeydown = (e) => {
                //console.log("Finished");
                if (e.key === "Enter") {
                    e.preventDefault();
                    resolve();
                }
            };
        });
        return " ";
    });
}
/**
 * Changes the speaking rate of the screen reader.
 * @param factor multiplier on the speaking rate
 */
function changeVoiceRate(factor) {
    VOICE_RATE *= factor;
    if (VOICE_RATE > 4) {
        VOICE_RATE = 4;
    }
    else if (VOICE_RATE < 0.25) {
        VOICE_RATE = 0.25;
    }
}
/**
 * Moves to the next HTML element in the DOM.
 */
function next() {
    VOICE_SYNTH.cancel();
    //current = current + 1;
    // start(current);
}
/**
 * Moves to the previous HTML element in the DOM.
 */
function previous() {
    VOICE_SYNTH.cancel();
    SKIPPED = true;
    setTimeout(() => {
        current = current - 1;
        SKIPPED = false;
        start(current);
    }, 200);
    // let element : HTMLElement = document.getElementById(ELEMENT_IDS[current]) as HTMLElement;
    // element.style.backgroundColor = currOriginalColor;
}
/**
 * Starts reading the page continuously.
 */
function start(index) {
    return __awaiter(this, void 0, void 0, function* () {
        ////ELEMENT_HANDLERS.forEach((value :string, key : string) => speaker(value,key));
        // for (let [key, value] of ELEMENT_HANDLERS) {
        //     current = key;
        //     const element: HTMLElement = document.getElementById(key) as HTMLElement;
        //     const originalColor = element.style.backgroundColor;
        //     element.style.backgroundColor = "yellow";
        //     //console.dir(value);
        //     await speak(value);
        //     element.style.backgroundColor = originalColor;
        // }
        console.dir(ELEMENT_HANDLERS);
        console.dir(ELEMENT_IDS);
        for (let i = index; i < ELEMENT_IDS.length; i++) {
            let key = ELEMENT_IDS[i];
            let handleFunc = ELEMENT_HANDLERS.get(key);
            const element = document.getElementById(key);
            currOriginalColor = element.style.backgroundColor;
            let value = yield handleFunc(document.getElementById(key));
            current = i;
            element.style.backgroundColor = "yellow";
            //console.dir(value);
            yield speak(value);
            element.style.backgroundColor = currOriginalColor;
            if (SKIPPED) {
                break;
            }
        }
    });
}
/**
 * Pauses the reading of the page.
 */
function pause() {
    if (PAUSED) {
        resume();
    }
    else {
        PAUSED = true;
        VOICE_SYNTH.pause();
    }
}
/**
* Resumes the reading of the page.
*/
function resume() {
    PAUSED = false;
    VOICE_SYNTH.resume();
}
/**
 * Listens for keydown events.
 * @param event keydown event
 */
function globalKeystrokes(event) {
    // can change and add key mappings as needed
    if (event.key === " ") {
        event.preventDefault();
        //TODO: start reading the entire page
        start(0);
    }
    else if (event.key === "ArrowRight") {
        event.preventDefault();
        changeVoiceRate(1.1);
    }
    else if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeVoiceRate(0.9);
    }
    else if (event.key === "p") {
        event.preventDefault();
        pause();
    }
    else if (event.key === "ArrowUp") {
        event.preventDefault();
        previous();
    }
    else if (event.key === "ArrowDown") {
        event.preventDefault();
        next();
    }
    else if (event.key === "l") {
        if (link != null) {
            event.preventDefault();
            window.open(link, "_blank");
            pause();
        }
    }
}
