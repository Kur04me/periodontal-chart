import React from "react";
import { SurfacesWithoutOcclusal, TeethStatus } from "./types";

type Props = {
  toothNumber: string;
  surface: SurfacesWithoutOcclusal;
  teethStatus: TeethStatus;
};

const PODInputWrapper: React.FC<Props> = ({
  toothNumber,
  surface,
  teethStatus,
}: Props) => {
  return <></>;
};

export default PODInputWrapper;
