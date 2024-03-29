import { Tabs,Modal,Input,Form } from 'antd';
import React, { useRef, useState } from 'react';

const ChatModal = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
<Modal
    open={open}
    title="Create a new chat room"
    okText="Create"
    cancelText="Cancel"
    onCancel={onCancel}
    onOk={() => 
    {
        form.validateFields()
        .then((values) => 
        {
            form.resetFields();
            onCreate(values);
        })
        .catch((e) => 
        {
            window.alert(e);
        });
    }}
>
    <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item 
            name="name"
            label="Name"
            rules={[
            {
                message: 'Error: Please enterthe name of the person to chat!',
            }, ]}
        >
            <Input />
        </Form.Item>
    </Form>
</Modal>
  );};
export default ChatModal;