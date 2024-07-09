import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Modal, Button, List, Avatar } from "antd";

const ViewCommentModal = ({ visible, onClose, comments }) => {
  return (
    <Modal
      visible={visible}
      title="Comment section"
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.author}
              description={item.content}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ViewCommentModal;
