import { mount, configure, ReactWrapper } from "enzyme";
import React from "react";
import { Countdown } from "../Countdown";
import Adapter from "enzyme-adapter-react-16";
import moment from "moment";

configure({ adapter: new Adapter() });

describe("Testing Countdown component", () => {
    let wrapper: ReactWrapper;

    it("Should return one for tomorrow's date", () => {
        wrapper = mount(
            <Countdown
                data={{
                    date: moment()
                        .add(1, "days")
                        .format("YYYY-MM-DD"),
                    event: "Tomorrow"
                }}
            />
        );
        expect(
            wrapper
                .find("div")
                .at(1)
                .text()
        ).toEqual("1");
        expect(
            wrapper
                .find("div")
                .at(2)
                .text()
        ).toEqual("day until");
        expect(
            wrapper
                .find("div")
                .at(3)
                .text()
        ).toEqual("Tomorrow");
        wrapper.unmount();
    });

    it("Should return zero for yesterday's date", () => {
        wrapper = mount(
            <Countdown
                data={{
                    date: moment()
                        .subtract(1, "days")
                        .format("YYYY-MM-DD"),
                    event: "Not available"
                }}
            />
        );
        expect(
            wrapper
                .find("div")
                .at(1)
                .text()
        ).toEqual("0");
        expect(
            wrapper
                .find("div")
                .at(2)
                .text()
        ).toEqual("days until");
        expect(
            wrapper
                .find("div")
                .at(3)
                .text()
        ).toEqual("Not available");
        wrapper.unmount();
    });

    it("Should return 365 days", () => {
        wrapper = mount(
            <Countdown
                data={{
                    date: moment()
                        .add(365, "days")
                        .format("YYYY-MM-DD"),
                    event: "Next year"
                }}
            />
        );
        expect(
            wrapper
                .find("div")
                .at(1)
                .text()
        ).toEqual("365");
        expect(
            wrapper
                .find("div")
                .at(2)
                .text()
        ).toEqual("days until");
        expect(
            wrapper
                .find("div")
                .at(3)
                .text()
        ).toEqual("Next year");
        wrapper.unmount();
    });
});
