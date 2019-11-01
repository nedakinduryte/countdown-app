import React, { useState } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    }
}))

interface ComponentProps {
    getTargetValues(date: string, eventName: string): void;
}

export const NewCountdown: React.FC<ComponentProps> = props => {
    
    const [targetDate, setTargetDate] = React.useState('');
    const [targetEvent, setTargetEvent] = React.useState('');

    const setTargetValues = (targetDate: string, targetEvent: string) => {
        console.log(targetDate, targetEvent);
        props.getTargetValues(targetDate, targetEvent);
    }

    const classes = useStyles();

    return (
        <div>
            <h1>New countdown</h1>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    value={moment()}
                    onChange={date => date ? setTargetDate(date.format("YYYY-MM-DD")) : setTargetDate("")}
                    minDate={moment()}    
                />
            </MuiPickersUtilsProvider>
            <TextField
                onChange={event => event.target.value ? setTargetEvent(event.target.value) : setTargetEvent("A very very very special event")}
                id="standard-basic"
                className={classes.textField}
                label="Event name"
                margin="normal"
            />
            <Button
                variant="contained"
                className={classes.button}
                onClick={() => setTargetValues(targetDate, targetEvent)}
            >
                Save
            </Button>
        </div>
    )
}