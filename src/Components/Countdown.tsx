import React from "react";
import moment from "moment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: "auto"
        },
        counter: {
            textAlign: "center",
            fontFamily: "'Overpass', sans-serif",
            color: "#fff",
            fontSize: "6em",
            lineHeight: "1em",
            margin: "0 auto",
            [theme.breakpoints.down("xs")]: {
                fontSize: "4em"
            }
        },
        daysUntil: {
            textAlign: "center",
            fontFamily: "'Overpass', sans-serif",
            color: "#fff",
            fontSize: "2.5em",
            margin: "0 auto",
            [theme.breakpoints.down("xs")]: {
                fontSize: "1.8em"
            }
        },
        event: {
            textAlign: "center",
            margin: "0 auto",
            width: "60vw",
            fontFamily: "'Permanent Marker', cursive",
            fontSize: "5em",
            color: "#fff",
            lineHeight: "1.1em",
            [theme.breakpoints.down("xs")]: {
                fontSize: "3em"
            }
        }
    })
);

export const Countdown: React.FC<{}> = () => {
    const classes = useStyles();

    const calculateDifference = () => {
        let date;
        let countdownDate;
        
        if (localStorage.hasOwnProperty("countdown")) {
            date = JSON.parse(localStorage.getItem("countdown") as string).targetDate;
            const targetDate = moment(date).add(1, "days");
            const todaysDate = moment();
            countdownDate  = targetDate.diff(todaysDate, "days") < 0 ? 0 : targetDate.diff(todaysDate, "days");
        } else {
            countdownDate = 0;
        }
        
        return countdownDate;
    };

    React.useEffect(() => {
        calculateDifference();
    }, []);

    const days = () => {
        if (calculateDifference() === 1) {
            return "day";
        } else {
            return "days";
        }
    };

    const renderEventName = () => { 
        if (localStorage.hasOwnProperty("countdown")) {
            return JSON.parse(localStorage.getItem("countdown") as string).eventName;
        } else {
            return "A very very very special event";
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.counter}>{ calculateDifference() }</div>
            <div className={classes.daysUntil}>{days() + " until"}</div>
            <div className={classes.event}>{ renderEventName() }</div>
        </div>
    );
};
