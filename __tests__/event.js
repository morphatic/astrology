import { eventFactory } from "../src/event.js";

describe("An Event", () => {

  it("has a date that defaults to new Date().toISOString()", () => {
    let e = eventFactory();
    let now = new Date().toISOString().substr(0,16);
    expect(e.date).toBeDefined();
    expect(e.date).toMatch(now);
  });

  it("has a date that can be specified with a Date object", () => {
    let aDate = new Date("February 17, 1974, 19:30 EDT");
    let e = eventFactory({date: aDate});
    expect(e.date).toBe("1974-02-17T23:30:00.000Z");
  });

  it("has a date that can be specified as an ISO Date String", () => {
    let e = eventFactory({date: "1974-02-17T23:30Z"});
    expect(e.date).toBe("1974-02-17T23:30Z");
  });

});