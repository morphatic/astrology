import { pointFactory } from "./point";

export const eventFactory = ({
  date = new Date().toISOString()
} = {}) => {


  // handle different kinds of date submissions
  if ("string" === typeof date) {
    // make sure it's in ISO format
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}\.\d{3})?Z/.test(date)) {
        throw new Error("Date not formatted according to ISO 8601 (YYYY-MM-DDTHH:mmZ)");
    }
  }
  else if (date instanceof Date) {
    date = date.toISOString();
  }

  return {
    date
  }
};