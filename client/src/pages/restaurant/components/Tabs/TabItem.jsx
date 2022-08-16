import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useFetch from "../../../../hooks/useFetch";
import "./tabs.css";

const TabItem = ({ id }) => {
  const { data, loading, error } = useFetch(`/res/find/${id}`);
  const menu = data?.menus;
  let cost = menu?.map((item) => item?.cost);
  cost = cost?.reduce((a, b) => a + b, 0) / cost?.length;

  return (
    <Tabs>
      <TabList style={{ fontSize: "21px", fontWeight: "600" }}>
        <Tab>Overview</Tab>
        <Tab>Contact</Tab>
      </TabList>

      <TabPanel>
        <div className="about">
          <h4>About this place</h4>
          <div className="cuisine">
            <h5>Cuisine</h5>
            {menu?.map((item, index) => (
              <span key={index}>{item.cusine} | </span>
            ))}
          </div>
          <div className="averagecost">
            <h5>Average Cost</h5>
            <span>₹ {cost} for two people(approx.)</span>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="about">
          <div className="cuisine">
            <h4>Phone Number</h4>
            <span className="phone">{data?.contact_number}</span>
          </div>
          <div className="averagecost">
            <h5>{data?.name}</h5>
            <span>{data?.address}</span>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default TabItem;
