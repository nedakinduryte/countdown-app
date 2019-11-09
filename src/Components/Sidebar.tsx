import React, { useState } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        datePicker: {
            width: "200px",
        },
        textField: {
            marginRight: theme.spacing(1),
            width: 200,
            marginLeft: 0,
        },
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    })
)

interface ComponentProps {
    getTargetValues(date: string, eventName: string): void;
    closeDrawer(side: string, open: boolean): void;
}

export const Sidebar: React.FC<ComponentProps> = props => {
    
    const [targetDate, setTargetDate] = React.useState(moment().format("YYYY-MM-DD"));
    const [targetEvent, setTargetEvent] = React.useState('');

    const setTargetValues = (targetDate: string, targetEvent: string) => {
        props.getTargetValues(targetDate, targetEvent);
    }

    const classes = useStyles();

    return (
        <div>
            <h1>New countdown</h1>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    value={targetDate ? targetDate : moment()}
                    onChange={date => date ? setTargetDate(date.format("YYYY-MM-DD")) : setTargetDate("")}
                    minDate={moment()}
                    className={classes.datePicker}    
                />
            </MuiPickersUtilsProvider>
            <TextField
                onChange={event => setTargetEvent(event.target.value)}
                id="standard-basic"
                className={classes.textField}
                label="Event name"
                margin="normal"
                inputProps={{maxlength: 32}}
            />
            <Button
                variant="contained"
                className={classes.button}
                onClick={() => {
                    setTargetValues(targetDate, targetEvent)
                    props.closeDrawer('left', false);
                }}
            >
                Save
            </Button>
        </div>
    )
}