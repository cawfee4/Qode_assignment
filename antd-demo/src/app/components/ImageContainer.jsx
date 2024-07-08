// components/ImageContainer.js

import React from "react";
import { Card, Image, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { useState } from "react";
import Text from "antd/lib/typography/Text";
import CommentModal from "./CommentModal";

const ImageContainer = ({ photo, addComment }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleAddComment = (comment) => {
    addComment(photo.id, comment);
  };

  return (
    <Card
      hoverable
      cover={<Image alt={photo.title} src={photo.url} />}
      actions={[<Button onClick={showModal}>Add Comment</Button>]}
    >
      <Meta title={photo.title} description={photo.description} />
      <div style={{ marginTop: "10px" }}>
        {photo.comments && photo.comments.length > 0 ? (
          photo.comments.map((comment, index) => (
            <Text key={index} type="secondary">
              {comment.author}: {comment.content}
            </Text>
          ))
        ) : (
          <Text type="secondary">No comments yet</Text>
        )}
      </div>
      <CommentModal
        visible={isModalVisible}
        onClose={handleClose}
        onSubmit={handleAddComment}
      />
    </Card>
  );
};

export default ImageContainer;
