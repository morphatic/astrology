import { planetFactory } from './planet';

export const aspectTypes = {
  "conjunct":       { name: "conjunct",       major: true,  angle:   0,     orb: 6  , symbol: "<" },
  "semisextile":    { name: "semisextile",    major: false, angle:  30,     orb: 3  , symbol: "y" },
  "decile":         { name: "decile",         major: false, angle:  36,     orb: 1.5, symbol: ">" },
  "novile":         { name: "novile",         major: false, angle:  40,     orb: 1.9, symbol: "M" },
  "semisquare":     { name: "semisquare",     major: false, angle:  45,     orb: 3  , symbol: "=" },
  "septile":        { name: "septile",        major: false, angle:  51.417, orb: 2  , symbol: "V" },
  "sextile":        { name: "sextile",        major: true,  angle:  60,     orb: 6  , symbol: "x" },
  "quintile":       { name: "quintile",       major: false, angle:  72,     orb: 2  , symbol: "Y" },
  "bilin":          { name: "bilin",          major: false, angle:  75,     orb: 0.9, symbol: "-" },
  "binovile":       { name: "binovile",       major: false, angle:  80,     orb: 2  , symbol: ";" },
  "square":         { name: "square",         major: true,  angle:  90,     orb: 6  , symbol: "c" },
  "biseptile":      { name: "biseptile",      major: false, angle: 102.851, orb: 2  , symbol: "N" },
  "tredecile":      { name: "tredecile",      major: false, angle: 108,     orb: 2  , symbol: "X" },
  "trine":          { name: "trine",          major: true,  angle: 120,     orb: 6  , symbol: "Q" },
  "sesquiquadrate": { name: "sesquiquadrate", major: false, angle: 135,     orb: 3  , symbol: "b" },
  "biquintile":     { name: "biquintile",     major: false, angle: 144,     orb: 2  , symbol: "C" },
  "inconjunct":     { name: "inconjunct",     major: false, angle: 150,     orb: 3  , symbol: "n" },
  "treseptile":     { name: "treseptile",     major: false, angle: 154.284, orb: 1.1, symbol: "B" },
  "tetranovile":    { name: "tetranovile",    major: false, angle: 160,     orb: 3  , symbol: ":" },
  "tao":            { name: "tao",            major: false, angle: 165,     orb: 1.5, symbol: "—" },
  "opposition":     { name: "opposition",     major: true,  angle: 180,     orb: 6  , symbol: "m" }
};

export const aspectFactory = ({ p1, p2 }) => {

  // get key properties of the planets
  let l1 = p1.longitude;
  let l2 = p2.longitude;
  let ng = Math.abs( l1 - l2 );
  let r1 = p1.isRetrograde;
  let r2 = p2.isRetrograde;
  let s1 = Math.abs(p1.speed);
  let s2 = Math.abs(p2.speed);
  let ct = false; // corrected?

  // correct for cases where the angle > 180 + the orb of opposition
  if (ng > 180 + aspectTypes["opposition"].orb) {
    ng = l1 > l2 ? 360 - l1 + l2 : 360 - l2 + l1;
    ct = true;
  }

  // determine the aspect type
  let type = Object.values(aspectTypes).find(t => ng >= t.angle - t.orb && ng <= t.angle + t.orb);

  // bail out if there is no in-orb aspect between these two planets
  if (typeof type === "undefined") {
    throw new Error("There is no aspect between these two planets.");
  }

  // determine the orb
  let orb = Number((ng % 1).toFixed(6));

  // determine if it is applying or not; use speed magnitude (i.e. absolute value)
  let ong = ng - type.angle;
  let isApplying = (
    ( 
      (ong < 0 && !ct && l2 > l1) || (ong > 0 && !ct && l1 > l2) ||
      (ong < 0 &&  ct && l1 > l2) || (ong > 0 &&  ct && l2 > l1) 
    ) &&
    ( (!r1 && !r2 && s2 > s1) || (r1 && r2 && s1 > s2) || (r1 && !r2) ) ||
    (
      ( 
        (ong > 0 && !ct && l2 > l1) || (ong < 0 && !ct && l1 > l2) ||
        (ong > 0 &&  ct && l1 > l2) || (ong < 0 &&  ct && l2 > l1)
      ) &&
      ( (!r1 && !r2 && s1 > s2) || (r1 && r2 && s2 > s1) || (!r1 && r2) ) 
    ) 
  );

  let isParallel = Math.abs(p1.latitude - p2.latitude) <= 1.0;
  let isContraparallel = Math.abs(p1.latitude + p2.latitude) <= 1.0;

  return { p1, p2, type, orb, isApplying, isParallel, isContraparallel };
};