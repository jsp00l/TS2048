export class AbstractAnimation {
    static runningAnimations = [];
    m_isRunning = false;
    m_object = {};
    m_startValue = 0;
    m_endValue = 0;
    m_startTimestamp = undefined;
    duration = 0;
    constructor(duration, object, startValue, endValue) {
        this.duration = duration;
        this.m_object = object;
        this.m_startValue = startValue;
        this.m_endValue = endValue;
    }
    start() {
        this.m_isRunning = true;
        AbstractAnimation.runningAnimations.push(this);
    }
    stop() {
        this.m_isRunning = false;
        this.m_startTimestamp = undefined;
    }
    update(currentTimestamp) {
        if (!this.m_isRunning) {
            return;
        }
        if (this.m_startTimestamp === undefined) {
            this.m_startTimestamp = currentTimestamp;
            return;
        }
        const alreadyPlayed = currentTimestamp - this.m_startTimestamp;
        if (alreadyPlayed >= this.duration) {
            this.stop();
            const index = AbstractAnimation.runningAnimations.indexOf(this);
            if (index > -1) {
                AbstractAnimation.runningAnimations.splice(index, 1);
            }
            this.onFinishedCallback();
            return;
        }
        const t = this.calculateForT(alreadyPlayed / this.duration);
        const currentValue = this.m_startValue * (1 - t) + this.m_endValue * t;
        this.assignValue(currentValue);
    }
    onFinishedCallback() {
        throw new Error("Method not implemented.");
    }
    assignValue(value) {
        throw new Error("Method not implemented.");
    }
}
export class SlowToFastAnimation extends AbstractAnimation {
    calculateForT(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}
