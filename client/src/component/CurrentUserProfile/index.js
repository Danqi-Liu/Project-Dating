import { UpdateUserForm } from "../UserProfile/UpdateUserForm";
import { Header } from "../HomePage/Header";
import { Sidebar } from "../HomePage/SideBar";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import { checkSessionStorage } from "../CheckSessionStorage";
import { UsersContext } from "../UsersContext";
import { LoadingAnimation } from "../LoadingAnimation";
export const CurrentUserProfile = () => {
  const { allUsers, setAllUsers } = useContext(UsersContext);
  const [uploadingImg, setUploadingImg] = useState(false);
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
    setUploadingImg(true);
    const picture = {
      picture: { large: src, medium: src, thumbnail: src },
    };
    setCurrentUser({ ...currentUser, ...picture });
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({ ...currentUser, ...picture })
    );
    fetch("/api/update-user", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        ...currentUser,
        ...picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        sessionStorage.setItem("currentUser", JSON.stringify(data.data));
        setCurrentUser({ ...data.data });
        setAllUsers([...allUsers, { ...data.data }]);
        setUploadingImg(false);
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
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
          <p>
            {currentUser.name.first} {currentUser.name.last}
          </p>
          <UploadImgContainer>
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
                {uploadingImg ? (
                  <LoadingAnimation size={32} />
                ) : (
                  <span>Upload</span>
                )}
              </button>
            </div>
          </UploadImgContainer>
        </ImageForm>
        <UpdateUserForm user={checkSessionStorage("currentUser", {})} />
      </SubContainer>
    </>
  );
};
const ImageForm = styled.form`
  p {
    padding-top: 7rem;
    font-style: oblique;
  }

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
export const SubContainer = styled.div`
  position: relative;
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
  float: left;
`;
const UploadImgContainer = styled.div`
  position: absolute;
  border: 1px var(--secondry-color) solid;
  border-radius: 4px;
  box-shadow: 5px 5px 5px;
  margin-left: 40vw;
  width: 35vw;
  height: 28rem;
  top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
