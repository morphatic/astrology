import { planetFactory } from "../src/planet";
import { aspectFactory } from "../src/aspect";

describe("An Aspect", () => {

  let a;

  beforeEach(() => {
    // planet positions from 2016-06-07 1:00AM EDT, Harrisonburg, VA
    let venus = planetFactory({ name: "Venus", longitude:  76.964243, latitude: 0.006298,  speed:  1.228344 });
    let pluto = planetFactory({ name: "Pluto", longitude: 286.924401, latitude: 1.416432,  speed: -0.020512 });
    a = aspectFactory({ p1: venus, p2: pluto });
  });

  it("has two planets", () => {
    expect(a.p1).toBeDefined();
    expect(a.p1.name).toBe("Venus");
    expect(a.p2).toBeDefined();
    expect(a.p2.name).toBe("Pluto");
  });

  it("has a type", () => {
    expect(a.type).toBeDefined();
    expect(a.type.name).toBe("inconjunct");
  });

  it("has a symbol", () => {
    expect(a.type.symbol).toBeDefined();
    expect(a.type.symbol).toBe("n");
  });

  it("has an orb", () => {
    expect(a.orb).toBeDefined();
    expect(a.orb).toBe(0.039842);
  });

  it("can be considered major or minor", () => {
    expect(a.type.major).toBeDefined();
    expect(a.type.major).toBe(false);
  });

  it("is applying or separating", () => {
    let moon      = planetFactory({ name: "Moon",       longitude: 105.106905, latitude: -4.432968, speed: 14.105873 });
    let mercury   = planetFactory({ name: "Mercury",    longitude:  53.033163, latitude: -3.428666, speed:  1.052675 });
    let mars      = planetFactory({ name: "Mars",       longitude: 236.530798, latitude: -1.912147, speed: -0.289540 });
    let jupiter   = planetFactory({ name: "Jupiter",    longitude: 164.462849, latitude:  1.268437, speed:  0.081820 });
    let saturn    = planetFactory({ name: "Saturn",     longitude: 252.825595, latitude:  1.798099, speed: -0.073836 });
    let neptune   = planetFactory({ name: "Neptune",    longitude: 342.027801, latitude: -0.836814, speed:  0.003678 });
    let northnode = planetFactory({ name: "North Node", longitude: 167.118052, latitude:  0.000000, speed: -0.154248 });
    let cupido    = planetFactory({ name: "Cupido",     longitude: 266.223864, latitude:  0.776123, speed: -0.020065 });

    // should be false since aspect is separating
    expect(a.isApplying).toBe(false);

    // testing a variety of aspects that are separating or applying
    // under various conditions
    a = aspectFactory({ p1: mars, p2: cupido });
    expect(a.isApplying).toBe(true);
    a = aspectFactory({ p1: mars, p2: jupiter });
    expect(a.isApplying).toBe(true);
    a = aspectFactory({ p1: mercury, p2: neptune });
    expect(a.isApplying).toBe(true);
    a = aspectFactory({ p1: neptune, p2: mercury }); // this helps our coverage
    expect(a.isApplying).toBe(true);
    // a = aspectFactory({ p1: mars, p2: northnode }); // this test is out of orb, but works
    // expect(a.isApplying).toBe(false);
    a = aspectFactory({ p1: moon, p2: saturn });
    expect(a.isApplying).toBe(false);
    a = aspectFactory({ p1: moon, p2: neptune });
    expect(a.isApplying).toBe(false);
  });

  it("can be parallel", () => {
    let jupiter   = planetFactory({ name: "Jupiter", longitude: 164.462849, latitude:  1.268437, speed:  0.081820 });
    let saturn    = planetFactory({ name: "Saturn",  longitude: 252.825595, latitude:  1.798099, speed: -0.073836 });
    a = aspectFactory({ p1: jupiter, p2: saturn });
    expect(a.isParallel).toBe(true);
  });

  it("can be contraparallel", () => {
    let mars      = planetFactory({ name: "Mars",   longitude: 236.530798, latitude: -1.912147, speed: -0.289540 });
    let saturn    = planetFactory({ name: "Saturn", longitude: 252.825595, latitude:  1.798099, speed: -0.073836 });
    a = aspectFactory({ p1: mars, p2: saturn });
    expect(a.isContraparallel).toBe(true);
  });

  it("throws an error if there is no aspect between the planets", () => {
    let moon = planetFactory({ name: "Moon", longitude: 105.106905, latitude: -4.432968, speed: 14.105873 });
    let mars = planetFactory({ name: "Mars", longitude: 236.530798, latitude: -1.912147, speed: -0.289540 });
    let ua;
    try {
      ua = aspectFactory({ p1: moon, p2: mars });
    } catch (err) {
      expect(err.message).toBe("There is no aspect between these two planets.");
    }
  });
});