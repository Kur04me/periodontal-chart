import { JawType } from "./types";

export const TOOTH_GRID_WIDTH: { [K in JawType]: number[] } = {
  maxilla: [39, 42, 44, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 44, 42, 39],
  mandibular: [42, 47, 46, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 46, 47, 42],
};

export const TOOTH_NUMBERS: { [K in JawType]: string[] } = {
  maxilla: [
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
  ],
  mandibular: [
    "48",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
  ],
};

export const KEY_BIND = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "0": 0,
  "-": 10,
  "^": 11,
  "\\": 12,
};

/**
 * POD, Recession等のラベルの幅です。(単位:px)
 */
export const LABEL_WIDTH = 40;
export const LABEL_PATTERN: {
  [K in JawType]: { [key: string]: string[] | null };
} = {
  maxilla: {
    buccal: ["POD", "Rec", "MM", "Mob"],
    palatal: ["POD", "Rec"],
    occlusal: null,
  },
  mandibular: {
    lingual: ["POD", "Rec", "MM"],
    buccal: ["POD", "Rec", "MM", "Mob"],
    occlusal: null,
  },
};
