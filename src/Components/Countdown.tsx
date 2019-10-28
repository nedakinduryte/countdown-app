import React from 'react';
import NewCountdown from './NewCountdown';

interface State {
    date: string
}

class Countdown extends React.Component <{}, State> {
    state = {
        date: ""
    }

    setCountdownDate = (date: string) => {
        this.setState({date: date});
        this.calculateDifference();
    }

    getTodaysDate = () => {
        let today = new Date();
        let dd = parseInt(String(today.getDate()).padStart(2, '0'), 10);
        let mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'), 10);
        let yyyy = today.getFullYear();

        return [yyyy, mm, dd];
    }

    calculateDifference = () => {
        let countdownDate = this.state.date.toString().split("-").map(Number);
        let todaysDate = this.getTodaysDate();

        
    }

    render() {
        return (
            <NewCountdown
            setCountdownDate={this.setCountdownDate}
            />
        )
    }
}

export default Countdown;