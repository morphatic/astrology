import { planetFactory } from '../src/planet';

describe("A Planet", () => {
  let p;

  beforeEach(() => {
    p = planetFactory({ name: "Sun", longitude: 75.853439, latitude: -0.000140, speed: 0.957389 });
  });

  it("has a name", () => {
    expect(p.name).toBeDefined();
    expect(p.name).toBe("Sun");
  });

  it("has a longitude", () => {
    expect(p.longitude).toBeDefined();
    expect(p.longitude).toBe(75.853439);
  });

  it("has a latitude", () => {
    expect(p.latitude).toBeDefined();
    expect(p.latitude).toBe(-0.000140);
  });

  it("has a speed", () => {
    expect(p.speed).toBeDefined();
    expect(p.speed).toBe(0.957389);
  });

  it("has a symbol", () => {
    expect(p.symbol).toBeDefined();
    expect(p.symbol).toBe("a");
  });

  it("can be retrograde", () => {
    expect(typeof p.isRetrograde).toBe("boolean");
    expect(p.isRetrograde).toBe(false);
  });

  it("can be major or minor", () => {
    expect(typeof p.isMajor).toBe("boolean");
    expect(p.isMajor).toBe(true);
  });

  it("can be out of bounds", () => {
    expect(typeof p.isOutOfBounds).toBe("boolean");
    expect(p.isOutOfBounds).toBe(false);
  });
});