import FormAnt from "./form.component";

import { Modal, Button } from "antd";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import {CREATE_NEW_SERVICE, GET_SERVICES_BY_CATEGORY_ID} from "../GraphQL/Queries";

const FormModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Create new service state and function
  const [categoryId, setCategoryId] = useState(null)
  const [newServiceName, setNewServiceName] = useState(null)

  const [CreateNewService] = useMutation(CREATE_NEW_SERVICE, {
    variables: {
      category_id: categoryId,
      name: newServiceName,
      in_clinic: false,
      price: 321,
      rating: 5,
      duration: 45,
    },
    refetchQueries:[{
      query: GET_SERVICES_BY_CATEGORY_ID,
      variables:{
        category_id: categoryId
      }
    }]
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (val) => {
    CreateNewService()
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Service
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAnt setCategoryId={setCategoryId} setNewServiceName={setNewServiceName}/>
      </Modal>
    </>
  );
};

export default FormModal;
