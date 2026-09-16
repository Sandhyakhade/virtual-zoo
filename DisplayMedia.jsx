import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { storage } from "../firebase";  // ✅ Correct import path
import { database } from "../firebase"; // ✅ Correct import path


const DisplayMedia = () => {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    const mediaRef = ref(database, "media");
    onValue(mediaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMediaList(Object.values(data));
      }
    });
  }, []);

  return (
    <div>
      <h2>Media Gallery</h2>
      {mediaList.map((media, index) => (
        <div key={index}>
          {media.type.startsWith("image") && <img src={media.url} alt="Uploaded" width="200" />}
          {media.type.startsWith("audio") && <audio controls src={media.url}></audio>}
          {media.type.startsWith("video") && <video controls width="300" src={media.url}></video>}
        </div>
      ))}
    </div>
  );
};

export default DisplayMedia;
