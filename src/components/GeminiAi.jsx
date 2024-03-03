import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./GeminiAi.css";

function AI() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [text, setText] = useState("");
  let [budget, setbudget] = useState("");
  let [travellers, settravellers] = useState("");
  let [time, settime] = useState("");
  let [preference, setpreference] = useState("");
  let prompt1 = (e) => {
    setpreference(e.target.value);
  };
  let bud = (e) => {
    setbudget(e.target.value);
  };
  let trv = (e) => {
    settravellers(e.target.value);
  };
  let tim = (e) => {
    settime(e.target.value);
  };
  useEffect(() => {
    async function run() {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt =
        "suggest a destination for vacation based on reference = " +
        preference +
        " budget = " +
        budget +
        " no of travellers = " +
        travellers +
        "which month =" +
        time;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text1 = response.text().replace(/\*/g, "\n");
      setText(text1);
    }

    run();
  }, [preference, budget, time, travellers]);

  return (
    <div className="outerdiv">
      <div className="heading">
        <h1>Destify</h1>
      </div>
      <div className="top">
        <h1>Don't know where to go for this vacation? We got you covered.</h1>
      </div>
      <div className="top">
        <h1>Explore personalized travel destinations effortlessly</h1>
      </div>
      <div className="innerdiv">
        <input
          type="text"
          placeholder="Beach , snow , etc"
          value={preference}
          onChange={prompt1}
        />
        <input
          type="text"
          placeholder="Enter budget"
          value={budget}
          onChange={bud}
        />
      </div>
      <div className="innerdiv">
        <input
          type="text"
          placeholder="Enter no of travellers"
          value={travellers}
          onChange={trv}
        />
        <input
          type="text"
          placeholder="Enter time of year"
          value={time}
          onChange={tim}
        />
      </div>
      <div className="outdiv">
        <h2 className="output">{text}</h2>
      </div>
    </div>
  );
}

export default AI;
