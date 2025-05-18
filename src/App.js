import {
  useState,
  useRef,
  useEffect
} from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];


const removeSpaces = (currentNum) => currentNum.toString().replace(/\s/g, "");


function App() {

const [calc, setCalc] = useState({
  operator: "",
  currentNum: "",
  result: 0,
});

const getClickHandler = (btn) => {
  if (btn === "C") return resetClickHandler;
  if (btn === "+-") return invertClickHandler;
  if (btn === "%") return percentClickHandler;
  if (btn === "=") return equalsClickHandler;
  if (["/", "X", "-", "+"].includes(btn)) return signClickHandler;
  if (btn === ".") return commaClickHandler;
  return numClickHandler;
};

const resetClickHandler = () => {
  setCalc({
    operator: "",
    currentNum: "0",
    result: 0,
  });
};

const invertClickHandler = () => {
  setCalc((prev) => ({
    ...prev,
    currentNum: parseFloat(prev.currentNum) * -1,
  }));
};


const percentClickHandler = () => {
  setCalc((prev) => ({
    ...prev,
    currentNum: parseFloat(prev.currentNum) /100,
  }));
};

const equalsClickHandler = () => {
  setCalc((prev) => {
    const { operator, result, currentNum } = prev;

    const parsedCurrent = parseFloat(removeSpaces(currentNum));
    const parsedResult = parseFloat(removeSpaces(result));

    let computation = result;

    switch (operator) {
      case "+":
        computation = parsedResult + parsedCurrent;
        break;
      case "-":
        computation = parsedResult - parsedCurrent;
        break;
      case "X":
        computation = parsedResult * parsedCurrent;
        break;
      case "/":
        computation = parsedCurrent === 0 ? "Error" : parsedResult / parsedCurrent;
        break;
      default:
        return prev;
    }

    return {
      operator: "",
      currentNum: "",
      result: computation,
    };
  });
};

const signClickHandler = (nextOperator) => {
  setCalc((prev) => {
    const { operator, currentNum, result } = prev;
    const current = parseFloat(removeSpaces(currentNum));
    const res = parseFloat(removeSpaces(result));

    let newResult = res;

    if (operator && currentNum !== "") {
      switch (operator) {
        case "+":
          newResult = res + current;
          break;
        case "-":
          newResult = res - current;
          break;
        case "X":
          newResult = res * current;
          break;
        case "/":
          newResult = current === 0 ? "Error" : res / current;
          break;
        default:
          newResult = current;
      }
    } else if (currentNum !== "") {
      newResult = current;
    }

    return {
      operator: nextOperator,
      result: newResult,
      currentNum: "",
    };
  });
};

const commaClickHandler = () => {
  setCalc(prev => {
    const currentStr = String(prev.currentNum);

    if (currentStr.includes(".")) return prev;

    return {
      ...prev,
      currentNum: prev.currentNum + ".",
    };
  });
};

const numClickHandler = (value) => {

  setCalc((prev) => {


    const newNum = prev.currentNum === "0" && value !=="." 
      ? String(value) 
      : prev.currentNum + String(value);


    return {
      ...prev,
      currentNum: newNum,
    };
  });
};


  return (
    <Wrapper>
      <Screen value={calc.currentNum !== "" ? calc.currentNum : calc.result}/>
      <ButtonBox>
        {
          btnValues.flat().map((value, i) => {
            return (
            <Button
              key={i}
              className={value === "=" ? "equals" : ""}
              value={value}
              onClick={() => {
                console.log(value);
                const handler = getClickHandler(value);
                handler(value);
              }}
            />);
          })
        }

      </ButtonBox>
    </Wrapper>

  );
}

export default App;
