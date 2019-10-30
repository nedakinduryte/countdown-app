import React from 'react';
import NewCountdown from './NewCountdown';
import TextField from './TextField';

interface State {
    date: string,
    difference: number | string,
    event: string
}

class Countdown extends React.Component <{}, State> {
    state = {
        date: "",
        difference: "",
        event: ""
    }

    setCountdownDate = (date: string) => {
        this.setState({
            date: date
        }, () => {
            this.calculateDifference();
        });
    }

    calculateDifference = () => {
        const stringToArray = this.state.date.toString().split("-").map(Number); // date string  --> date array
        const countdownDate = new Date(stringToArray[0], stringToArray[1] - 1, stringToArray[2]); // date array --> date object constructor
        const todaysDate = new Date();

        const differenceInTime = countdownDate.getTime() - todaysDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24); // milliseconds * seconds * minutes * hours
        this.setState({difference: Math.round(differenceInDays)});
    }

    setCountdownEvent = (event: string) => {
        this.setState({event: event});
    }

    render() {
        return (
            <div>
                <div>{this.state.difference ? this.state.difference+" days until" : "No date selected"}</div>
                <div>{this.state.event}</div>
                <NewCountdown
                    setCountdownDate={this.setCountdownDate}
                />
                <TextField
                    setCountdownEvent={this.setCountdownEvent}
                />
            </div>
        )
    }
}

export default Countdown;