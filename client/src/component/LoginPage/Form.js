import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { UsersContext } from "../UsersContext";
import { useContext } from "react";
export const Form = ({ email, src, user }) => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { allUsers, setAllUsers } = useContext(UsersContext);
  const [inputs, setInputs] = useState(
    user || {
      name: { first: "", last: "" },
      email: email,
      gender: "",
      location: { city: "", state: "", country: "" },
      dob: { date: "", age: "" },
      picture: { large: src, medium: src, thumbnail: src },
    }
  );
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

        sessionStorage.setItem("currentUser", JSON.stringify({ ...data.data }));
        setCurrentUser({ ...data.data });
        setAllUsers([...allUsers, inputs]);
        return fetch("/api/add-user-online", {
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
            history.push("/home");
          })
          .catch((err) => console.log(err.message));
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
    } else if (name === "date") {
      setInputs({ ...inputs, dob: { date: value, age: inputs.dob.age } });
    } else if (name === "age") {
      setInputs({
        ...inputs,
        dob: { age: Number(value), date: inputs.dob.date },
      });
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
        value={inputs.dob.date || ""}
        name="date"
        type="date"
        placeholder="Your birthday:mm/dd/yyyy"
        onChange={handleOnChange}
      />
      <input
        value={inputs.dob.age || ""}
        name="age"
        type="number"
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
          inputs.dob.date &&
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
  width: 16rem;
  height: 250px;
  background: var(--accent-bg-color);
  border: 1px var(--secondry-color) solid;
  border-radius: 4px;
  box-shadow: 5px 5px 5px;
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
    width: 15rem;
    height: 30px;
    margin: 3px 0;
    border-radius: 2px;
    border: none;
  }
`;
