import { mount, configure, ReactWrapper } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import moment from "moment";
import { Sidebar } from "../Sidebar";
import Button from "@material-ui/core/Button";
import { shallow } from "enzyme";

configure({ adapter: new Adapter() });

describe("Testing Sidebar component", () => {
    it("Should call setValues function", () => {
        const setValues = jest.fn();
        const closeDrawer = jest.fn();

        const wrapper = shallow(
            <Sidebar setValues={setValues} closeDrawer={closeDrawer} />
        );

        wrapper
            .find(Button)
            .at(0)
            .simulate("click");

        expect(setValues).toHaveBeenCalled();
        expect(setValues).toHaveBeenCalledWith(
            moment().format("YYYY-MM-DD"),
            ""
        );

        wrapper.unmount();
    });
});
