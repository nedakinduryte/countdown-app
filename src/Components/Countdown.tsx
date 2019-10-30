import React from 'react';
import NewCountdown from './NewCountdown';

interface State {
    date: string,
    difference: number | string
}

class Countdown extends React.Component <{}, State> {
    state = {
        date: "",
        difference: ""
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

    render() {
        return (
            <div>
                <div>{this.state.difference ? this.state.difference : "No date selected"}</div>
                <NewCountdown
                setCountdownDate={this.setCountdownDate}
                />
            </div>
        )
    }
}

export default Countdown;