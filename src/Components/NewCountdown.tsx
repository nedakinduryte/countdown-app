import React, {MouseEvent} from 'react';

interface State {
    value: string
}

interface Props {
    setCountdownDate: (date: string) => void
}

class NewCountdown extends React.Component <Props, State> {
    state = {
        value: ""
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value});
    };

    handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.setCountdownDate(this.state.value);
    }

    render() {
        return (
            <div>
                <div>Select your countdown date</div>
                    <input 
                        type="date" 
                        value={this.state.value} 
                        onChange={(e) => this.handleChange(e)} />
                <button
                    onClick={this.handleClick}
                    disabled={!this.state.value}
                >Save</button>
            </div>
        )
    }
}

export default NewCountdown;