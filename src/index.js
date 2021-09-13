import React from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { Input as AntdInput } from "antd";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const axios = require("axios");

const App = () => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));

    let label = data["label"];
    let correctAnswer = data["correctAnswer"];
    let optionOne = data["optionOne"];
    let optionTwo = data["optionTwo"];
    let optionThree = data["optionThree"];

    if (
      label === undefined ||
      optionOne === undefined ||
      optionTwo === undefined ||
      optionThree === undefined ||
      correctAnswer === undefined
    ) {
      toast.error("Моля попълнете всички полета", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        closeButton: false,
      });

      return;
    }

    // const myApi = axios.create({
    //   baseURL: 'http://someUrl/someEndpoint',
    //   timeout: 10000,
    //   withCredentials: true,
    //   transformRequest: [(data) => JSON.stringify(data.data)],
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // });'

    axios
      .post("https://cors-anywhere.herokuapp.com/http://206.189.13.74:8000/questions", {
        label,
        option_one: correctAnswer,
        option_two: optionOne,
        option_three: optionTwo,
        option_four: optionThree,
        correct_answer: correctAnswer,
      })
      .then(function (response) {
        console.log(response);
        reset();

        toast.success("Готово", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          closeButton: false,
        });
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Въпрос</label>
      <Controller
        render={({ field }) => <AntdInput {...field} />}
        name="label"
        autocomplete="off"
        control={control}
      />
      <label>Верен отговор</label>
      <Controller
        render={({ field }) => <AntdInput {...field} />}
        name="correctAnswer"
        control={control}
        autocomplete="off"
        defaultValue=""
      />
      <label>Опция 1</label>
      <Controller
        render={({ field }) => <AntdInput {...field} />}
        name="optionOne"
        control={control}
        autocomplete="off"
        defaultValue=""
      />
      <label>Опция 2</label>
      <Controller
        render={({ field }) => <AntdInput {...field} />}
        name="optionTwo"
        control={control}
        autocomplete="off"
        defaultValue=""
      />
      <label>Опция 3</label>
      <Controller
        render={({ field }) => <AntdInput {...field} />}
        name="optionThree"
        control={control}
        autocomplete="off"
        placeholder="Отговор 3"
        defaultValue=""
      />

      <input type="submit" value="Запази" />
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
    </form>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
