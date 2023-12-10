import { JawType } from "./types";

export const BASE_PATH = "/periodontal-chart"

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

export const TOOTH_SVG_FILE_WIDTHS: { [key: string]: number } = {
  "mandibular_b_1.svg": 21.6,
  "mandibular_b_2.svg": 24.4,
  "mandibular_b_3.svg": 28,
  "mandibular_b_4.svg": 28.4,
  "mandibular_b_5.svg": 29.6,
  "mandibular_b_6.svg": 45.599998,
  "mandibular_b_7.svg": 46.400002,
  "mandibular_b_8.svg": 42,
  "mandibular_l_1.svg": 21.6,
  "mandibular_l_2.svg": 24.4,
  "mandibular_l_3.svg": 26.799999,
  "mandibular_l_4.svg": 28.4,
  "mandibular_l_5.svg": 29.6,
  "mandibular_l_6.svg": 45.599998,
  "mandibular_l_7.svg": 46.400002,
  "mandibular_l_8.svg": 42,
  "mandibular_o_1.svg": 20,
  "mandibular_o_2.svg": 24,
  "mandibular_o_3.svg": 28,
  "mandibular_o_4.svg": 28,
  "mandibular_o_5.svg": 32,
  "mandibular_o_6.svg": 52,
  "mandibular_o_7.svg": 48,
  "mandibular_o_8.svg": 44,
  "maxilla_b_1.svg": 34.400002,
  "maxilla_b_2.svg": 27.6,
  "maxilla_b_3.svg": 31.6,
  "maxilla_b_4.svg": 28,
  "maxilla_b_5.svg": 27.6,
  "maxilla_b_6.svg": 42.400002,
  "maxilla_b_7.svg": 38.400002,
  "maxilla_b_8.svg": 35.599998,
  "maxilla_o_1.svg": 32,
  "maxilla_o_2.svg": 28,
  "maxilla_o_3.svg": 32,
  "maxilla_o_4.svg": 28,
  "maxilla_o_5.svg": 28,
  "maxilla_o_6.svg": 48,
  "maxilla_o_7.svg": 43,
  "maxilla_o_8.svg": 40,
  "maxilla_p_1.svg": 34.400002,
  "maxilla_p_2.svg": 27.6,
  "maxilla_p_3.svg": 31.6,
  "maxilla_p_4.svg": 29.200001,
  "maxilla_p_5.svg": 27.6,
  "maxilla_p_6.svg": 42.400002,
  "maxilla_p_7.svg": 38.400002,
  "maxilla_p_8.svg": 35.599998,
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
