import { TOOTH_GRID_WIDTH, TOOTH_NUMBERS } from "./constance";
import { JawType, Surface, TeethStatus } from "./types";

type Props = {
  toothNumber: string;
  jawType: JawType;
  surface: Surface;
  teethStatus: TeethStatus;
  setTeethStatus: (newStatus: TeethStatus) => void;
};

const ToothSVGContainer = ({
  toothNumber,
  jawType,
  surface,
  teethStatus,
  setTeethStatus,
}: Props) => {
  const isLeft = (toothNumber: String): boolean =>
    toothNumber[0] === "2" || toothNumber[0] === "3";

  const handleImageClick = () => {
    const isExist = teethStatus[toothNumber].exists;
    setTeethStatus({
      ...teethStatus,
      [toothNumber]: {
        ...teethStatus[toothNumber],
        exists: !isExist,
      },
    });
  };

  const imgURL = `/assets/${jawType}_${surface[0]}_${toothNumber[1]}.svg`; // "mandibular_b_1.svg"

  return (
    <div
      className="svg-container"
      style={{
        gridColumn: `${2 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)} / ${
          3 + TOOTH_NUMBERS[jawType].indexOf(toothNumber)
        }`,
      }}
    >
      {surface !== "occlusal" ? (
        <svg
          className="tooth-background-svg"
          width={
            TOOTH_GRID_WIDTH[jawType][
              TOOTH_NUMBERS[jawType].indexOf(toothNumber)
            ]
          }
          height="120"
          viewBox={`0 0 ${
            TOOTH_GRID_WIDTH[jawType][
              TOOTH_NUMBERS[jawType].indexOf(toothNumber)
            ]
          } 120`}
          id={`${jawType}-${surface}-${toothNumber}-svg-background`}
        >
          {[...Array(18)].map((_, index) => {
            const y = (index + 1) * 4 + (jawType === "mandibular" ? 44 : 0); // 下顎の場合は下に44pxずらす
            return (
              <line
                x1="0"
                y1={y}
                x2={
                  TOOTH_GRID_WIDTH[jawType][
                    TOOTH_NUMBERS[jawType].indexOf(toothNumber)
                  ]
                }
                y2={y}
                stroke="black"
                strokeWidth="0.5"
                key={y}
              />
            );
          })}
        </svg>
      ) : (
        ""
      )}
      <img
        src={imgURL}
        alt="tooth SVG"
        className={`${
          isLeft(toothNumber) ? "flip_horizontal" : ""
        } ${jawType}-svg`}
        style={{
          filter: teethStatus[toothNumber].exists ? "none" : "brightness(0)",
        }}
        onClick={handleImageClick}
      />
    </div>
  );
};

export default ToothSVGContainer;
