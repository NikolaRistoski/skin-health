import { useQuery } from "@apollo/client";
import { Form, Input, Select } from "antd";
import { useState } from "react";

import {
  GET_ALL_MASTER_CATEGORIES,
  GET_CATEGORIES_BY_MASTER_CATEGORY_ID,
} from "../GraphQL/Queries";

const FormAnt = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [masterCategoryId, setMasterCategoryId] = useState(null);
  const [disableCategory, setDisableCategory] = useState(true);
  const [disableService, setDisableService] = useState(true);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const {
    loading: loadingMaster,
    error: errorMaster,
    data: dataMaster,
  } = useQuery(GET_ALL_MASTER_CATEGORIES);

  const {
    loading: loadningCategories,
    error: errorCategories,
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
          >
            {dataCategories?.categories.map(({ id, name }) => (
              <Select.Option value={id} key={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Service">
          <Input disabled={disableService} />
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAnt;
