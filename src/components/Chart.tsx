import { Area, XAxis, YAxis, Tooltip, Line, ComposedChart } from "recharts";
import { LABEL_WIDTH, TOOTH_GRID_WIDTH, TOOTH_NUMBERS } from "./constance";
import { TeethStatus, SurfacesWithoutOcclusal } from "./types";
import { useEffect, useState } from "react";

type Props = {
  teethStatus: TeethStatus;
  jawType: "maxilla" | "mandibular";
  surface: SurfacesWithoutOcclusal;
};

const chartWidth = TOOTH_GRID_WIDTH.maxilla.reduce((acc, val) => acc + val, 0); // maxillaとmandibularは合計値は同じ

// 描画するラインは歯肉縁(recession)とポケット底(recession + pod)、MGJ(MM)の3本
const Chart = ({ teethStatus, jawType, surface }: Props) => {
  const [data, setData] = useState<{ [key: string]: number | number[] }[]>([]);
  const style: React.CSSProperties = {
    left: LABEL_WIDTH + "px",
    ...(jawType === "mandibular" ? { top: 48 } : {}),
  };

  useEffect(() => {
    let _data: { [key: string]: number | number[] }[] = [];
    let stackX = 0;
    TOOTH_NUMBERS[jawType].forEach((key) => {
      const toothGridWidth = TOOTH_GRID_WIDTH[jawType];
      const width = toothGridWidth[TOOTH_NUMBERS[jawType].indexOf(key)];
      if (teethStatus[key].exists) {
        const [x1, x2, x3] = [
          stackX + (width * 1) / 4,
          stackX + (width * 2) / 4,
          stackX + (width * 3) / 4,
        ].map((value) => Math.round(value));
        const recession = teethStatus[key].values[surface].recession;
        const mm = teethStatus[key].values[surface].mm as number;
        const pod_d = teethStatus[key].values[surface].pod.d.value;
        const pod_c = teethStatus[key].values[surface].pod.c.value;
        const pod_m = teethStatus[key].values[surface].pod.m.value;
        const isLeft = key[0] === "2" || key[0] === "3";
        _data.push(
          ...[
            {
              xpx: x1,
              pod: [recession, recession + (isLeft ? pod_m : pod_d)],
              mm: mm,
            },
            {
              xpx: x2,
              pod: [recession, recession + pod_c],
              mm: mm,
            },
            {
              xpx: x3,
              pod: [recession, recession + (isLeft ? pod_d : pod_m)],
              mm: mm,
            },
          ]
        );
      } else {
        _data.push(
          ...[
            {
              xpx: stackX,
              pod: [0, 0],
              mm: 0,
            },
            {
              xpx: stackX + width,
              pod: [0, 0],
              mm: 0,
            },
          ]
        );
      }
      stackX += width;
    });
    // 両端を延長
    if (_data.length !== 0) {
      const firstData = _data[0];
      const finalData = _data[_data.length - 1];
      setData([
        { xpx: 0, pod: firstData.pod, mm: firstData.mm },
        ..._data,
        { xpx: chartWidth, pod: finalData.pod, mm: finalData.mm },
      ]);
    }
  }, [teethStatus, jawType, surface]);

  return (
    <ComposedChart
      width={chartWidth}
      height={72}
      data={data}
      className="chart"
      style={style}
      margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <XAxis domain={[0, 650]} hide={true} type="number" dataKey="xpx" />
      <YAxis
        domain={[0, 18]}
        hide={true}
        type="number"
        dataKey="pod"
        reversed={jawType === "mandibular" ? true : false}
      />
      <Area type="monotone" dataKey="pod" stroke="crimson" fill="red" />
      {!(jawType === "maxilla" && surface === "palatal") ? (
        <Line type="monotone" dataKey="mm" stroke="blue" dot={false} />
      ) : null}
    </ComposedChart>
  );
};

export default Chart;
