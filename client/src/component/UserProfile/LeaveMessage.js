import { useState } from "react";
import styled from "styled-components";
export const LeaveMessage = ({ senderEmail, recieverEmail }) => {
  const [inputs, setInputs] = useState({
    senderEmail: senderEmail,
    message: "",
    recieverEmail: recieverEmail,
  });
  const [buttonStatus, setButtonStatus] = useState("idle");
  const handleOnChange = (ev) => {
    const value = ev.target.value;
    setInputs({ ...inputs, message: value });
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    setButtonStatus("loading");
    fetch("/api/leave-message", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ ...inputs }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setInputs({ ...inputs, message: "" });
        setButtonStatus("idle");
      })
      .catch((err) => {
        console.log(err.message);
        setButtonStatus("idle");
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <input
        name="message"
        type="text"
        value={inputs.message}
        placeholder="Leave exciting message to your favorite friend"
        onChange={handleOnChange}
      />
      <button
        disabled={buttonStatus === "idle" && inputs.message ? false : true}
        type="submit"
      >
        Send
      </button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 4rem;

  input {
    height: 1.8rem;
    width: calc(73vw - 4rem);
    background: lightgray;
    border-radius: 8px;
    &:focus {
      box-shadow: 0 0 5px;
    }
  }
  button {
    width: 30vw;
    height: 1.8rem;
    background: transparent;
    font-weight: 700;
    &:hover {
      cursor: pointer;
      color: var(--hover-color);
      box-shadow: 0 0 5px;
      transform: scale(1.05);
    }
    &:disabled {
      opacity: 60%;
    }
  }
`;
