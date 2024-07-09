// src/components/CommentModal.js

"use client";

import React, { useState } from "react";
import { Modal, Button, Form, Input, message, Spin } from "antd";
import base_route from "../utils/routing";

const { TextArea } = Input;

const CommentModal = ({ imagePostId, visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${base_route}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: values.content,
          imagePostId: imagePostId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // Handle success
      form.resetFields();
      message.success("Comment added successfully.");
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Comment"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="content"
            label="Comment"
            rules={[{ required: true, message: "Please enter your comment" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CommentModal;
