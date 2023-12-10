import { useState, ChangeEvent } from "react";
import PrintButton from "./ui/PrintButton";

const Menu = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuState = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsMenuOpen(e.target.checked);
  };
  return (
    <div id="menu" className={isMenuOpen ? "show" : ""}>
      <div className="icon-container">
        <div id="menu-content">
          <PrintButton />
        </div>
        <div id="menu-button">
          <input
            type="checkbox"
            id="menu-toggle"
            onChange={(e) => {
              toggleMenuState(e);
            }}
          />
          <label
            htmlFor="menu-toggle"
            className={isMenuOpen ? "flip-vertical" : ""}
          >
            <svg id="menu-sign" width="50" height="20" viewBox="0 0 50 20">
              <polyline points="17,6 25,11 33,6" strokeWidth="2" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Menu;
