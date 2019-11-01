import React from 'react';
import {NewCountdown} from './Sidebar';


export const Countdown: React.FC<{}> = () => {

    const [targetDate, setTargetDate] = React.useState('');
    const [daysDifference, setDaysDifference] = React.useState('');
    const [targetEvent, setTargetEvent] = React.useState('');

    const getTargetValues = (date: string, eventName: string) => {
        setTargetDate(date);
        setTargetEvent(eventName);
    };

    // setCountdownDate = (targetDate: string) => {
    //     this.setState({
    //         targetDate: targetDate
    //     }, () => {
    //         this.calculateDifference();
    //     });
    // }

    // calculateDifference = () => {
    //     const stringToArray = this.state.targetDate.toString().split("-").map(Number); // date string  --> date array
    //     const countdownDate = new Date(stringToArray[0], stringToArray[1] - 1, stringToArray[2]); // date array --> date object constructor
    //     const todaysDate = new Date();

    //     const differenceInTime = countdownDate.getTime() - todaysDate.getTime();
    //     const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24); // milliseconds * seconds * minutes * hours
    //     this.setState({difference: Math.round(differenceInDays)});
    // }

    // setCountdownEvent = (event: string) => {
    //     this.setState({event: event});
    // }

    return (
        <div>
            {/* <div>{this.state.difference ? this.state.difference+" days until" : "No date selected"}</div>
            <div>{this.state.event}</div> */}
            <NewCountdown
                getTargetValues={getTargetValues}
            />
        </div>
    )
}