import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "../App";

test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("First React component test with Enzyme", () => {
    const wrapper = shallow(<App />);
    test("renders without crashing", () => {
        expect(wrapper.contains("Group Collaboration")).toEqual(true);
    });
});
