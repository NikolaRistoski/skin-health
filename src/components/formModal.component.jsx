import FormAnt from "./form.component";

import { Modal, Button } from "antd";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  CREATE_NEW_SERVICE,
  GET_SERVICES_BY_CATEGORY_ID,
} from "../GraphQL/Queries";

const FormModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Create new service state and function
  const [categoryId, setCategoryId] = useState(null);
  const [newServiceName, setNewServiceName] = useState(null);
  const [newServiceInClinic, setNewServiceInClinic] = useState(null);
  const [newServicePrice, setNewServicePrice] = useState(null);
  const [newServiceRating, setNewServiceRating] = useState(null);
  const [newServiceDuration, setNewServiceDuration] = useState(null);

  const [CreateNewService] = useMutation(CREATE_NEW_SERVICE, {
    variables: {
      category_id: categoryId,
      name: newServiceName,
      in_clinic: newServiceInClinic,
      price: newServicePrice,
      rating: newServiceRating,
      duration: newServiceDuration,
    },
    refetchQueries: [
      {
        query: GET_SERVICES_BY_CATEGORY_ID,
        variables: {
          category_id: categoryId,
        },
      },
    ],
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (val) => {
    CreateNewService();
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
        title="Add new service form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormAnt
          setCategoryId={setCategoryId}
          setNewServiceName={setNewServiceName}
          setNewServiceInClinic={setNewServiceInClinic}
          setNewServicePrice={setNewServicePrice}
          setNewServiceRating={setNewServiceRating}
          setNewServiceDuration={setNewServiceDuration}
        />
      </Modal>
    </>
  );
};

export default FormModal;
