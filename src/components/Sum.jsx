import React from "react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useRef } from "react";

const Sum = (props) => {
  const num1 = useRef(0);
  const num2 = useRef(0);
  const [sum, setSum] = useState(0);

  const divRef = useRef(null);

  // submitHandler
  const handleSubmit = (event) => {
    event.preventDefault();

    setSum(num1.current + num2.current);

    console.log(divRef)
  }

  console.log(123)


  // useState -> store value
  // useRef -> store element/DOM node hoặc value - không re-render
  // use - React hook

  return (
    <>
      {/* input, select/options, textarea,... luôn luôn bọc trong form + 1 button submit */}
      <p>{num1.current + num2.current}</p>
      <form onSubmit={handleSubmit}>
        <Input onChange={(event) => num1.current = +event.target.value} />
        <br></br>
        <Input onChange={(event) => num2.current = +event.target.value} />
        <div data-value="1" ref={divRef} onClick={() => divRef.current = 5}>Test</div>
        <Button type='submit'>Sum</Button>
        <Button type='reset' onClick={() => {
          setSum(0);
        }}>Reset</Button>
      </form>
    </>
  );
};

export default Sum;
