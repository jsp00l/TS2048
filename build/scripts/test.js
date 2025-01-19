import { AbstractAnimation, SlowToFastAnimation } from "./animation.js";
import { Rectangle } from "./draw.js";
import { Button } from "./ui.js";
class LinearAnimation extends AbstractAnimation {
    calculateForT(t) { return t; }
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
};
startButton.onUnhovered = () => {
    startButton.color = Color.Blue;
};
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
let start = undefined;
let lastTimestamp = 0;
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
};
animation1.assignValue = (value) => {
    blueRect.position.x = value;
};
animation2.onFinishedCallback = () => {
    animation3.start();
};
animation2.assignValue = (value) => {
    redRect.position.x = value;
};
animation3.onFinishedCallback = () => {
    animation4.start();
};
animation3.assignValue = (value) => {
    redRect.position.x = value;
};
animation4.onFinishedCallback = () => {
    animation1.start();
};
animation4.assignValue = (value) => {
    blueRect.position.x = value;
};
let started = false;
startButton.onClicked = () => {
    animation1.start();
    startButton.text = started ? "Start" : "Stop";
    started = !started;
};
function easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
        return n1 * x * x;
    }
    else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    }
    else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    }
    else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}
animation1.calculateForT = (t) => {
    return 1 - easeOutBounce(1 - t);
};
animation2.calculateForT = (t) => {
    return easeOutBounce(t);
};
animation3.calculateForT = (t) => {
    return 1 - easeOutBounce(1 - t);
};
animation4.calculateForT = (t) => {
    return easeOutBounce(t);
};
function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    for (let animation of AbstractAnimation.runningAnimations) {
        animation.update(timestamp);
    }
    mainDrawLoop();
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
