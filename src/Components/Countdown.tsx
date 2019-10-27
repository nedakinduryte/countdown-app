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
        console.log(date);
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