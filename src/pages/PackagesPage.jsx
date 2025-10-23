import { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import PackagesCard from "../components/PackagesCard";
import usePackageData from "../PackageData";

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const packageData = usePackageData();

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <div
        style={{
          marginTop: "8rem",
          marginBottom: "2rem",
          color: "var(--primary-color)",
        }}
      >
        <h2 className="mb-4">Packages</h2>

        <Tabs
          activeKey={activeTab}
          onSelect={handleTabSelect}
          style={{
            textDecoration: "none",
            color: "var(--primary-color)",
          }}
          className="custom-tabs"
        >
          <Tab eventKey="all" title="All">
            <Row>
              {packageData.map((item, index) => (
                <Col key={index} sm={6} md={3} lg={3} className="mt-4">
                  <PackagesCard
                    categoryTitle={item.categoryTitle}
                    packageTitle={item.packageTitle}
                    packagePrice={item.packagePrice}
                    paymentLink={item.paymentLink}
                    paymentSched={item.paymentSched}
                    credits={item.credits}
                    access={item.access}
                    validity={item.validity}
                  />
                </Col>
              ))}
            </Row>
          </Tab>

          <Tab eventKey="intro" title="Intro Pack - New Clients">
            <Row>
              {packageData
                .filter((item) => item.category === "intro")
                .map((item, index) => (
                  <Col key={index} sm={3} className="mt-4">
                    <PackagesCard
                      categoryTitle={item.categoryTitle}
                      packageTitle={item.packagePrice}
                      paymentLink={item.paymentLink}
                      paymentSched={item.paymentSched}
                      credits={item.credits}
                      access={item.access}
                      validity={item.validity}
                    />
                  </Col>
                ))}
            </Row>
          </Tab>

          <Tab eventKey="class" title="Class Pack">
            <Row>
              {packageData
                .filter((item) => item.category === "class")
                .map((item, index) => (
                  <Col key={index} sm={3} className="mt-4">
                    <PackagesCard
                      categoryTitle={item.categoryTitle}
                      packageTitle={item.packagePrice}
                      paymentLink={item.paymentLink}
                      paymentSched={item.paymentSched}
                      credits={item.credits}
                      access={item.access}
                      validity={item.validity}
                    />
                  </Col>
                ))}
            </Row>
          </Tab>

          <Tab eventKey="share" title="Shareable for 2">
            <Row>
              {packageData
                .filter((item) => item.category === "share")
                .map((item, index) => (
                  <Col key={index} sm={3} className="mt-4">
                    <PackagesCard
                      categoryTitle={item.categoryTitle}
                      packageTitle={item.packagePrice}
                      paymentLink={item.paymentLink}
                      paymentSched={item.paymentSched}
                      credits={item.credits}
                      access={item.access}
                      validity={item.validity}
                    />
                  </Col>
                ))}
            </Row>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}
