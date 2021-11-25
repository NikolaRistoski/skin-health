import { Modal, Button, Radio, InputNumber } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { Form, Input, Select } from "antd";
import { CREATE_NEW_SERVICE, GET_SERVICES } from "../GraphQL/Queries";

import {
  GET_ALL_MASTER_CATEGORIES,
  GET_CATEGORIES_BY_MASTER_CATEGORY_ID,
} from "../GraphQL/Queries";

const FormModal = () => {
  const [form] = Form.useForm();
  const resetForm = () => {
    form.resetFields();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [componentSize, setComponentSize] = useState("default");
  const [masterCategoryId, setMasterCategoryId] = useState(null);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const { data: dataMaster } = useQuery(GET_ALL_MASTER_CATEGORIES);

  const { data: dataCategories } = useQuery(
    GET_CATEGORIES_BY_MASTER_CATEGORY_ID,
    {
      variables: {
        master_category_id: masterCategoryId,
      },
    }
  );

  //Get master category id and set useState for using in categories select filed
  function handleChangeMaster(value) {
    setMasterCategoryId(value);
  }

  const [createNewService] = useMutation(CREATE_NEW_SERVICE);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (val) => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const createService = (values) => {
    const { avaliable, category, duration, price, rating, service } = values;
    createNewService({
      variables: {
        category_id: category,
        duration: duration,
        in_clinic: avaliable,
        name: service,
        rating: rating,
        price: price,
      },
      update: (cache) => {
        const data = cache.readQuery({
          query: GET_SERVICES,
          variables: {
            category_id: category,
          },
        });
        if (data) {
          cache.writeQuery({
            query: GET_SERVICES,
            variables: {
              category_id: category,
            },
            data: {
              services: [...data.services, createNewService],
            },
          });
        }
      },
    });
    resetForm();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Service
      </Button>
      <Modal
        title="Add new service form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          onFinish={createService}
          size={componentSize}
          form={form}
        >
          <Form.Item label="Master" name="master" rules={[{ required: true }]}>
            <Select onChange={handleChangeMaster}>
              {dataMaster?.master_categories.slice(1).map(({ id, name }) => (
                <Select.Option value={id} key={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Select>
              {dataCategories?.categories.map(({ id, name }) => (
                <Select.Option value={id} key={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Avaliable"
            name="avaliable"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio.Button value={true}>In Clinic</Radio.Button>
              <Radio.Button value={false}>Virtual Consultation</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Rating" name="rating" rules={[{ required: true }]}>
            <InputNumber min={1} max={5} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Create New Service
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default FormModal;
