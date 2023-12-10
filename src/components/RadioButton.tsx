import React from "react";
import { Mode } from "./types";

type Props = {
  handleChangeMode: (mode: Mode) => void;
  mode: Mode;
};

const RadioButton = ({ handleChangeMode, mode }: Props): JSX.Element => {
  const items = ["通常", "BOP", "排膿"];
  const modes = ["default", "bop", "pus"];

  return (
    <div className="radio-button-container">
      {items.map((item, index) => {
        return (
          <React.Fragment key={item}>
            <input
              type="radio"
              id={item}
              name="mode"
              value={modes[items.indexOf(item)]}
              checked={mode === modes[items.indexOf(item)]}
              onChange={(e) => {
                handleChangeMode(e.target.value as Mode);
              }}
            />
            <label htmlFor={item}>{item}</label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RadioButton;
