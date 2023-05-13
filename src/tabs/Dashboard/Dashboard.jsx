import React from "react";
import { Container } from "react-bootstrap";
import SideBar from "../../components/SideBar/SideBar";
import styled from "styled-components";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack } from "victory";

const myDataset = [
  [
    { x: "Jul", y: 1 },
    { x: "Aug", y: 1 },
    { x: "Sep", y: 2 },
    { x: "Okt", y: 2 },
    { x: "Nov", y: 1 },
    { x: "Dez", y: 2 },
  ],
  [
    { x: "Jul", y: 2 },
    { x: "", y: 3 },
    { x: "Sep", y: 4 },
    { x: "Okt", y: 5 },
    { x: "Nov", y: 5 },
    { x: "Dez", y: 2 },
  ],
  [
    { x: "Jul", y: 1 },
    { x: "Aug", y: 10 },
    { x: "Sep", y: 3 },
    { x: "Okt", y: 4 },
    { x: "Nov", y: 4 },
    { x: "Dez", y: 5 },
  ],

  [
    { x: "Jul", y: 1 },
    { x: "Aug", y: 2 },
    { x: "Sep", y: 3 },
    { x: "Okt", y: 4 },
    { x: "Nov", y: 4 },
    { x: "Dez", y: 5 },
  ],

  [
    { x: "Jul", y: 1 },
    { x: "Aug", y: 2 },
    { x: "Sep", y: 3 },
    { x: "Okt", y: 4 },
    { x: "Nov", y: 4 },
    { x: "Dez", y: 5 },
  ],

  [
    { x: "Jul", y: 1 },
    { x: "Aug", y: 2 },
    { x: "Sep", y: 3 },
    { x: "Okt", y: 4 },
    { x: "Nov", y: 4 },
    { x: "Dez", y: 1 },
  ],
];

const Styles = styled.div`
  .dashboard-wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #f6f6f6;
  }
`;

const Dashboard = () => {
  const [selected, setSelected] = React.useState(false);

  const transformData = (dataset) => {
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y;
      }, 0);
    });
    return dataset.map((data) => {
      return data.map((datum, i) => {
        return { x: datum.x, y: (datum.y / totals[i]) * 100 };
      });
    });
  };

  const dataset = transformData(myDataset);
  console.log(dataset);
  console.log(selected);

  return (
    <Styles>
      <div className="dashboard-wrapper">
        <SideBar calendar settings search tab={"dashboard"} />
        <Container>
          <VictoryChart
            height={300}
            width={500}
            domainPadding={{ x: 30, y: 20 }}
            // onClick={() => setSelected(!selected)}
          >
            <VictoryStack
              colorScale={[
                "#F89476",
                "#BD96E2",
                "#FFC432",
                "#7B8BF8",
                "#62BEFF",
                "#4E55F9",
              ]}
            >
              {dataset.map((data, i) => {
                return <VictoryBar data={data} key={i} />;
              })}
            </VictoryStack>
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 6 },
              }}
              dependentAxis
              tickFormat={(tick) => `${tick}%`}
              onClick={() => setSelected(!selected)}
            />
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 6 },
              }}
              tickFormat={["Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]}
            />
          </VictoryChart>
          {selected && <div>hover</div>}
        </Container>
      </div>
    </Styles>
  );
};

export default Dashboard;
