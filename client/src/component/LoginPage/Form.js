import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const Form = ({ email, src }) => {
  const [inputs, setInputs] = useState({
    name: { first: "", last: "" },
    email: email,
    gender: "",
    location: { city: "", state: "", country: "" },
    dob: { data: "", age: "" },
    picture: { large: src, medium: src, thumbnail: src },
  });
  const [disabledButton, setDisabledButton] = useState(false);
  let history = useHistory();
  const handleSubmit = (ev) => {
    console.log(inputs);
    ev.preventDefault();
    setDisabledButton(true);
    fetch("/api/add-user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        ...inputs,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        sessionStorage.setItem("user", JSON.stringify(data.data));
        history.push("/home");
      })
      .catch((err) => console.log(err.message));
  };

  const handleOnChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    if (name === "first") {
      setInputs({ ...inputs, name: { first: value, last: inputs.name.last } });
    } else if (name === "last") {
      setInputs({ ...inputs, name: { last: value, first: inputs.name.first } });
    } else if (name === "country") {
      setInputs({
        ...inputs,
        location: {
          country: value,
          city: inputs.location.city,
          state: inputs.location.state,
        },
      });
    } else if (name === "state") {
      setInputs({
        ...inputs,
        location: {
          state: value,
          city: inputs.location.city,
          country: inputs.location.country,
        },
      });
    } else if (name === "city") {
      setInputs({
        ...inputs,
        location: {
          city: value,
          country: inputs.location.country,
          state: inputs.location.state,
        },
      });
    } else if (name === "data") {
      setInputs({ ...inputs, dob: { data: value, age: inputs.dob.age } });
    } else if (name === "age") {
      setInputs({ ...inputs, dob: { age: value, data: inputs.dob.data } });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };
  return (
    <MyForm onSubmit={handleSubmit}>
      <input
        value={inputs.name.first || ""}
        name="first"
        type="text"
        placeholder="Your first name"
        onChange={handleOnChange}
      />
      <input
        value={inputs.name.last || ""}
        name="last"
        type="text"
        placeholder="Your last name"
        onChange={handleOnChange}
      />
      <input
        value={inputs.dob.data || ""}
        name="data"
        type="text"
        placeholder="Your birthday:yyyy-mm-dd"
        onChange={handleOnChange}
      />
      <input
        value={inputs.dob.age || ""}
        name="age"
        type="text"
        placeholder="Your age"
        onChange={handleOnChange}
      />
      <input
        value={inputs.gender || ""}
        name="gender"
        type="text"
        placeholder="male/female"
        onChange={handleOnChange}
      />
      <input
        value={inputs.location.country || ""}
        name="country"
        type="text"
        placeholder="Country"
        onChange={handleOnChange}
      />
      <input
        value={inputs.location.state || ""}
        name="state"
        type="text"
        placeholder="State"
        onChange={handleOnChange}
      />
      <input
        value={inputs.location.city || ""}
        name="city"
        type="text"
        placeholder="City"
        onChange={handleOnChange}
      />
      <button
        type="submit"
        disabled={
          !disabledButton &&
          inputs.name.first &&
          inputs.name.last &&
          inputs.location.country &&
          inputs.location.state &&
          inputs.location.city &&
          inputs.dob.data &&
          inputs.dob.age
            ? false
            : true
        }
      >
        Submit
      </button>
    </MyForm>
  );
};
const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 250px;
  margin-right: 200px;
  background-color: var(--color-orange);
  border: 2px var(--color-cadmium-red) solid;
  button {
    width: 210px;
    height: 50px;
    color: black;
    font-weight: 800;
    background: var(--color-alabama-crimson);
    border: none;
    &:disabled {
      filter: opacity(50%);
    }
    &:active {
      color: blue;
    }
  }
  input {
    width: 200px;
    height: 30px;
    margin-bottom: 5px;
  }
`;
