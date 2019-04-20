import RefreshController from './RefreshController';

export default class ScheduleController {

    private readonly timeOut: number;

    constructor() {
        this.timeOut = 60000;
    }

    public databaseScheduler() {
        RefreshController.refreshDatabase().then(() => {
            console.log('Scheduler has passed', new Date().toTimeString());
            setTimeout(() => {
                this.databaseScheduler();
            }, this.timeOut);
        }).catch(() => {
            console.error('Error happened in Scheduler');
            setTimeout(() => {
                this.databaseScheduler();
            }, this.timeOut);
        });
    }

}
