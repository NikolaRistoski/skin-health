import { Button } from "antd";

const ServiceType = ({ title, icon, setInClinic }) => {
  return (
    <Button
      type="secondary"
      icon={icon}
      size="large"
      style={{ width: "100%", color: "#737387" }}
      onClick={() => {
        if (title.toLowerCase() === "in clinic") {
          setInClinic(true);
        } else {
          setInClinic(false);
        }
      }}
    >
      {title}
    </Button>
  );
};

export default ServiceType;
