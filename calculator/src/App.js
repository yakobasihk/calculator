import styles from "./index.module.scss";
import { useState } from "react";

const values = [
  "/",
  "7",
  "8",
  "9",
  "*",
  "6",
  "5",
  "4",
  "-",
  "3",
  "2",
  "1",
  "+",
];

const operations = ["/", "*", "-", "+"];

function App() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const clear = () => {
    if (input.length === 0) return;
    setInput("");
    setHistory([...history, "C"]);
  };

  const passValue = (val) => {
    if (input.length === 0 && operations.includes(val)) return;
    const addSpaces = val !== "." && isNaN(Number(val));
    setInput(`${input}${addSpaces ? " " : ""}${val}${addSpaces ? " " : ""}`);
  };

  const switchSign = () => {
    const elements = input.split(" ");
    if (elements.length > 0 && elements[0] !== "") {
      let transformed = elements[elements.length - 1];
      if (transformed[0] === "-") transformed = transformed.substring(1);
      else transformed = "-" + transformed;
      elements[elements.length - 1] = transformed;

      setInput(elements.join(" "));
    }
  };

  const calculate = (percentage = false) => {
    try {
      const res = percentage ? eval(`(${input})/100`) : eval(input);
      setHistory([...history, percentage ? `(${input})/100` : input]);
      setInput(res);
    } catch {
      console.log("Not a valid statement");
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.calculator}>
        <div
          className={styles.answer}
          style={{
            height: showHistory ? "100%" : "",
            borderRadius: showHistory ? "6px" : "",
          }}
        >
          <div className={styles.input}>{input}</div>
          {history.length > 0 && !showHistory && (
            <div className={styles.history}>{history[history.length - 1]}</div>
          )}
          {showHistory &&
            history.map((item) => <div className={styles.history}>{item}</div>)}
          <button
            className={styles.showHistory}
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </div>
        <div
          className={styles.controls}
          style={{ height: showHistory ? "0%" : "" }}
        >
          <button onClick={() => clear()} style={{ width: "50%" }}>
            C
          </button>
          <button onClick={() => calculate(true)}>%</button>
          {values.map((v) => (
            <button onClick={() => passValue(v)}>{v}</button>
          ))}
          <button onClick={() => switchSign()}>+/-</button>
          <button onClick={() => passValue("0")}>0</button>
          <button onClick={() => passValue(".")}>.</button>
          <button onClick={() => calculate()}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
