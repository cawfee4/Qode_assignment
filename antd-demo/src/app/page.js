"use client";

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Upload,
  Button,
  message,
  Input,
  Form,
  Skeleton,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImageContainer from "./components/ImageContainer";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("http://localhost:5000/allposts");
        const data = await response.json();
        setPhotos(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchPhotos();
  }, []);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    try {
      setIsUploading(true);
      setTitle("");
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json().then((data) => {
        const newPhoto = {
          id: data.imagePost.id,
          imageUrl: data.imagePost.imageUrl,
          title: data.imagePost.title,
          comments: [],
        };
        setPhotos([...photos, newPhoto]);
      });
      message.success(`${file.name} uploaded successfully.`);
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }

    return false;
  };

  const customRequest = ({ file }) => {
    handleUpload(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" style={{ width: "100%", marginBottom: "20px" }}>
        <img src="/images/logo-black.png" alt="Logo" width={200} />
      </Row>
      <Row gutter={[16, 16]}>
        {loading
          ? // Show skeleton loading while fetching data
            Array.from({ length: 6 }).map((_, index) => (
              <Col key={index} span={8}>
                <Skeleton active />
              </Col>
            ))
          : // Show ImageContainers once data is fetched
            photos.map((photo) => (
              <Col key={photo.id} span={8}>
                <ImageContainer photo={photo} />
              </Col>
            ))}
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Form>
          <Form.Item label="Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </Form.Item>
          <Form.Item>
            <Upload
              customRequest={customRequest}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />} disabled={isUploading}>
                {isUploading ? <Spin size="small" /> : "Upload new image here!"}
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default Home;
