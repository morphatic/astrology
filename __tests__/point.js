import { pointFactory } from "../src/point";

describe("A Point", () => {

  let p;

  beforeEach(() => {
    p = pointFactory({lng: -79.18932, lat: 37.4381927, description: "Virginia Baptist Hospital"});
  });

  it("has a longitude(lng)", () => {
    expect(p.lng).toBeDefined();
    expect(p.lng).toEqual(-79.18932);
  });

  it("has a latitude(lat)", () => {
    expect(p.lat).toBeDefined();
    expect(p.lat).toEqual(37.4381927);
  });

  it("has a description", () => {
    expect(p.description).toBeDefined();
    expect(p.description).toEqual("Virginia Baptist Hospital");
  });
});