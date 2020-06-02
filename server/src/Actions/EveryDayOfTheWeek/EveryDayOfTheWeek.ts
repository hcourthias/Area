import { booster } from '@booster-ts/core';
import { inject } from '../../injector';
import { IAction } from '../../Interface/IAction';
import { IForm } from '../../Interface/IForm';
import cron = require("node-cron");
import { Dispatcher } from '../../Modules/Dispatcher/Dispatcher';


@booster({
    serviceName: "Time",
    name: "EveryDayOfTheWeek",
    type: "action"
})
export class EveryDayOfTheWeekAction implements IAction {

    private cron: cron.ScheduledTask;
    private weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    constructor(
        private dispatcher: Dispatcher
    ) {}

    /**
     * init
     * @description Init Action
     */
    public init(): Promise<void> {
        this.cron = cron.schedule('*/15 * * * *', () => {
            const time = new Date;
            this.dispatcher.dispatchAction('EveryDayOfTheWeek', {
                day: this.weekday[time.getDay()],
                hour: time.getHours().toString().padStart(2, '0'),
                minute: time.getMinutes().toString().padStart(2, '0')
            });
        });
        return Promise.resolve();
    }

    /**
     * getName
     * @description Get Action Name
     */
    public getName(): string {
        return "Every Day Of The Week";
    }

    /**
     * getDescription
     * @description Action Description
     */
    public getDescription(): string {
        return "Every Day Of The Week Action";
    }

    /**
     * getForm
     * @description get Action form
     */
    public getForm(): Promise<Array<IForm>> {
        return Promise.resolve([{
            selectionBox: {
                name: 'hour',
                title: 'Time of the Day',
                values: [
                    "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"
                ]
            }
        }, {
            selectionBox: {
                name: 'minute',
                title: '',
                values: [
                    "00", "15", "30", "45"
                ]
            }
        }, {
            selectionBox: {
                name: 'Day of the week',
                title: 'day',
                values: this.weekday
            }
        }]);
    }

    /**
     * listener
     * @description Action Call Back
     */
    public subscribe(): Promise<void> {
        return Promise.resolve();
    }

}

inject.register("EveryDayOfTheWeekAction", EveryDayOfTheWeekAction);