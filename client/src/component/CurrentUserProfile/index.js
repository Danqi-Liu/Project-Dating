import { Form } from "../LoginPage/Form";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
export const CurrentUserProfile = () => {
  const { currentUser } = useContext(CurrentUserContext);
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
  const handleSubmit = () => {};
  return (
    <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image_uploads">
          Choose images to upload (PNG, JPG)
        </label>
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
