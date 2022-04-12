import styled from "styled-components";
import { useContext, useState } from "react";
import { UsersContext } from "../UsersContext";
import { useHistory } from "react-router-dom";
export const SearchForm = ({ setSearchFormOpened }) => {
  const history = useHistory();
  const { setUsers, setRenderUsers, setCount, setStatus } =
    useContext(UsersContext);
  const startAge = [18, 20, 25, 30, 35, 40, 45, 50, 60, 70];
  const endAge = [20, 25, 30, 35, 40, 45, 50, 60, 70, 80];
  const [inputs, setInputs] = useState({
    gender: "female",
    startAge: 18,
    endAge: 20,
    location: "",
  });
  const handleOnChange = (ev) => {
    const name = ev.target.name;
    const value = ev.target.value;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSearchFormOpened(false);
    history.push("/home");
    setStatus("loading");

    const searchString = `gender=${inputs.gender}&startAge=${inputs.startAge}&endAge=${inputs.endAge}&location=${inputs.location}`;
    fetch(`/api/search-gender-age-location?${searchString}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data.data);
          let user20Arr = data.data.filter((el, index) => index <= 19);
          console.log(user20Arr);
          setRenderUsers([...user20Arr]);
          setUsers([...data.data]);
          setCount(1);
          setStatus("idle");
        } else {
          setRenderUsers([]);
          setCount(0);
          setStatus("idle");
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <MyForm onSubmit={handleSubmit}>
      <select
        id="selectContent"
        className="PullDown"
        name="gender"
        onChange={handleOnChange}
      >
        <option value="female">Looking for a Woman</option>
        <option value="male">Looking for a Man</option>
        <option value="">Looking for a Woman or Man</option>
      </select>
      <span>Ages</span>
      <select
        id="selectStartAge"
        className="PullDown"
        name="startAge"
        onChange={handleOnChange}
      >
        {startAge.map((el) => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>
      <span>-</span>
      <select
        id="selectEndAge"
        className="PullDown"
        name="endAge"
        onChange={handleOnChange}
      >
        {endAge.map((el) => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>
      <input
        value={inputs.location || ""}
        name="location"
        type="text"
        placeholder="Enter city or country"
        onChange={handleOnChange}
      />

      <button type="submit">SHOW MATCHES</button>
    </MyForm>
  );
};
const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 18vw;
  height: 250px;
  background-color: var(--secondry-bg-color);
  border: 2px var(--primary-color) solid;
  button {
    width: 8rem;
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
    &:hover {
      color: var(--secondry-color);
      cursor: pointer;
    }
  }
  input {
    width: 7rem;
    height: 30px;
    margin-top: 5px;
  }
  select {
    width: 7rem;
  }
`;
