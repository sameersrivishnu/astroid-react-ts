import React from "react";
import Asteroid from "../Container/Asteroid";
import renderer from "react-test-renderer";

describe("Asteroid Component", () => {
  it("should render without throwing an error", async () => {
    const rendered = renderer.create(<Asteroid />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
