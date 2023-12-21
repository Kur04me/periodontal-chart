import React, { CSSProperties } from "react";
import {
  LABEL_PATTERN,
  LABEL_WIDTH,
  TOOTH_GRID_WIDTH,
  TOOTH_NUMBERS,
} from "./constance";
import {
  JawType,
  Mode,
  Position,
  Surface,
  SurfacesWithoutOcclusal,
} from "./types";
import { TeethStatus } from "./types";
import Chart from "./Chart";
import ToothSVGContainer from "./ToothSVGContainer";
import PODInputWrapper from "./PODInputWrapper";

type TeethContainerProps = {
  which: `${JawType}-${Surface}`;
  teethStatus: TeethStatus;
  setTeethStatus: (newStatus: TeethStatus) => void;
  mode?: Mode;
};

const labelClasses: { [key: number]: string } = {
  0: "pod-label",
  1: "recession-label",
  2: "mm-label",
  3: "mobility-label",
};

const positions: Position[] = ["d", "c", "m"];

const TeethContainer = ({
  which,
  teethStatus,
  setTeethStatus,
  mode,
}: TeethContainerProps): JSX.Element => {
  const isLeft = (toothNumber: string): boolean =>
    toothNumber[0] === "2" || toothNumber[0] === "3";

  const [jawType, surface] = which.split("-") as [JawType, Surface];
  const labels: string[] | null = LABEL_PATTERN[jawType][surface];

  const renderLabels = (labels: string[] | null): JSX.Element | null => {
    if (!labels) return null;
    return (
      <>
        {labels.map((label, index) => (
          <p key={index} className={labelClasses[index]}>
            {label}
          </p>
        ))}
      </>
    );
  };

  const handleClickPod = (e: React.MouseEvent<HTMLInputElement>) => {
    const [toothNumber, surface, _, position] = e.currentTarget.id.split("-");
    const currentPodState =
      teethStatus[toothNumber].values[surface as SurfacesWithoutOcclusal].pod[
        position as Position
      ];

    let newPodState: { bop: boolean; pus: boolean } = { ...currentPodState };

    switch (mode) {
      case "bop":
        newPodState = { ...newPodState, bop: !currentPodState.bop, pus: false };
        break;
      case "pus":
        newPodState = { ...newPodState, pus: !currentPodState.pus, bop: false };
        break;
      case "default":
        return;
    }

    const newStatus: TeethStatus = {
      ...teethStatus,
      [toothNumber]: {
        ...teethStatus[toothNumber],
        values: {
          ...teethStatus[toothNumber].values,
          [surface]: {
            ...teethStatus[toothNumber].values[
              surface as SurfacesWithoutOcclusal
            ],
            pod: {
              ...teethStatus[toothNumber].values[
                surface as SurfacesWithoutOcclusal
              ].pod,
              [position]: newPodState,
            },
          },
        },
      },
    };

    setTeethStatus(newStatus);
  };

  const getPODInputStyle = (
    toothNumber: string,
    surface: SurfacesWithoutOcclusal,
    index: number
  ): CSSProperties => {
    const _positions = isLeft(toothNumber)
      ? [...positions].reverse()
      : positions;
    const pod = teethStatus[toothNumber].values[surface].pod[_positions[index]];

    if (pod.bop) {
      return { border: "2px solid red" };
    } else if (pod.pus) {
      return { border: "2px solid #FFF100" };
    }
    return { border: "none" };
  };

  return (
    <div
      id={`${which}`}
      className="teeth-grid-wrapper"
      style={{
        gridTemplateColumns:
          surface === "occlusal"
            ? `${LABEL_WIDTH}px repeat(16, auto)` // occlusalの場合はただ16分割するだけ
            : [LABEL_WIDTH, ...TOOTH_GRID_WIDTH[jawType]]
                .map((width) => `${width}px`)
                .join(" "),
        width:
          surface !== "occlusal"
            ? [LABEL_WIDTH, ...TOOTH_GRID_WIDTH[jawType]].reduce(
                (acc, val) => acc + val,
                0
              )
            : "",
      }}
    >
      {/* グラフの表示 */}
      {surface !== "occlusal" ? (
        <Chart teethStatus={teethStatus} jawType={jawType} surface={surface} />
      ) : null}

      {/* ラベルの表示 */}
      {renderLabels(labels)}

      {TOOTH_NUMBERS[jawType].map((toothNumber) => (
        <React.Fragment key={`${which}_${toothNumber}`}>
          <ToothSVGContainer
            toothNumber={toothNumber}
            jawType={jawType}
            surface={surface}
            teethStatus={teethStatus}
            setTeethStatus={setTeethStatus}
          />
          <PODInputWrapper
            toothNumber={toothNumber}
            surface={surface as SurfacesWithoutOcclusal}
            teethStatus={teethStatus}
          />
          {labels && labels[0] !== undefined ? (
            <div
              id={`${toothNumber}-${surface}-pod-wrapper`}
              className={`pod-wrapper ${
                teethStatus[toothNumber].exists ? "" : "invisible"
              }`}
              style={{
                gridColumn: `${
                  2 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)
                } / ${3 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)}`,
              }}
            >
              {[...Array(3)].map((_, index) => (
                <div
                  className="input-container"
                  key={`${toothNumber}_${surface}_pod_${
                    isLeft(toothNumber)
                      ? [...positions].reverse()[index]
                      : [...positions][index]
                  }`}
                >
                  <input
                    type="number"
                    className="pod"
                    style={getPODInputStyle(
                      toothNumber,
                      surface as SurfacesWithoutOcclusal,
                      index
                    )}
                    id={`${toothNumber}-${surface}-pod-${
                      isLeft(toothNumber)
                        ? [...positions].reverse()[index]
                        : [...positions][index]
                    }`}
                    onClick={(e) => {
                      handleClickPod(e);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {labels && labels[1] !== undefined ? (
            <div
              className={`input-container recession ${
                teethStatus[toothNumber].exists ? "" : "invisible"
              }`}
              style={{
                gridColumn: `${
                  2 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)
                } / ${3 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)}`,
              }}
            >
              <input type="number" id={`${toothNumber}-${surface}-recession`} />
            </div>
          ) : (
            ""
          )}
          {labels && labels[2] !== undefined ? (
            <div
              className={`input-container mm ${
                teethStatus[toothNumber].exists ? "" : "invisible"
              }`}
              style={{
                gridColumn: `${
                  2 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)
                } / ${3 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)}`,
              }}
            >
              <input type="number" id={`${toothNumber}-${surface}-mm`} />
            </div>
          ) : (
            ""
          )}
          {labels && labels[3] !== undefined ? (
            <div
              className={`input-container mobility ${
                teethStatus[toothNumber].exists ? "" : "invisible"
              }`}
              style={{
                gridColumn: `${
                  2 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)
                } / ${3 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)}`,
              }}
            >
              <input type="number" id={`${toothNumber}-${surface}-mobility`} />
            </div>
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TeethContainer;
