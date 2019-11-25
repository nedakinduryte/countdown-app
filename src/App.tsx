import React from "react";
import { Countdown } from "./Components/Countdown";
import { Sidebar } from "./Components/Sidebar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import Background from "../src/background.jpg";
import Fab from "@material-ui/core/Fab";
import MomentUtils from "@date-io/moment";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250
        },
        fullList: {
            width: "auto"
        },
        fab: {
            margin: "1.5em"
        },
        background: {
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            fontSize: "16px",
            [theme.breakpoints.down("xs")]: {
                fontSize: "13px"
            }
        },
        topContainer: {
            position: "absolute",
            width: "100%",
            left: 0
        },
        arrow: {
            height: "3em",
            width: "5em",
            position: "absolute",
            top: "1.9em",
            left: "5.3em",
            transform: "rotate(135deg)",
            [theme.breakpoints.down("xs")]: {
                left: "6.5em"
            }
        },
        addNew: {
            fontFamily: "'Nothing You Could Do', cursive",
            fontSize: "1.5em",
            position: "absolute",
            top: "0.9em",
            left: "7.1em",
            padding: "0 1em 0 0",
            [theme.breakpoints.down("xs")]: {
                left: "7.9em"
            }
        }
    })
);

export const App: React.FC = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        //top: false,
        left: false
        //bottom: false,
        //right: false
    });

    const [data, setData] = React.useState({
        date: moment().format("YYYY-MM-DD"),
        event: "A very special event"
    });

    React.useEffect(() => {
        checkLocalStorage();
    }, []);

    /*
     * Function is called by Sidebar component and it sets values
     * to local storage and component state.
     */
    const setValues = (targetDate: string, targetEvent: string) => {
        localStorage.setItem(
            "countdown",
            JSON.stringify({
                targetDate: targetDate,
                eventName: targetEvent ? targetEvent : "A very special event"
            })
        );

        setData({ date: targetDate, event: targetEvent });
    };

    /*
     * On page refresh checks whether there are any values in
     * local storage and sets component's state with them
     * (or uses default values if local storage is empty).
     */
    const checkLocalStorage = () => {
        if (localStorage.hasOwnProperty("countdown")) {
            const countdown = JSON.parse(
                localStorage.getItem("countdown") as string
            );
            setData({ date: countdown.targetDate, event: countdown.eventName });
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
                    <Sidebar closeDrawer={closeDrawer} setValues={setValues} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.background}>
            <div className={classes.topContainer}>
                <img src="arrow.png" alt="Arrow" className={classes.arrow} />
                <div className={classes.addNew}>Add a new countdown</div>
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.fab}
                    onClick={toggleDrawer("left", true)}
                >
                    <AddIcon />
                </Fab>
            </div>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
            </Drawer>
            <Countdown data={data} />
        </div>
    );
};
