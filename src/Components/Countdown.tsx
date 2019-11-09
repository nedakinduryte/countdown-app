import React from "react";
import { Sidebar } from "./Sidebar";
import moment from "moment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Background from "../../src/background.jpg";
import Arrow from "../../src/arrow.png";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250
        },
        fullList: {
            width: "auto"
        },
        fab: {
            margin: theme.spacing(1)
        },
        background: {
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        },
        arrow: {
            height: "48px",
            width: "80px",
            position: "absolute",
            top: "30px",
            left: "85px",
            transform: "rotate(135deg)",
            [theme.breakpoints.down("xs")]: {
                height: "36px",
                width: "68px",
                left: "72px"
            }
        },
        addNew: {
            fontFamily: "'Nothing You Could Do', cursive",
            fontSize: "1.5em",
            position: "absolute",
            top: "20px",
            left: "170px",
            [theme.breakpoints.down("xs")]: {
                fontSize: "1em",
                left: "140px"
            }
        },
        container: {
            margin: "auto"
        },
        counter: {
            textAlign: "center",
            fontFamily: "'Overpass', sans-serif",
            color: "#fff",
            fontSize: "6em",
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
            [theme.breakpoints.down("xs")]: {
                fontSize: "3em"
            }
        }
    })
);

export const Countdown: React.FC<{}> = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const [daysUntil, setDaysUntil] = React.useState(0);

    const getTargetValues = (date: string, eventName: string) => {
        localStorage.setItem(
            "countdown",
            JSON.stringify({
                targetDate: date,
                eventName: eventName
                    ? eventName
                    : "A very very very special event"
            })
        );

        calculateDifference();
    };

    const calculateDifference = () => {
        const date = JSON.parse(localStorage.getItem("countdown") as string)
            .targetDate;
        const targetDate = moment(date).add(1, "days");
        const todaysDate = moment();

        const countdownDate = targetDate.diff(todaysDate, "days");
        setDaysUntil(countdownDate);
    };

    React.useEffect(() => {
        calculateDifference();
    }, []);

    const days = () => {
        const daysLeft = JSON.parse(localStorage.getItem("countdown") as string)
            .targetDate;

        if (daysUntil === 1 || daysLeft === 1) {
            return "day";
        } else {
            return "days";
        }
    };

    const toggleDrawer = (side: string, open: boolean) => (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setState({ ...state, [side]: open });
    };

    const closeDrawer = (side: string, open: boolean) =>
        setState({ ...state, [side]: open });

    const sideList = (side: string) => (
        <div className={classes.list} role="presentation">
            <List>
                <ListItem>
                    <Sidebar
                        getTargetValues={getTargetValues}
                        closeDrawer={closeDrawer}
                    />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.background}>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={toggleDrawer("left", true)}
            >
                <AddIcon />
            </Fab>
            <img src={Arrow} alt="Arrow" className={classes.arrow} />
            <div className={classes.addNew}>Add a new countdown</div>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
            </Drawer>
            <div className={classes.container}>
                <div className={classes.counter}>{daysUntil}</div>
                <div className={classes.daysUntil}>{days() + " until"}</div>
                <div className={classes.event}>
                    {
                        JSON.parse(localStorage.getItem("countdown") as string)
                            .eventName
                    }
                </div>
            </div>
        </div>
    );
};
