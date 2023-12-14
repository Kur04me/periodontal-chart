import { useState, useEffect } from "react";
import TeethContainer from "./TeethContainer";
import examFlow from "../exam_flow";
import { TeethStatus, SurfacesWithoutOcclusal, Position, Mode } from "./types";
import { KEY_BIND } from "./constance";
import RadioButton from "./RadioButton";
import { sampleData } from "./sampleData";

// TODO: BOP機能
// TODO: リファクタリング
// TODO: 部位選択機能(右上臼歯部、上顎前歯部等)
// TODO: 前回の入力値の復元
// TODO: 患者管理
// TODO: PISA&PESA

/**
 * teethStatusを初期化します。
 * @returns 初期化されたTeethStatusオブジェクトを返します。
 */
const initTeethStatus = (): TeethStatus => {
  const teethStatus: TeethStatus = {};
  if (process.env.NODE_ENV === "development") return sampleData; // 開発環境ではサンプルデータを返す
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

const MainContent = (): JSX.Element => {
  const [teethStatus, setTeethStatus] = useState(initTeethStatus());

  /**
   * PODの値を更新します。
   * @param toothNumber 歯番
   * @param surface 歯牙の表面
   * @param position 遠心、中心、近心
   * @param value POD値
   */
  const updatePODValue = (
    toothNumber: string,
    surface: SurfacesWithoutOcclusal,
    position: Position,
    value: number
  ): void => {
    setTeethStatus((prevState) => {
      const tooth = prevState[toothNumber];
      const surfaceData = tooth.values[surface];
      const podData = surfaceData.pod;
      // 新しいPODデータを作成
      const newPodData = {
        ...podData,
        [position]: {
          ...podData[position],
          value: value,
        },
      };
      console.log("POD value has updated.", newPodData);
      return {
        ...prevState,
        [toothNumber]: {
          ...tooth,
          values: {
            ...tooth.values,
            [surface]: {
              ...surfaceData,
              pod: newPodData,
            },
          },
        },
      };
    });
  };

  const updateValue = (
    toothNumber: string,
    type: string,
    surface: SurfacesWithoutOcclusal,
    value: number
  ): void => {
    setTeethStatus((prevState) => {
      const tooth = prevState[toothNumber];
      const surfaceData = tooth.values[surface];
      console.log("Value has updated.", type, value);
      return {
        ...prevState,
        [toothNumber]: {
          ...tooth,
          values: {
            ...tooth.values,
            [surface]: {
              ...surfaceData,
              [type]: value,
            },
          },
        },
      };
    });
  };

  useEffect(() => {
    // inputで表示されているものだけを取得し、統合
    const allInputs = Array.from(
      document.querySelectorAll<HTMLInputElement>("input")
    ).filter((input) => input.offsetParent !== null);

    // [todo] いずれは検査順を設定で変更できるようにしたい
    // 入力順の設定
    let actualExamFlow: HTMLInputElement[] = new Array(3 * 16 * 4 + 16 * 9); // すべてのマス数
    allInputs.forEach((inputElement) => {
      actualExamFlow[examFlow.indexOf(inputElement.id)] = inputElement;
    }); // 存在するinputを当てはめる
    actualExamFlow = actualExamFlow.filter(
      (element) => element instanceof HTMLInputElement
    ); // 存在するelementを検査順に並べる

    // キーが押された際のハンドラ
    const handleKeyPress = (event: KeyboardEvent) => {
      const focusNextInput = (flow: HTMLInputElement[], shift: boolean) => {
        // インデックスを計算する関数
        const calculateIndex = (currentIndex: number, shift: boolean) => {
          return shift
            ? (currentIndex - 1 + flow.length) % flow.length
            : (currentIndex + 1) % flow.length;
        };
        // 現在フォーカスされている要素を取得
        const focusedElement = document.activeElement;
        // 現在フォーカスされている要素のインデックスを見つける
        const focusedIndex = flow.indexOf(focusedElement as HTMLInputElement);
        // 次の要素のインデックスを計算し、フォーカスを移動
        const nextIndex = calculateIndex(focusedIndex, shift);
        flow[nextIndex].focus();
      };

      switch (event.key) {
        case "e":
          event.preventDefault(); // 標準の動作をキャンセル
          break;
        case "Tab":
          event.preventDefault(); // 標準の動作をキャンセル
          focusNextInput(actualExamFlow, event.shiftKey);
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case "-":
        case "^":
        case "\\":
          event.preventDefault(); // 標準の動作をキャンセル
          const id = document.activeElement?.id as string;
          const [toothNumber, surface, _, position] = id.split("-") as [
            string,
            SurfacesWithoutOcclusal,
            string,
            Position
          ];
          if (id.includes("pod")) {
            const inputValue = KEY_BIND[event.key];
            (document.activeElement as HTMLInputElement).value =
              inputValue.toString(); // inputに値を代入
            const isLeft = toothNumber[0] === "2" || toothNumber[0] === "3";
            updatePODValue(toothNumber, surface, position, inputValue);
            focusNextInput(actualExamFlow, event.shiftKey);
            break;
          } else if (id.includes("recession")) {
            const inputValue = KEY_BIND[event.key];
            (document.activeElement as HTMLInputElement).value =
              inputValue.toString(); // inputに値を代入
            updateValue(toothNumber, "recession", surface, inputValue);
            focusNextInput(actualExamFlow, event.shiftKey);
            break;
          } else if (id.includes("mm")) {
            const inputValue = KEY_BIND[event.key];
            (document.activeElement as HTMLInputElement).value =
              inputValue.toString(); // inputに値を代入
            updateValue(toothNumber, "mm", surface, inputValue);
            console.dir(teethStatus);
            focusNextInput(actualExamFlow, event.shiftKey);
            break;
          } else if (
            id.includes("mobility") &&
            ["0", "1", "2", "3"].includes(event.key)
          ) {
            const inputValue = KEY_BIND[event.key];
            (document.activeElement as HTMLInputElement).value =
              inputValue.toString();
            updateValue(toothNumber, "mobility", surface, inputValue);
            focusNextInput(actualExamFlow, event.shiftKey);
            break;
          }
        default:
          break;
      }
    };

    // イベントリスナーをdocumentに追加
    document.addEventListener("keydown", handleKeyPress);

    // クリーンアップ関数
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // 依存配列に `teethStatus` を追加
  }, [teethStatus]);

  // 入力モードを管理するstate
  const [mode, setMode] = useState("default") as [Mode, Function];
  const handleChangeMode = (mode: Mode) => {
    setMode(mode);
  };

  return (
    <div id="main-content">
      <RadioButton handleChangeMode={handleChangeMode} mode={mode} />
      <div id="maxilla">
        <TeethContainer
          which="maxilla-buccal"
          teethStatus={teethStatus}
          setTeethStatus={setTeethStatus}
          mode={mode}
        />
        <TeethContainer
          which="maxilla-palatal"
          teethStatus={teethStatus}
          setTeethStatus={setTeethStatus}
          mode={mode}
        />
        <TeethContainer
          which="maxilla-occlusal"
          teethStatus={teethStatus}
          setTeethStatus={setTeethStatus}
          mode={mode}
        />
      </div>
      <div id="mandibular">
        <TeethContainer
          which="mandibular-occlusal"
          teethStatus={teethStatus}
          setTeethStatus={setTeethStatus}
          mode={mode}
        />
        <TeethContainer
          which="mandibular-lingual"
          teethStatus={teethStatus}
          setTeethStatus={setTeethStatus}
          mode={mode}
        />
        <TeethContainer
          which="mandibular-buccal"
          teethStatus={teethStatus}
          setTeethStatus={setTeethStatus}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default MainContent;
