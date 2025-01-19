
export abstract class AbstractAnimation {
    static runningAnimations: AbstractAnimation[] = [];
    private m_isRunning: boolean = false;
    private m_object: Object = {};
    private m_startValue: number = 0;
    private m_endValue: number = 0;
    private m_startTimestamp: number | undefined = undefined;
    public duration: number = 0; // In ms

    constructor(duration: number, object: Object, startValue: number, endValue: number) {
        this.duration = duration;
        this.m_object = object;
        this.m_startValue = startValue;
        this.m_endValue = endValue;
    }

    public start(): void {
        this.m_isRunning = true;
        AbstractAnimation.runningAnimations.push(this);
    }
    public stop(): void {
        this.m_isRunning = false;
        this.m_startTimestamp = undefined;
    }

    public update(currentTimestamp: number) {
        if (!this.m_isRunning) {
            return;
        }
        if (this.m_startTimestamp === undefined) {
            this.m_startTimestamp = currentTimestamp;
            return; //Note: maybe not needed?
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

    abstract calculateForT(t: number): number;
    onFinishedCallback() {
        throw new Error("Method not implemented.");
    }
    assignValue(value: number): void {
        throw new Error("Method not implemented.");
    }
}

export class SlowToFastAnimation extends AbstractAnimation {
    calculateForT(t: number): number {
        return 1 - Math.pow(1 - t, 4);
    }
}