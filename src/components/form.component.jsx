import { useQuery } from "@apollo/client";

import RadioBtn from "../components/radio_btn.component";
// import TimePickerComponent from "../components/time_picker.component";
import InputNumberRatingComponent from "./input_number_rating.component";

import { Form, Input, Select } from "antd";
import { useState } from "react";

import {
  GET_ALL_MASTER_CATEGORIES,
  GET_CATEGORIES_BY_MASTER_CATEGORY_ID,
} from "../GraphQL/Queries";

const FormAnt = ({
  setCategoryId,
  setNewServiceName,
  setNewServiceInClinic,
  setNewServicePrice,
  setNewServiceRating,
  setNewServiceDuration,
}) => {
  const [componentSize, setComponentSize] = useState("default");
  const [masterCategoryId, setMasterCategoryId] = useState(null);
  const [disableCategory, setDisableCategory] = useState(true);
  const [disableService, setDisableService] = useState(true);

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
    setDisableCategory(false);
  }
  function handleNewServiceName(value) {
    setNewServiceName(value);
  }
  function handleNewServiceCategory(value) {
    setCategoryId(value);
  }
  function handleNewServicePrice(value) {
    setNewServicePrice(value);
  }
  function handleNewServiceDuration(value) {
    setNewServiceDuration(value);
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
          <Select onChange={handleChangeMaster}>
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
              <Select.Option value={id} key={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Service">
          <Input
            disabled={disableService}
            onChange={(e) => handleNewServiceName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Avaliable">
          <RadioBtn
            element1="In Clinic"
            element2="Virtual Consultation"
            setNewServiceInClinic={setNewServiceInClinic}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            disabled={disableService}
            onChange={(e) => handleNewServicePrice(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Duration">
          {/* <TimePickerComponent setNewServiceDuration={setNewServiceDuration}/> */}
          <Input
            disabled={disableService}
            onChange={(e) => handleNewServiceDuration(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumberRatingComponent
            setNewServiceRating={setNewServiceRating}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAnt;
