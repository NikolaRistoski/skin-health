import { useQuery, useMutation } from "@apollo/client";

import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

import {
  GET_ALL_MASTER_CATEGORIES,
  GET_CATEGORIES_BY_MASTER_CATEGORY_ID,
  CREATE_NEW_SERVICE,
} from "../GraphQL/Queries";

const FormAnt = ({setCreateNewService}) => {
  const [componentSize, setComponentSize] = useState("default");
  const [masterCategoryId, setMasterCategoryId] = useState(null);
  const [disableCategory, setDisableCategory] = useState(true);
  const [disableService, setDisableService] = useState(true);
  
  const [categoryId, setCategoryId] = useState(null)
  const [newServiceName, setNewServiceName] = useState(null)

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const {
    data: dataMaster,
  } = useQuery(GET_ALL_MASTER_CATEGORIES);

  const {
    data: dataCategories,
  } = useQuery(GET_CATEGORIES_BY_MASTER_CATEGORY_ID, {
    variables: {
      master_category_id: masterCategoryId,
    },
  });

  //Get master category id and set useState for using in categories select filed
  function handleChange(value) {
    setMasterCategoryId(value);
    setDisableCategory(false);
  }
  function handleNewServiceName(value){
      setNewServiceName(value)
  }
  function handleNewServiceCategory(value){
    setCategoryId(value)
  }

    const [CreateNewService] = useMutation(CREATE_NEW_SERVICE, {
      variables: {
        category_id: categoryId,
        name: newServiceName,
        in_clinic: false,
        price: 321,
        rating: 5,
        duration: 45,
      },
    });
  

  return (
    <>
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
        size={componentSize}
      >
        <Form.Item label="Master">
          <Select onChange={handleChange}>
            {dataMaster?.master_categories.slice(1).map(({ id, name }) => (
              <Select.Option value={id} key={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Category">
          <Select
            disabled={disableCategory}
            onClick={() => setDisableService(false)}
            onChange={handleNewServiceCategory}
          >
            {dataCategories?.categories.map(({ id, name }) => (
              <Select.Option value={id} key={id} >
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Service">
          <Input disabled={disableService} onChange={(e) => handleNewServiceName(e.target.value)}/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() => setCreateNewService(CreateNewService())}>
          Submit
        </Button>
      </Form.Item>
      </Form>
    </>
  );
};

export default FormAnt;
