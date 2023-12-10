import { Position } from "./components/types";

const examFlow: string[] = [];

const positions: Position[] = ["d", "c", "m"];
const maxilla = [
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
];
const mandibular = [
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
];

// 1
maxilla.forEach((toothNumber, index) => {
  if (index < 8) {
    positions.forEach((position) => {
      examFlow.push(`${toothNumber}-buccal-pod-${position}`);
    });
  } else {
    [...positions].reverse().forEach((position) => {
      examFlow.push(`${toothNumber}-buccal-pod-${position}`);
    });
  }
});

// 2
[...maxilla].reverse().forEach((toothNumber, index) => {
  if (index < 8) {
    positions.forEach((position) => {
      examFlow.push(`${toothNumber}-palatal-pod-${position}`);
    });
  } else {
    [...positions].reverse().forEach((position) => {
      examFlow.push(`${toothNumber}-palatal-pod-${position}`);
    });
  }
});

// 3
[...mandibular].reverse().forEach((toothNumber, index) => {
  if (index < 8) {
    positions.forEach((position) => {
      examFlow.push(`${toothNumber}-buccal-pod-${position}`);
    });
  } else {
    [...positions].reverse().forEach((position) => {
      examFlow.push(`${toothNumber}-buccal-pod-${position}`);
    });
  }
});

// 4
mandibular.forEach((toothNumber, index) => {
  if (index < 8) {
    positions.forEach((position) => {
      examFlow.push(`${toothNumber}-lingual-pod-${position}`);
    });
  } else {
    [...positions].reverse().forEach((position) => {
      examFlow.push(`${toothNumber}-lingual-pod-${position}`);
    });
  }
});

// 5
maxilla.forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-buccal-mobility`);
});

// 6
[...mandibular].reverse().forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-buccal-mobility`);
});

// 7
maxilla.forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-buccal-recession`);
});

// 8
[...maxilla].reverse().forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-palatal-recession`);
});

// 9
[...mandibular].reverse().forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-buccal-recession`);
});

// 10
mandibular.forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-lingual-recession`);
});

// 11
maxilla.forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-buccal-mm`);
});

// 12
[...mandibular].reverse().forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-buccal-mm`);
});

// 13
mandibular.forEach((toothNumber) => {
  examFlow.push(`${toothNumber}-lingual-mm`);
});

export default examFlow;
