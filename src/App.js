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
]


function App() {
  
const [screenValue, setScreenValue] = useState("0")



  return (
    <Wrapper>
      <Screen value={screenValue}/>
      <ButtonBox>
        {
          btnValues.flat().map((value, i) => {
            return (
            <Button
              key={i}
              className={value === "=" ? "equals" : ""}
              value={value}
              onClick={() => {
                
                console.log(`${value} clicked`)
              }}
              

            />)
          })
        }

      </ButtonBox>
    </Wrapper>

  );
}

export default App;
