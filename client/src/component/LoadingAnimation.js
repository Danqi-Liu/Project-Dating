import { VscLoading } from "react-icons/vsc";
import { IconContext } from "react-icons";
import { loading } from "react-icons-kit/ikons/loading";
import { Icon } from "react-icons-kit";
import styled, { keyframes } from "styled-components";
export const LoadingAnimation = ({ size }) => {
  return (
    <Wrapper>
      <MyIcon size={size} icon={loading} />
    </Wrapper>
  );
};
const rotate = keyframes`
from{
transform:rotate(0);}
to{
transform:rotate(360deg);
}
`;

const Wrapper = styled.div`
  /* height: 20vh; */
  display: flex;
  justify-content: center;
  align-items: center; ;
`;
const MyIcon = styled(Icon)`
  animation: ${rotate} 2s infinite linear;
  color: var(--hover-color);
`;
