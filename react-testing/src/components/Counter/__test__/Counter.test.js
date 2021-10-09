import React from "react";
import Counter from "../Counter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

afterEach(() => {
  // default
  cleanup();
});

test("header renders with correct text", () => {
  const headerEl = getByTestId("header");

  expect(headerEl.textContent).toBe("My Counter");
});

test("counter initialy start with text of zero", () => {
  const coutnerEl = getByTestId("count");

  expect(coutnerEl.textContent).toBe("0");
});

test("input contains initial value of 1", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
});

test("add button renders with minus sign", () => {
  const subtractBtn = getByTestId("subtract-btn");

  expect(subtractBtn.textContent).toBe("-");
});

test("add button renders with plus sign", () => {
  const addBtn = getByTestId("add-btn");

  expect(addBtn.textContent).toBe("+");
});

test("click on plus btn adds 1 to counter", () => {
  const coutnerEl = getByTestId("count");
  const btnEl = getByTestId("add-btn");

  expect(coutnerEl.textContent).toBe("0");
  fireEvent.click(btnEl);
  expect(coutnerEl.textContent).toBe("1");
});

test("click on plus btn substracts 1 to counter", () => {
  const coutnerEl = getByTestId("count");
  const substractBtnEl = getByTestId("subtract-btn");

  expect(coutnerEl.textContent).toBe("0");
  fireEvent.click(substractBtnEl);
  expect(coutnerEl.textContent).toBe("-1");
});

test("change input value then clicking on add btn works correctly", () => {
  const coutnerEl = getByTestId("count");
  const btnEl = getByTestId("add-btn");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(btnEl);

  expect(coutnerEl.textContent).toBe("5");
});

test("change input value then clicking on substract btn works correctly", () => {
  const coutnerEl = getByTestId("count");
  const btnEl = getByTestId("subtract-btn");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(btnEl);

  expect(coutnerEl.textContent).toBe("-5");
});

test("adding and then substracting leads to the correct counter number", () => {
  const coutnerEl = getByTestId("count");
  const addBtnEl = getByTestId("add-btn");
  const substractEl = getByTestId("subtract-btn");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "10",
    },
  });

  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(substractEl);
  fireEvent.click(substractEl);

  expect(coutnerEl.textContent).toBe("20");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtnEl);
  fireEvent.click(substractEl);
  fireEvent.click(substractEl);

  expect(coutnerEl.textContent).toBe("15");
});

test("counter contains correct className", () => {
  const coutnerEl = getByTestId("count");
  const addBtnEl = getByTestId("add-btn");
  const substractEl = getByTestId("subtract-btn");
  const inputEl = getByTestId("input");

  expect(coutnerEl.className).toBe("");

  fireEvent.change(inputEl, {
    target: {
      value: "50",
    },
  });

  fireEvent.click(addBtnEl);

  expect(coutnerEl.className).toBe("");

  fireEvent.click(addBtnEl);

  expect(coutnerEl.className).toBe("green");

  fireEvent.click(addBtnEl);

  expect(coutnerEl.className).toBe("green");

  fireEvent.click(substractEl);
  fireEvent.click(substractEl);

  expect(coutnerEl.className).toBe("");

  fireEvent.click(substractEl);
  fireEvent.click(substractEl);
  fireEvent.click(substractEl);

  expect(coutnerEl.className).toBe("red");
});
