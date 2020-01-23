import React, { useState } from "react";
import "./App.css";
import { toJpeg } from "html-to-image";
import * as download from "downloadjs";
import Draggable from "react-draggable";

const App = () => {
  const [text, setText] = useState("Add text here");
  const [imageURL, setImageURL] = useState("");
  const [imageURL1, setImageURL1] = useState("");

  const downloadHandler = () => {
    toJpeg(document.getElementById("my-node")).then(function(dataUrl) {
      download(dataUrl, "my-node.png");
    });
  };

  const upload = e => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const upload1 = e => {
    setImageURL1(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div style={{ position: "relative" }} id="my-node" className="App">
        <Draggable bounds="parent" axis="both">
          <span
            style={{
              position: "absolute",
              zIndex: 2,
              cursor: "all-scroll"
            }}
          >
            {text}
          </span>
        </Draggable>
        {imageURL && (
          <img
            alt=""
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              zIndex: 1
            }}
            src={imageURL}
          />
        )}

        <Draggable
          bounds={{ left: 0, top: 0, right: 600, bottom: 200 }}
          axis="both"
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              display: "inline-block",
              zIndex: 2
            }}
          >
            <img
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100px",
                height: "100px"
              }}
              src={imageURL1}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "transparent",
                width: "100px",
                height: "100px"
              }}
            ></div>
          </div>
        </Draggable>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>text: </label>
        <input onChange={e => setText(e.target.value)} type="text" />
      </div>
      <div>
        <label>Background Image: </label>
        <input onChange={upload} type="file" />
      </div>
      <div>
        <label>Draggable Image: </label>
        <input onChange={upload1} type="file" />
      </div>
      <button onClick={downloadHandler}>Download</button>
    </>
  );
};

export default App;
