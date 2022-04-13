import styled, { keyframes } from "styled-components";

export const FallingHearts = ({ number }) => {
  const heartSource = ["/heart1.png", "/heart2.png", "/heart3.png"];
  let rows = [];
  let spotWidth = window.innerWidth / number;
  for (let i = 0; i < number; i++) {
    rows.push(
      <Img
        x={Math.floor(Math.random() * 90)}
        y={Math.floor(Math.random() * 90)}
        i={Math.floor(Math.random() * 90)}
        j={Math.floor(Math.random() * 90)}
        style={{
          left: `${i * spotWidth}px`,
          animationDuration: `${Math.random() * 5 + 3}s`,
        }}
        src={
          process.env.PUBLIC_URL + heartSource[Math.floor(Math.random() * 3)]
        }
        key={"hearts" + i}
        alt="hearts"
      ></Img>
    );
  }
  return <Div>{rows}</Div>;
};

const fallingAnimation = (x, y, i, j) => keyframes`
 0% { top: ${x}vh;  left:${i}vw}
 
 100% { top: ${y}vh; left:${j}vw;opacity:0.3 }
`;
const Img = styled.img`
  width: 80px;
  position: absolute;
  top: 0;
  z-index: 1;
  background: transparent;
  animation: ${(props) => fallingAnimation(props.x, props.y, props.i, props.j)}
    linear infinite;
`;
const Div = styled.div`
  display: flex;
`;
