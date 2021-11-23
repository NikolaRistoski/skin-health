import { InputNumber } from "antd";

const InputNumberRatingComponent = ({setNewServiceRating}) => {
  function onChange(value) {
    setNewServiceRating(value)
  }
  return <InputNumber min={1} max={5} defaultValue={1} onChange={onChange} />;
};

export default InputNumberRatingComponent;
