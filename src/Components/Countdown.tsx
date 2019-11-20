import React from "react";
import moment from "moment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            fontSize: "16px",
            justifySelf: "center",
            alignSelf: "center",
            [theme.breakpoints.down("xs")]: {
                fontSize: "12px"
            }
        },
        counter: {
            textAlign: "center",
            fontFamily: "'Overpass', sans-serif",
            color: "#fff",
            fontSize: "6em",
            lineHeight: "1em",
            margin: "0 auto"
        },
        daysUntil: {
            textAlign: "center",
            fontFamily: "'Overpass', sans-serif",
            color: "#fff",
            fontSize: "2.5em",
            margin: "0 auto"
        },
        event: {
            textAlign: "center",
            margin: "0 auto",
            width: "60vw",
            fontFamily: "'Permanent Marker', cursive",
            fontSize: "5em",
            color: "#fff",
            lineHeight: "1.1em"
        }
    })
);

interface ComponentProps {
    data: {
        date: string;
        event: string;
    };
}

export const Countdown: React.FC<ComponentProps> = props => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        daysUntil: 0,
        event: "A very very very special event",
        days: "days"
    });

    /*
     * Calculates the number of days between two days -
     * today's date and the countdown date.
     */
    const calculateDifference = () => {
        const daysLeft = moment(props.data.date)
            .add(1, "days")
            .diff(moment(), "days");

        setValues({
            daysUntil: daysLeft < 0 ? 0 : daysLeft,
            event:
                props.data.event === ""
                    ? "A very very very special event"
                    : props.data.event,
            days: daysLeft === 1 ? "day" : "days"
        });
    };

    React.useEffect(() => {
        calculateDifference();
    }, [props.data]);

    return (
        <div className={classes.container}>
            <div className={classes.counter}>{values.daysUntil}</div>
            <div className={classes.daysUntil}>{`${values.days} until`}</div>
            <div className={classes.event}>{values.event}</div>
        </div>
    );
};
