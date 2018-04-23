export const PLANETARY_SYMBOLS = {
  "sun":        "a",
  "moon":       "s",
  "mercury":    "d",
  "venus":      "f",
  "earth":      "g",
  "mars":       "h",
  "jupiter":    "j",
  "saturn":     "k",
  "uranus":     "ö",
  "neptune":    "ä",
  "pluto":      "#",
  "south node": "?",
  "north node": "ß",
  "ceres":      "A",
  "pallas":     "S",
  "juno":       "D",
  "vesta":      "F",
  "lilith":     "ç",
  "cupido":     "L",
  "chiron":     "l",
  "nessus":     "ò",
  "pholus":     "ñ",
  "chariklo":   "î",
  "eris":       "È",
  "chaos":      "Ê",
  "fortuna":    "%"
};

export const planetFactory = ({ name, longitude, latitude, speed }) => ({
  name,
  longitude,
  latitude,
  speed,
  symbol: PLANETARY_SYMBOLS[name.toLowerCase()],
  isRetrograde: speed < 0,
  isMajor: ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn",
            "uranus", "neptune", "pluto", "north node", "south node"]
            .indexOf(name.toLowerCase()) > -1,
  isOutOfBounds: Math.abs(latitude) > 23.45
});
