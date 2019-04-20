import chalk from 'chalk';
const bgWhite = chalk.bgWhite;

class ProgressBar {

    private total: number;
    private current: number;
    private readonly length: number;
    private counter: number;

    constructor() {
        this.total = 0;
        this.current = 0;
        this.length = 0;
        this.counter = 0;
    }

    public init(total: number, action: string) {
        console.log(chalk.bgYellow(action));
        this.total = total;
        this.current = 0;
        this.counter = 0;
        this.update(this.current);
    }

    public tick() {
        this.counter = this.counter + 1;
        this.update(this.counter);
    }

     private update(current: number) {
        this.current = current;
        const currentProgress = this.current / this.total;
        this.draw(currentProgress);
    }

    private draw(current: number) {
        const filledBarLength: any = (current * this.length).toFixed(
            0,
        );
        const emptyBarLength = this.length - filledBarLength;

        const filledBar = this.getBar(filledBarLength, ' ', bgWhite);
        const emptyBar = this.getBar(emptyBarLength, '-');
        const percentageProgress = (current * 100).toFixed(2);

        // @ts-ignore
        process.stdout.clearLine();
        // @ts-ignore
        process.stdout.cursorTo(0);
        process.stdout.write(
            `Current progress: [${filledBar}${emptyBar}] | ${percentageProgress}%`,
        );
    }

    private getBar(length: number, char: string, color = (a: any) => a) {
        let str: string = '';
        for (let i: number = 0; i < length; i++) {
            str += char;
        }
        return color(str);
    }
}

export default ProgressBar;
