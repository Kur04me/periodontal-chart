import { Pod, SurfacesWithoutOcclusal, TeethStatus } from "./types";

/**
 * teethStatusを初期化します。
 * @returns 初期化されたTeethStatusオブジェクトを返します。
 */
const initTeethStatus = (): TeethStatus => {
  const teethStatus: TeethStatus = {};
  const teeth = ["1", "2", "3", "4", "5", "6", "7", "8"];
  for (let i = 1; i < 5; i++) {
    teeth.forEach((tooth) => {
      teethStatus[String(i) + tooth] = {
        exists: true,
        values: {
          buccal: {
            pod: {
              m: { value: 0, bop: false, pus: false },
              c: { value: 0, bop: false, pus: false },
              d: { value: 0, bop: false, pus: false },
            },
            recession: 0,
            mm: 0,
            mobility: 0,
          },
          palatal: {
            pod: {
              m: { value: 0, bop: false, pus: false },
              c: { value: 0, bop: false, pus: false },
              d: { value: 0, bop: false, pus: false },
            },
            recession: 0,
          },
          lingual: {
            pod: {
              m: { value: 0, bop: false, pus: false },
              c: { value: 0, bop: false, pus: false },
              d: { value: 0, bop: false, pus: false },
            },
            recession: 0,
            mm: 0,
          },
        },
      };
    });
  }
  return teethStatus;
};

interface Types {
  [key: string]: Pod | number | null;
}

const podValueSample = () => {
  return Math.round(1 + 2 * Math.random());
};

export const sampleData: TeethStatus = initTeethStatus();
Object.keys(sampleData).forEach((toothNumber) => {
  sampleData[toothNumber] = {
    exists: true,
    values: {
      buccal: {
        pod: {
          m: { value: podValueSample(), bop: false, pus: false },
          c: { value: podValueSample(), bop: false, pus: false },
          d: { value: podValueSample(), bop: false, pus: false },
        },
        recession: Math.round(1 * Math.random()),
        mm: Math.round(5 + 3 * Math.random()),
        mobility: 0,
      },
      palatal: {
        pod: {
          m: { value: podValueSample(), bop: false, pus: false },
          c: { value: podValueSample(), bop: false, pus: false },
          d: { value: podValueSample(), bop: false, pus: false },
        },
        recession: Math.round(1 * Math.random()),
      },
      lingual: {
        pod: {
          m: { value: podValueSample(), bop: false, pus: false },
          c: { value: podValueSample(), bop: false, pus: false },
          d: { value: podValueSample(), bop: false, pus: false },
        },
        recession: Math.round(1 * Math.random()),
        mm: Math.round(5 + 3 * Math.random()),
      },
    },
  };
});
