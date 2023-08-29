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

    let s = event.target.value;
    if (s.includes(">")) {
      let fLayout;
      let currentTag;
      let isError = false;
      s.split(">").forEach((elem) => {
        if (elem) {
          if (!fLayout) {
            fLayout = handleFormLayout(elem);
            if(fLayout === 'error') {
              setResult(fLayout);
              isError = true;
              return;
            }
            currentTag = fLayout;
          } else {
            let temp = handleFormLayout(elem);
            if(temp === 'error') {
              setResult(temp);
              isError = true;
              return;
            }
            currentTag.append(temp);
            currentTag = temp;
          }
        }
      });
      if(!isError) {
        setResult(fLayout);
      }
    } else {
      const fullLayout = handleFormLayout(s);
      setResult(fullLayout);
    }
  };

  const handleFormLayout = (str) => {
    let curr = {};
    let currentProp = null;
    let req = /[A-Z]|[a-z]/;
    let req2 = /[A-Z]|[a-z]|[0-9]/;

    if (str.length) {
      for (let char of str) {
        if (char === ".") {
          currentProp = "class";
          if (!curr[currentProp]) {
            curr[currentProp] = [];
          }
          curr[currentProp].push("");
        } else if (char === "#") {
          currentProp = "id";
          curr[currentProp] = "";
        } else if (!currentProp && char.match(req)) {
          currentProp = "tag";
          curr[currentProp] = char;
        } else if (char.match(req2)) {
          if (currentProp === "class") {
            curr[currentProp][curr[currentProp].length - 1] += char;
          } else {
            curr[currentProp] += char;
          }
        } else {
          return "error";
        }
      }
      let layout = document.createElement(curr.tag || "div");
      if (curr.class?.length) {
        curr.class.forEach((c) => {
          if (c) {
            layout.classList.add(c);
          }
        });
      }
      if (curr.id) {
        layout.id = curr.id;
      }
      return layout;
    } else {
      return "";
    }
  };

  const handlClickTextArea = (event) => {
    const cursorPosition = event.target.selectionStart;
    const linesBeforeCursor = event.target.value
      .substr(0, cursorPosition)
      .split("\n");
    setFocusedRow(linesBeforeCursor.length);
  };

  const handleError = () => {
    document.querySelector(".output-section").textContent = "Incorrect input!";
    document.querySelector(".output-section").style.color = "red";
  };

  useEffect(() => {
    if (output && readOnly) {
      if (output === "error") {
        handleError();
      } else {
        document.querySelector(".output-section").style.color = "black";
        document.querySelector(".output-section").textContent =
          output.outerHTML;
      }
    } else {
      document.querySelector(".output-section").textContent = "";
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
