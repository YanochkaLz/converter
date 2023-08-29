import React, { useEffect, useMemo, useRef, useState } from "react";

const CoderField = ({
  style,
  arrayOfNumbers,
  readOnly = false,
  setResult,
  output,
}) => {
  const [focusedRow, setFocusedRow] = useState(1);

  const handleChangeTextArea = (event) => {
    const cursorPosition = event.target.selectionStart;
    const linesBeforeCursor = event.target.value
      .substr(0, cursorPosition)
      .split("\n");
    setFocusedRow(linesBeforeCursor.length);
    handleFormLayout(event);
  };

  const handleFormLayout = (event) => {
    let str = event.target.value;
    let curr = {};
    let currentProp = null;
    let req = /[A-Z]|[a-z]/;
    let req2 = /[A-Z]|[a-z]|[0-9]/;

    if (str.length) {
      for (let char of str) {
        if (char === ".") {
          currentProp = "class";
          if(!curr[currentProp]) {
            curr[currentProp] = []
          }
          curr[currentProp].push('');
        } else if (char === "#") {
          currentProp = "id";
          curr[currentProp] = "";
        } else if (!currentProp && char.match(req)) {
          currentProp = "tag";
          curr[currentProp] = char;
        } else if (char.match(req2)) {
          if(currentProp === 'class') {
            curr[currentProp][curr[currentProp].length-1] += char;
          } else {
            curr[currentProp] += char;
          }
        } else {
          setResult("error");
          return;
        }
      }
      let layout = document.createElement(curr.tag || "div");
      if (curr.class?.length) {
        curr.class.forEach(c => {
          if(c) {
            layout.classList.add(c);
          }
        });
      }
      if (curr.id) {
        layout.id = curr.id;
      }
      setResult(layout);
    } else {
      setResult('')
    }
  };

  const handlClickTextArea = (event) => {
    const cursorPosition = event.target.selectionStart;
    const linesBeforeCursor = event.target.value
      .substr(0, cursorPosition)
      .split("\n");
    setFocusedRow(linesBeforeCursor.length);
  };

  useEffect(() => {
    if (output && readOnly) {
      if (output === "error") {
        document.querySelector(".output-section").textContent =
          "Incorrect input!";
        document.querySelector(".output-section").style.color = "red";
      } else {
        document.querySelector(".output-section").style.color = "black";
        document.querySelector(".output-section").textContent =
          output.outerHTML;
      }
    } else {
      document.querySelector(".output-section").textContent = ''
    }
  }, [output]);

  return (
    <div style={style} className="coder-field">
      <ul style={style} className="numbers">
        {arrayOfNumbers?.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      {!readOnly ? (
        <>
          <textarea
            onClick={(e) => handlClickTextArea(e)}
            onChange={(e) => handleChangeTextArea(e)}
            style={{ color: style.color }}
          ></textarea>
          <div
            style={{ top: (focusedRow - 1) * 30 + 10 }}
            className="selectedGrey"
          ></div>
        </>
      ) : (
        <textarea
          readOnly={readOnly}
          className="output-section"
          style={{ color: style.color }}
        ></textarea>
      )}
    </div>
  );
};

export default CoderField;
