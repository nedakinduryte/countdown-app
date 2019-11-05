import React from 'react';
import { Sidebar } from './Sidebar';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

export const Countdown: React.FC<{}> = () => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [daysUntil, setDaysUntil] = React.useState(0);

    const getTargetValues = (date: string, eventName: string) => {
        localStorage.setItem("countdown", JSON.stringify({
            "targetDate": date,
            "eventName": eventName ? eventName : "A very very very special event"
        }));

        calculateDifference();
    };

    const calculateDifference = () => {
        const date = JSON.parse(localStorage.getItem("countdown") as string).targetDate;
        const targetDate = moment(date).add(1, "days");
        const todaysDate = moment();
        
        const countdownDate = targetDate.diff(todaysDate, "days");
        setDaysUntil(countdownDate);
    }

    React.useEffect(() => {
        calculateDifference();
      }, []);

    const days = () => {
        const daysLeft = JSON.parse(localStorage.getItem("countdown") as string).targetDate;

        if (daysUntil === 1 || daysLeft === 1) {
            return "day";
        } else {
            return "days";
        }
    }

    const toggleDrawer = (side: string, open: boolean) => (event: React.MouseEvent<HTMLElement>) => {
        setState({ ...state, [side]: open });
    };

    const closeDrawer = (side: string, open: boolean) => setState({...state, [side]: open});

    const sideList = (side: string) => (
        <div
          className={classes.list}
          role="presentation"
        >
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
        <div>
            <Button onClick={toggleDrawer('left', true)}>Open Left</Button>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
            <div>{daysUntil + " " + days() + " until"}</div>
            <div>{JSON.parse(localStorage.getItem("countdown") as string).eventName}</div>
        </div>
    )
}