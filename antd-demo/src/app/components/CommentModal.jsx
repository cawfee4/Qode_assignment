// src/components/CommentModal.js

"use client";

import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import base_route from "../utils/routing";

const { TextArea } = Input;

const CommentModal = ({ imagePostId, visible, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const response = await fetch(`${base_route}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify content type JSON
        },
        body: JSON.stringify({
          // Convert body to JSON string
          content: values.content,
          imagePostId: imagePostId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // Handle success
      // Reset form fields and close modal or whatever your logic is
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Upload failed.");
    }
  };

  return (
    <Modal
      title="Add a Comment"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="content"
          label="Comment"
          rules={[{ required: true, message: "Please enter your comment" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentModal;
