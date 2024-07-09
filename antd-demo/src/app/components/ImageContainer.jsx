import { useState } from "react";
import { Card, Image, Button, Spin, Flex, Typography } from "antd";
import CommentModal from "./CommentModal";
import ViewCommentModal from "./ViewCommentModal";
import base_route from "../utils/routing";

const ImageContainer = ({ photo }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isViewCommentModalVisible, setIsViewCommentModalVisible] =
    useState(false);
  const [comments, setComments] = useState([]);

  const handleViewComment = async () => {
    try {
      setLoadingComments(true);
      const response = await fetch(`${base_route}/comment/${photo.id}`);
      const data = await response.json();
      setComments(data);
      showViewCommentModal();
    } catch (err) {
      console.error("Failed to get comments:", error);
      res.status(500).json({ error: "Failed to get comments" });
    } finally {
      setLoadingComments(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const showViewCommentModal = () => {
    setIsViewCommentModalVisible(true);
  };

  const handleViewCommentModalClose = () => {
    setIsViewCommentModalVisible(false);
  };

  return (
    <Card
      hoverable
      cover={
        <Image
          alt={photo.title}
          src={photo.imageUrl}
          style={{ height: 300, objectFit: "cover" }}
        />
      }
      actions={[
        <Button
          key="comment"
          onClick={handleViewComment}
          disabled={loadingComments}
        >
          {loadingComments ? <Spin size="small" /> : "View Comments"}
        </Button>,
        <Button key="add" onClick={showModal}>
          Add Comment
        </Button>,
      ]}
    >
      <Flex justify="center">
        <Typography.Title level={2}>{photo.title}</Typography.Title>
      </Flex>
      <CommentModal
        imagePostId={photo.id}
        visible={isModalVisible}
        onClose={handleClose}
      />
      <ViewCommentModal
        visible={isViewCommentModalVisible}
        onClose={handleViewCommentModalClose}
        comments={comments}
      />
    </Card>
  );
};

export default ImageContainer;
