import FormAnt from './form.component'

import { Modal, Button } from "antd";
import { useState } from "react";


const FormModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const[createNewService, setCreateNewService] = useState(null)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false)
    createNewService()
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
       <FormAnt setCreateNewService={setCreateNewService}/>
      </Modal>
    </>
  );
};

export default FormModal;
