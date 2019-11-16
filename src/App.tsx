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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250
        },
        fullList: {
            width: "auto"
        },
        fab: {
            margin: "20px"
        },
        background: {
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            height: "100vh"
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
                width: "68px"
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
                left: "155px"
            }
        }
    })
);

export const App: React.FC = () => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

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
                        closeDrawer={closeDrawer}
                    />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.background}>
            <img src='arrow.png' alt="Arrow" className={classes.arrow} />
            <div className={classes.addNew}>Add a new countdown</div>
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={toggleDrawer("left", true)}
            >
                <AddIcon />
            </Fab>
            <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
                {sideList("left")}
            </Drawer>
            <Countdown />
        </div>
    );
};
