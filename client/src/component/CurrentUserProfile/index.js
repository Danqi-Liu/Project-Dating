import { Form } from "../LoginPage/Form";
import { Header } from "../HomePage/Header";
import { Sidebar } from "../HomePage/SideBar";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
export const CurrentUserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [src, setSrc] = useState("");
  const handleUploadImg = () => {
    const filesSelected = document.getElementById("image_uploads").files;
    if (filesSelected.length > 0) {
      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result;
        setSrc(srcData);
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const picture = {
      picture: { large: src, medium: src, thumbnail: src },
    };
    setCurrentUser({ ...currentUser, ...picture });
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({ ...currentUser, ...picture })
    );
  };
  return (
    <>
      <Header />
      <Sidebar />
      <SubContainer>
        <ImageForm
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <UserImg alt="user image" src={currentUser.picture.medium} />
          <div>
            <label htmlFor="image_uploads">Upload an image (PNG, JPG)</label>
            <input
              onChange={handleUploadImg}
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png"
              multiple
            />
          </div>
          <div className="preview">
            {src ? (
              <img alt="preview" src={src} />
            ) : (
              <p>No files currently selected for upload</p>
            )}
          </div>
          <div>
            <button type="submit" disabled={src ? false : true}>
              Submit
            </button>
          </div>
        </ImageForm>
        <Form email={currentUser.email} src={src} user={currentUser} />
      </SubContainer>
    </>
  );
};
const ImageForm = styled.form`
  img {
    width: 8rem;
    margin: 20px 0;
  }
  button {
    width: 8rem;
    font-size: 1.5rem;
    border-radius: 4px;
    &:hover {
      color: var(--hover-color);
      cursor: pointer;
      box-shadow: 0 0 5px;
    }
    &:disabled {
      opacity: 60%;
    }
  }
  input {
    display: none;
  }
  label {
    background: var(--secondry-bg-color);
    box-shadow: 0 0 5px;
    border-radius: 4px;
    &:hover {
      transform: scale(1.05);
      color: var(--hover-color);
    }
  }
`;
const SubContainer = styled.div`
  margin-left: 20vw;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const UserImg = styled.img`
  width: 8rem;
  border-radius: 40%;
  box-shadow: 0 0 10px;
`;
