export type JawType = "maxilla" | "mandibular";
export type Surface = "buccal" | "palatal" | "lingual" | "occlusal";
export type SurfacesWithoutOcclusal = Exclude<Surface, "occlusal">;
export type Position = "d" | "c" | "m";
export type Pod = {
  [K in Position]: { value: number; bop: boolean; pus: boolean };
};
export type Values = {
  [Surface in SurfacesWithoutOcclusal]: {
    pod: Pod;
    recession: number;
    mm?: number;
    mobility?: number;
  };
};
export type TeethStatus = {
  [key: string]: {
    exists: boolean;
    values: Values;
  };
};

export type Mode = "default" | "bop" | "pus";
