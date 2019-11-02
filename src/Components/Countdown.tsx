import React from 'react';
import {NewCountdown} from './Sidebar';
import moment from 'moment';


export const Countdown: React.FC<{}> = () => {

    const [daysUntil, setDaysUntil] = React.useState(0);

    const getTargetValues = (date: string, eventName: string) => {
        localStorage.setItem("countdown", JSON.stringify({
            "targetDate": date,
            "eventName": eventName ? eventName : "A very very very special event"
        }));

        calculateDifference();
    };

    const calculateDifference = () => {
        const date = JSON.parse(localStorage.getItem("countdown") as string).targetDate;
        const targetDate = moment(date);
        const todaysDate = moment();
        
        const countdownDate = targetDate.diff(todaysDate) / (1000 * 60 * 60 * 24);
        setDaysUntil(Math.round(countdownDate));
    }

    const days = () => {
        if (JSON.parse(localStorage.getItem("countdown") as string).targetDate === 1) {
            return "day"
        } else {
            return "days"
        }
    }

    return (
        <div>
            <div>{daysUntil + " " + days() + " until"}</div>
            <div>{JSON.parse(localStorage.getItem("countdown") as string).eventName}</div>
            <NewCountdown
                getTargetValues={getTargetValues}
            />
        </div>
    )
}