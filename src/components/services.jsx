import { MedicineBoxOutlined, LaptopOutlined } from "@ant-design/icons";

import { useQuery } from "@apollo/client";
import { Col, Row } from "antd";
import { useState } from "react";
import { GET_SERVICES_BY_CATEGORY_ID } from "../GraphQL/Queries";

import ServicesCard from "./services_card.component";
import ServiceType from "./service_type.component";

const Services = ({ categoryId }) => {
  const [inClinic, setInClinic] = useState(true);

  const { loading, data, error } = useQuery(GET_SERVICES_BY_CATEGORY_ID, {
    variables: {
      category_id: categoryId,
    },
  });

  if (loading) return "Loading...";
  if (error) return "Error";

  // Check if service is virtual avaliable
  const checkIfVirtualAvaliable = data.categories[0].services.some(
    (item) => item.in_clinic === false
  );
  
  return (
    <div className="bg-white ml-30">
      <Row>
        {checkIfVirtualAvaliable ? (
          <>
            <Col xs={24} sm={24} md={12}>
              <ServiceType
                title={"In Clinic"}
                icon={<MedicineBoxOutlined />}
                setInClinic={setInClinic}
                
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <ServiceType
                title={"Virtual Consultation"}
                icon={<LaptopOutlined />}
                onClick={() => setInClinic(false)}
                setInClinic={setInClinic}
              />
            </Col>
          </>
        ) : (
          <Col xs={24} sm={24} md={24}>
            <ServiceType
              title={"In Clinic"}
              icon={<MedicineBoxOutlined />}
              setInClinic={setInClinic}
            />
          </Col>
        )}
      </Row>
      <Row>
        {inClinic ? (
          <Col>
            {data.categories.map((item) => {
              return item.services.map((service) => {
                const { id, in_clinic, name, price, rating, duration } =
                  service;
                if (in_clinic === true) {
                  return (
                    <ServicesCard
                      key={id}
                      id={id}
                      in_clinic={in_clinic}
                      name={name}
                      price={price}
                      rating={rating}
                      duration={duration}
                    />
                  );
                }
              });
            })}
          </Col>
        ) : (
          <Col>
            {data.categories.map((item) => {
              return item.services.map((service) => {
                const { id, in_clinic, name, price, rating, duration } =
                  service;
                if (in_clinic === false) {
                  return (
                    <ServicesCard
                      key={id}
                      id={id}
                      in_clinic={in_clinic}
                      name={name}
                      price={price}
                      rating={rating}
                      duration={duration}
                    />
                  );
                }
              });
            })}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Services;
