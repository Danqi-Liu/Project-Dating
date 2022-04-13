import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UsersContext } from "../UsersContext";
export const SlideShow = () => {
  const { allUsers } = useContext(UsersContext);
  const [randomUsers, setRandomUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    if (allUsers.length === 0) {
      setStatus("loading");
      fetch("/api/get-random-users")
        .then((res) => res.json())
        .then((data) => {
          setRandomUsers([...data.data]);
          setStatus("idle");
        })
        .catch((err) => console.log(err.message));
    } else {
      let arr = [];
      for (let i = 0; i < 50; i++) {
        let randomNumber = Math.floor(Math.random() * 1001);
        arr.push(allUsers[randomNumber]);
      }
      setRandomUsers([...arr]);
      setStatus("idle");
    }
  }, []);

  const properties = {
    duration: 8000,
    slidesToShow: 10,
    slidesToScroll: 4,
    autoplay: true,
    indicators: true,
    pauseOnHover: true,
    canSwipe: true,
  };

  if (status === "loading") {
    return <h1>loading</h1>;
  }
  return (
    <Wrapper>
      <div>
        <Slide {...properties}>
          {randomUsers.map((user) => {
            return (
              <MyLink key={user._id} to={`/users/${user.email}`}>
                <img key={user._id} alt="image" src={user.picture.thumbnail} />
              </MyLink>
            );
          })}
        </Slide>
      </div>
    </Wrapper>
  );
};

const MyLink = styled(Link)`
  padding: 0 0 0 30px;
  background: transparent;
  img {
    width: 3rem;
    border-radius: 40%;
    z-index: 1;

    &:hover {
      transform: scale(0.9);
      box-shadow: 0 0 10px;
    }
  }
`;
const Wrapper = styled.div`
  width: 95vw;
  padding-left: 10px;
  align-items: center;
`;
