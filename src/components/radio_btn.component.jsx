import { Radio } from "antd";

const RadioBtn = ({ element1, element2, setNewServiceInClinic, isDisabled }) => {
  function onChange(e) {
    setNewServiceInClinic(e.target.value);
}
  return (
    <>
      <Radio.Group defaultValue="true" buttonStyle="solid" onChange={onChange}>
        <Radio.Button value={true}>{element1}</Radio.Button>
        <Radio.Button value={false}>{element2}</Radio.Button>
      </Radio.Group>
    </>
  );
};

export default RadioBtn;
