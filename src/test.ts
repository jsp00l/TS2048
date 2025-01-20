import { AbstractAnimation, SlowToFastAnimation } from "./animation.js"
import { drawRectangle, Rectangle } from "./draw.js";
import { Button } from "./ui.js";

class LinearAnimation extends AbstractAnimation {
    calculateForT(t: number): number { return t; }
}

let blueRect = new Rectangle();
blueRect.color = Color.Blue;
blueRect.width = 250;
blueRect.height = 80;
blueRect.position = { x: 100, y: 200 };

let redRect = new Rectangle();
redRect.color = Color.Red;
redRect.width = 250;
redRect.height = 80;
redRect.position = { x: 558, y: 200 };

let startButton = new Button();
startButton.position.x = 500;
startButton.position.y = 500;
startButton.text = "Start";
startButton.onHovered = () => {
    startButton.color = Color.Red;
}
startButton.onUnhovered = () => {
    startButton.color = Color.Blue;
}


CANVAS.addEventListener("mousemove", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    for (let hoverable of HOVERBALES) {
        if (hoverable.contains({ x: x, y: y })) {
            hoverable.onHovered();
        }
        else {
            hoverable.onUnhovered();
        }
    }
});

CANVAS.addEventListener("mousedown", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    for (let clickable of CLICKABLES) {
        if (clickable.contains({ x: x, y: y })) {
            clickable.onClicked();
        }
    }
});


let start: number | undefined = undefined;


function mainDrawLoop() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    blueRect.draw();
    redRect.draw();
    startButton.draw();
}


let animation1 = new SlowToFastAnimation(3000, blueRect, 100, 300);
let animation2 = new SlowToFastAnimation(3000, redRect, 558, 708);
let animation3 = new SlowToFastAnimation(3000, redRect, 708, 558);
let animation4 = new SlowToFastAnimation(3000, blueRect, 300, 100);

animation1.onFinishedCallback = () => {
    animation2.start();
}
animation1.assignValue = (value: number) => {
    blueRect.position.x = value;
}
animation2.onFinishedCallback = () => {
    animation3.start();
}
animation2.assignValue = (value: number) => {
    redRect.position.x = value;
}
animation3.onFinishedCallback = () => {
    animation4.start();
}
animation3.assignValue = (value: number) => {
    redRect.position.x = value;
}
animation4.onFinishedCallback = () => {
    animation1.start();
}
animation4.assignValue = (value: number) => {
    blueRect.position.x = value;
}

let started = false;
startButton.onClicked = () => {
    startButton.text = started ? "Start" : "Stop";

    if (!started) {
        let somethingStarted = false;
        for (let animation of AbstractAnimation.pausedAnimations) {
            animation.resume();
            somethingStarted = true;
        }
        if (!somethingStarted) { //Initial entry point
            animation1.start();
        }
    }
    else {
        for (let animation of AbstractAnimation.runningAnimations) {
            animation.pause();
        }
    }


    started = !started;
}


function easeOutBounce(x: number): number {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }

}
animation1.calculateForT = (t: number) => {
    return 1 - easeOutBounce(1 - t);
}

animation2.calculateForT = (t: number) => {
    return easeOutBounce(t);
}

animation3.calculateForT = (t: number) => {
    return 1 - easeOutBounce(1 - t);
}

animation4.calculateForT = (t: number) => {
    return easeOutBounce(t);
}


function step(timestamp: number) {
    if (start === undefined) {
        start = timestamp;
    }
    const deltaTime = timestamp - lastTimestamp;


    for (let animation of AbstractAnimation.runningAnimations) {
        animation.update(timestamp);
    }
    mainDrawLoop();
    lastTimestamp = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);




