import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Coder.scss";
import CoderField from "../components/CoderField";

const Coder = () => {
  const fieldsRef = useRef(null);
  const [amountField, setAmountField] = useState(0);
  const arrayOfNumbers = useMemo(() => {
    if (amountField) {
      return new Array(amountField).fill(1).map((elem, index) => elem + index);
    } else {
      return null;
    }
  }, [amountField]);

  useEffect(() => {
    if (fieldsRef.current) {
      setAmountField(Math.floor(fieldsRef.current.offsetHeight / 30 - 1));
    }
  }, []);

  return (
    <div className="coder">
      <div className="coder-menu">
        <div><span>.class </span> - represents class of element</div>
        <div><span>{">"}</span> - level of investment</div>
        <div><span>^</span> - one level higher</div>
        <div><span>element</span>- represents name of HTML element</div>
        <div><span>#id</span> - represents element identifier</div>
      </div>
      <div className="coder-fields" ref={fieldsRef}>
        <CoderField
          amountField={amountField}
          arrayOfNumbers={arrayOfNumbers}
          style={{
            backgroundColor: "var(--coder-bg1)",
            color: "white",
            borderRight: "1px solid white",
          }}
        />
        <CoderField
          arrayOfNumbers={arrayOfNumbers}
          readOnly={true}
          style={{
            backgroundColor: "var(--coder-bg2)",
            color: "black",
            borderRight: "1px solid black",
          }}
        />
      </div>
    </div>
  );
};

export default Coder;
