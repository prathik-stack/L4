/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const tommorow = new Date(new Date().setDate(today.getDate() + 1));

describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "Do Assignment",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
  });
  test("Add task", () => {
    let lengthBefore = all.length;
    add({
      title: "Take Tablet",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("Mark task as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due tasks", () => {
    const overduecount = overdue().length;
    add({
      title: "Get Books",
      dueDate: yesterday.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(overdue().length).toBe(overduecount + 1);
  });
  test("Due today tasks", () => {
    const duetodaycount = dueToday().length;
    add({
      title: "Prepare For Exam",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueToday().length).toBe(duetodaycount + 1);
  });
  test("Due later tasks", () => {
    const duelatercount = dueLater().length;
    add({
      title: "Prepare Speech",
      dueDate: tommorow.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueLater().length).toBe(duelatercount + 1);
  });
});
