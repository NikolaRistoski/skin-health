import {
  QuestionCircleOutlined,
  ClockCircleOutlined,
  LaptopOutlined,
  StarFilled,
} from "@ant-design/icons";

import { Badge, Row, Col } from "antd";
import { Card } from "antd";

const ServicesCard = ({ id, in_clinic, name, price, rating, duration }) => {
  return (
    <>
      <Card
        id={id}
        style={{ width: "100%", marginTop: "1.2rem", padding: "10px" }}
        hoverable
        className="on-hover"
      >
        <Row>
          <Col span={20}>
            <p className="card-name">
              {name}{" "}
              <span style={{ fontSize: "14px" }}>
                <QuestionCircleOutlined /> <LaptopOutlined />
              </span>
            </p>
          </Col>
          <Col span={4}>
            <p className="price">
              <span style={{ marginRight: "5px" }}>&#163;</span>
              {price}
            </p>
          </Col>
          <Col span={24}>
            <p className="time">
              {duration} min <ClockCircleOutlined /> <Badge status="default" />{" "}
              2 services
            </p>
          </Col>

          <Col span={18}>
            <p style={{ display: "flex" }}>
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarFilled
                    key={i}
                    style={{
                      fontSize: "20px",
                      color: "#fadb14",
                      marginRight: "10px",
                    }}
                  />
                ))}{" "}
              <span className="review-span">{14} review</span>
            </p>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ServicesCard;
