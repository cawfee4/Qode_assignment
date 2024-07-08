// src/components/CommentModal.js

"use client";

import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";

const { TextArea } = Input;

const CommentModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
    onClose();
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
          name="author"
          label="Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
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
