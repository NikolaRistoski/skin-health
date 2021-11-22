import { useQuery } from "@apollo/client";
import { Col, Row, List, Skeleton, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

// GraphQl Query
import { GET_CATEGORIES_BY_MASTER_CATEGORY_ID } from "../GraphQL/Queries";

const Categories = ({ masterCategoryId, setCategoryId }) => {
  // GraphQL data
  const { loading, error, data } = useQuery(
    GET_CATEGORIES_BY_MASTER_CATEGORY_ID,
    {
      variables: {
        master_category_id: masterCategoryId,
      },
    }
  );

  if (loading) return "Loading...";
  if (error) return "Error";

  return (
    <div className="bg-white">
      <Row>
        <Col>
          <div
            id="scrollableDiv"
            style={{
              height: 600,
              width: 500,
              overflow: "auto",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <InfiniteScroll
              dataLength={data.categories.length}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data.categories}
                renderItem={({name, id}) => (
                  <Button
                    type="secondary"
                    size="large"
                    style={{ width: "100%", marginBottom: "10px" }}
                    // Set category id in parent component to use in services component
                    onClick={() => setCategoryId(id)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{name}</div>
                      <div>{id}</div>
                    </div>
                  </Button>
                )}
              />
            </InfiniteScroll>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
