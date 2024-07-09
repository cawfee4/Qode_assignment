import React from "react";
import { Card, Image, Button, Typography, Spin, Flex } from "antd";
import CommentModal from "./CommentModal";
import ViewCommentModal from "./ViewCommentModal";
const { Text } = Typography;

const ImageContainer = ({ photo }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [loadingComments, setLoadingComments] = React.useState(false);
  const [isViewCommentModalVisible, setIsViewCommentModalVisible] =
    React.useState(false);
  const [comments, setComments] = React.useState([]);

  const handleViewComment = async () => {
    try {
      setLoadingComments(true);
      const response = await fetch(`http://localhost:5000/comment/${photo.id}`);
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
        <Card.Meta title={photo.title} description={photo.description} />
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
