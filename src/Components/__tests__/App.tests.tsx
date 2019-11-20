import { mount, configure, ReactWrapper } from "enzyme";
import React from "react";
import { App } from "../../App";
import Drawer from "@material-ui/core/Drawer";
import Adapter from "enzyme-adapter-react-16";
import Fab from "@material-ui/core/Fab";
import moment from "moment";

configure({ adapter: new Adapter() });

describe("Testing App component", () => {
    let wrapper: ReactWrapper;

    afterEach(() => {
        wrapper.unmount();
    });

    it("Should render correctly", () => {
        wrapper = mount(<App />);
        expect(wrapper.find(Drawer).length).toEqual(1);
        expect(wrapper.find(Fab).length).toEqual(1);
    });

    it("Should open sidebar on Fab click", () => {
        wrapper = mount(<App />);
        expect(
            wrapper
                .find(Drawer)
                .at(0)
                .props().open
        ).toBe(false);
        wrapper
            .find(Fab)
            .at(0)
            .simulate("click");
        expect(
            wrapper
                .find(Drawer)
                .at(0)
                .props().open
        ).toBe(true);
    });

    it("Should derive values from local storage", () => {
        localStorage.setItem(
            "countdown",
            JSON.stringify({
                targetDate: moment()
                    .add(1, "days")
                    .format("YYYY-MM-DD"),
                eventName: "Tomorrow"
            })
        );

        wrapper = mount(<App />);

        expect(
            wrapper
                .find("Countdown")
                .at(0)
                .find("div")
                .at(1)
                .text()
        ).toEqual("1");

        localStorage.removeItem("countdown");
    });
});
