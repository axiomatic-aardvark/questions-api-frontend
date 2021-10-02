import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import "react-toastify/dist/ReactToastify.css";

const Question = ({
  label,
  optionA,
  optionB,
  optionC,
  optionD,
  rightAnswer,
  chosenAnswer,
}) => {
  // return a.endsWith(";") ? a.substring(0, a.length - 1) : a;
  rightAnswer = rightAnswer.endsWith(";")
    ? rightAnswer.substring(0, rightAnswer.length - 1)
    : rightAnswer;

  return (
    <div className="question">
      <span className="label">{label}</span>

      <Button
        style={
          optionA === rightAnswer
            ? { textTransform: "capitalize", backgroundColor: "green" }
            : optionA === chosenAnswer
            ? { textTransform: "capitalize", backgroundColor: "red" }
            : { textTransform: "capitalize" }
        }
        className={`answer-btn`}
        key={optionA}
        variant="contained"
      >
        {optionA}
      </Button>

      <Button
        style={
          optionB === rightAnswer
            ? { textTransform: "capitalize", backgroundColor: "green" }
            : optionB === chosenAnswer
            ? { textTransform: "capitalize", backgroundColor: "red" }
            : { textTransform: "capitalize" }
        }
        className={`answer-btn`}
        key={optionB}
        variant="contained"
      >
        {optionB}
      </Button>

      <Button
        style={
          optionC === rightAnswer
            ? { textTransform: "capitalize", backgroundColor: "green" }
            : optionC === chosenAnswer
            ? { textTransform: "capitalize", backgroundColor: "red" }
            : { textTransform: "capitalize" }
        }
        className={`answer-btn`}
        key={optionC}
        variant="contained"
      >
        {optionC}
      </Button>

      <Button
        style={
          optionD === rightAnswer
            ? { textTransform: "capitalize", backgroundColor: "green" }
            : optionD === chosenAnswer
            ? { textTransform: "capitalize", backgroundColor: "red" }
            : { textTransform: "capitalize" }
        }
        className={`answer-btn`}
        key={optionD}
        variant="contained"
      >
        {optionD}
      </Button>
    </div>
  );
};

const Summary = () => {
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      console.log("swipe!");
      
      history.push("test-kind", {
        kind: kind,
      })
    }
  });

  let history = useHistory();
  console.log(history.location);
  let {
    label,
    optionA,
    optionB,
    optionC,
    optionD,
    rightAnswer,
    chosenAnswer,
    kind,
  } = history.location.state;

  return (
    <div {...handlers} className="summary-wrapper">
      <Button
        onClick={() =>
          history.push("test-kind", {
            kind: kind,
          })
        }
        variant="contained"
      >
        Нов въпрос
      </Button>

      <Question
        label={label}
        optionA={optionA}
        optionB={optionB}
        optionC={optionC}
        optionD={optionD}
        rightAnswer={rightAnswer}
        chosenAnswer={chosenAnswer}
      />
    </div>
  );
};

export default Summary;
