import { Col, Row } from "antd";
import { Card } from "antd";

// Appolo
import { useQuery } from "@apollo/client";
import { GET_ALL_MASTER_CATEGORIES } from "../GraphQL/Queries";
import Categories from "./categories.component";
import Services from "./services";
import { useState } from "react";

const { Meta } = Card;

const MasterCategory = () => {
  const [masterCategoryId, setMasterCategoryId] = useState("");
  // This state get value inside the categories component on category click
  const [categoryId, setCategoryId] = useState("");

  // GraphQl Data
  const { loading, error, data } = useQuery(GET_ALL_MASTER_CATEGORIES);

  if (loading) return "Loading...";

  if (error) console.log(error);

  return (
    <div className="master-categories-container">
      <Row justify="space-between" gutter={8} className="bg-white padding-30">
        {data.master_categories.map(({ id, name, image }) => {
          return (
            <Col
              xs={24}
              sm={24}
              md={3}
              key={id}
              onClick={() => setMasterCategoryId(id)}
            >
              <Card
                hoverable
                cover={
                  <img
                    src={image}
                    alt={name}
                    style={{ width: "50px", margin: "0 auto" }}
                  />
                }
                size="default"
              >
                <Meta
                  title={name}
                  style={{ width: "100%", textAlign: "center" }}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row justify="space-between" gutter={8} className="mt-30">
        <Col xs={24} sm={24} md={10}>
          <Categories
            masterCategoryId={masterCategoryId}
            setCategoryId={setCategoryId}
          />
        </Col>
        <Col xs={24} sm={24} md={14}>
          <Services categoryId={categoryId} />
        </Col>
      </Row>
    </div>
  );
};

export default MasterCategory;
