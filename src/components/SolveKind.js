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
  kind,
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
            style={{ textTransform: "capitalize" }}
            onClick={() =>
              history.push("summary", {
                label: label,
                optionA: shuffled[0],
                optionB: shuffled[1],
                optionC: shuffled[2],
                optionD: shuffled[3],
                rightAnswer: rightAnswer,
                chosenAnswer: a,
                kind: kind,
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

const SolveKind = () => {
  let history = useHistory();
  console.log("uuh ", history);

  const [question, setQuestion] = useState();
  const [empty, setEmpty] = useState(false);

  let initialKind = history.location.state ? history.location.state.kind : null;

  const [kind, setKind] = useState(initialKind || "Fiziologiq");

  const changeKind = (e) => {
    console.log(e.target.value);
    setKind(e.target.value);
  };

  useEffect(() => {
    const axios = require("axios");

    axios
      .get(
        `https://mysterious-garden-19556.herokuapp.com/https://www.questions-server.xyz/questions/kind/${kind}`
      )
      .then(function (response) {
        console.log(response);

        if (response.data.length > 0) {
          setEmpty(false);
          setQuestion(shuffle(response.data)[0]);
        } else {
          console.log("no items");
          setEmpty(true);
        }
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
  }, [kind]);

  return question ? (
    <div id="test-kind" className="solve-wrapper">
      <Link style={{ textDecoration: "none" }} to="/add-question">
        <Button variant="contained">Назад</Button>
      </Link>

      <label>Група</label>
      <select className="select-css" onChange={changeKind} value={kind}>
        <option value="Fiziologiq">Обща физиология</option>
        <option value="Kruv">Кръв</option>
        <option value="Muskuli">Мускули</option>
        <option value="Surdechno-sudova">Сердечно-съдова система</option>
        <option value="Dihatelna">Дихателна система</option>
        <option value="Hranosmilatelna">Храносмилателна система</option>
        <option value="Obmqna-na-veshtestvata">Обмяна на веществата</option>
        <option value="Obmqna-na-energiqta">Обмяна на енергията</option>
        <option value="Otdelitelna">Отделителна система</option>
        <option value="Endokrinna">Ендокринна система</option>
        <option value="Muzhka-i-zhenska">
          Мъжка и женска репродуктивна система
        </option>
        <option value="Nervna">Нервна система</option>
        <option value="Setivni-sistemi">Сетивни системи</option>
        <option value="Regulaciq">Регулация на движенията</option>
        <option value="Sun">Сън и бодърстване</option>
        <option value="Vegetativna">Вегетативна нервна система</option>
      </select>

      {!empty ? <Question
        label={question["label"]}
        optionA={question["option_one"]}
        optionB={question["option_two"]}
        optionC={question["option_three"]}
        optionD={question["option_four"]}
        rightAnswer={question["correct_answer"]}
        kind={question["kind"]}
      /> : <span className="no-items">Няма резултат...</span>}
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

export default SolveKind;
