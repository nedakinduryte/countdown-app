import React, {MouseEvent} from 'react';

interface State {
    event: string
}

interface Props {
    setCountdownEvent: (event: string) => void
}

class TextElement extends React.Component<Props, State> {
    State = {
        event: ""
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({event: event.target.value});
    };

    handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.setCountdownEvent(this.state.event);
    };

    render() {
        return (
            <div>
                <div>Your countdown event</div>
                <input
                    type="text" 
                    onChange={(e) => this.handleChange(e)}
                />
                <button
                    onClick={this.handleClick}
                >Save</button>
            </div>
        )
    }
}

export default TextElement;