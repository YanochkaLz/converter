import React, { useEffect, useMemo, useRef, useState } from "react";

const symbols = ['.', '>', '^', '#'];

const CoderField = ({ style, arrayOfNumbers, readOnly = false }) => {
  const [focusedRow, setFocusedRow] = useState(1);

  const handleChangeTextArea = (event) => {
    const cursorPosition = event.target.selectionStart;
    const linesBeforeCursor = event.target.value
      .substr(0, cursorPosition)
      .split("\n");
    setFocusedRow(linesBeforeCursor.length);

    let str = event.target.value;
    for (let char of str) {
      
    }
  };

  const handlClickTextArea = (event) => {
    const cursorPosition = event.target.selectionStart;
    const linesBeforeCursor = event.target.value
      .substr(0, cursorPosition)
      .split("\n");
    setFocusedRow(linesBeforeCursor.length);
  };

  return (
    <div style={style} className="coder-field">
      <ul style={style} className="numbers">
        {arrayOfNumbers?.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      <textarea
        readOnly={readOnly}
        onClick={(e) => handlClickTextArea(e)}
        onChange={(e) => handleChangeTextArea(e)}
        style={{ color: style.color }}
      ></textarea>
      {!readOnly && (
        <div
          style={{ top: (focusedRow - 1) * 30 + 10 }}
          className="selectedGrey"
        ></div>
      )}
    </div>
  );
};

export default CoderField;
