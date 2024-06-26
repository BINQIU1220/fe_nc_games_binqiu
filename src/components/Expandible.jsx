import { useState } from "react";

const Expandible = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <>
      {showChildren ? children : null}
      <button
        className="other-buttons"
        id="expande-btn"
        onClick={() => {
          setShowChildren((currentShow) => !currentShow);
        }}
      >
        Show {showChildren ? "Less" : "More"}
      </button>
    </>
  );
};

export default Expandible;
