import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Question = ({
  label,
  optionA,
  optionB,
  optionC,
  optionD,
  rightAnswer,
}) => {
  let history = useHistory();

  let answers = [optionA, optionB, optionC, optionD];
  answers = answers.map((a) => {
    return a.endsWith(";") ? a.substring(0, a.length - 1) : a;
  });

  let shuffled = shuffle(answers);

  return (
    <div className="question">
      <span className="label">{label}</span>
      {shuffled.map((a) => {
        return (
          <Button
            style={{textTransform: "capitalize" }}
            onClick={() =>
              history.push("summary", {
                label: label,
                optionA: shuffled[0],
                optionB: shuffled[1],
                optionC: shuffled[2],
                optionD: shuffled[3],
                rightAnswer: rightAnswer,
                chosenAnswer: a,
              })
            }
            className={`answer-btn`}
            key={a}
            variant="contained"
          >
            {a}
          </Button>
        );
      })}
    </div>
  );
};

const Solve = () => {
  const [question, setQuestion] = useState();

  useEffect(() => {
    const axios = require("axios");

    axios
      .get(
        "https://mysterious-garden-19556.herokuapp.com/https://www.questions-server.xyz/questions/random"
      )
      .then(function (response) {
        console.log(response);
        console.log(response.data.id);

        setQuestion(response.data);
      })
      .catch(function (error) {
        console.log(error);

        toast.error("Възникна грешка", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          closeButton: false,
        });
      });
  }, []);

  return question ? (
    <div id="test-all" className="solve-wrapper">
      <Link style={{ textDecoration: "none" }} to="/add-question">
        <Button variant="contained">Назад</Button>
      </Link>
      <Question
        label={question["label"]}
        optionA={question["option_one"]}
        optionB={question["option_two"]}
        optionC={question["option_three"]}
        optionD={question["option_four"]}
        rightAnswer={question["correct_answer"]}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  ) : (
    <CircularProgress className="spinner" size={100} color={"success"} />
  );
};

export default Solve;
