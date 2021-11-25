import { InputNumber } from "antd";

const InputNumberRatingComponent = ({setNewServiceRating}) => {
  function onChange(value) {
    setNewServiceRating(value)
  }
  return <InputNumber min={1} max={5} onChange={onChange} />;
};

export default InputNumberRatingComponent;
