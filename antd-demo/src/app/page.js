// pages/index.js
"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "antd";
import ImageContainer from "./components/ImageContainer";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch the photos from the backend (mocked here)
    setPhotos([
      {
        id: 1,
        url: "images/logo-black.png",
        title: "Photo 1",
        description: "Description 1",
        comments: [{ author: "User 1", content: "Great photo!" }],
      },
      {
        id: 2,
        url: "images/logo-black.png",
        title: "Photo 2",
        description: "Description 2",
        comments: [],
      },
      {
        id: 3,
        url: "images/logo-black.png",
        title: "Photo 3",
        description: "Description 3",
        comments: [{ author: "User 2", content: "Nice shot!" }],
      },
    ]);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" style={{ width: "100%", marginBottom: "20px" }}>
        <Image src="images/logo-black.png" width={200} />
      </Row>
      <Row gutter={[16, 16]}>
        {photos.map((photo) => (
          <Col key={photo.id} span={8}>
            <ImageContainer photo={photo} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
