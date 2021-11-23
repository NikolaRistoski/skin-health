import { TimePicker } from "antd";
import moment from "moment";

const format = "HH:mm";

const TimePickerComponent = ({ setNewServiceDuration }) => {
  const onChange = (time) => {
    let timeFormat = moment(time, format);
    setNewServiceDuration(timeFormat);
  };
  return (
    <TimePicker
      defaultValue={moment("00:00", format)}
      format={format}
      onChange={onChange}
    />
  );
};

export default TimePickerComponent;
