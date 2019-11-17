import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexWrap: "wrap"
        },
        datePicker: {
            width: "200px"
        },
        textField: {
            marginRight: theme.spacing(1),
            width: 200,
            marginLeft: 0
        },
        button: {
            margin: theme.spacing(1)
        },
        input: {
            display: "none"
        }
    })
);

interface ComponentProps {
    closeDrawer(side: string, open: boolean): void;
    setValues(targetDate: string, targetEvent: string): void;
}

export const Sidebar: React.FC<ComponentProps> = props => {
    const [targetDate, setTargetDate] = React.useState(
        moment().format("YYYY-MM-DD")
    );
    const [targetEvent, setTargetEvent] = React.useState("");

    const classes = useStyles();

    return (
        <div>
            <h1>New countdown</h1>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    value={targetDate ? targetDate : moment()}
                    onChange={date =>
                        date
                            ? setTargetDate(date.format("YYYY-MM-DD"))
                            : setTargetDate(moment().format("YYYY-MM-DD"))
                    }
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
                inputProps={{ maxLength: 32 }}
            />
            <Button
                variant="contained"
                className={classes.button}
                onClick={() => {
                    props.setValues(targetDate, targetEvent);
                    props.closeDrawer("left", false);
                }}
            >
                Save
            </Button>
        </div>
    );
};
