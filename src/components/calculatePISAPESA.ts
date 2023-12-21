import { SurfacesWithoutOcclusal, TeethStatus } from "./types";

const sumPodValues = (teethStatus: TeethStatus): { [key: string]: number } => {
  const sumPods: { [K in string]: number } = {};
  Object.keys(teethStatus).forEach((tooth) => {
    let sum = 0;
    const toothValues = teethStatus[tooth].values;
    Object.keys(toothValues).forEach((surface) => {
      const pods = toothValues[surface as SurfacesWithoutOcclusal].pod;
      sum += pods.d.value + pods.c.value + pods.m.value;
    });
    sumPods[tooth] = sum;
  });
  return sumPods;
};

const pisa = (teethStatus: TeethStatus) => {
  const podValues = sumPodValues(teethStatus);
};

const coefficients = {
  "18": [],
  "17": [25.4265, 4.6241, 3.0787, 0.95774, 0.10923, 0.0040876],
};