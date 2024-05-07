import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import React from 'react';

type GraphStyleType = {
  dataKey: string;
  stroke: string;
  fill: string;
};
type GraphPointsDataType = {
  name: string;
  [key: number]: number;
};
export interface IGraphProps {
  GraphPointsData: GraphPointsDataType[];
  GraphsIndividualData: GraphStyleType[];
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

const Graph = ({
  GraphsIndividualData,
  GraphPointsData,
  children,
  ...props
}: IGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        {...props}
        width={50}
        height={50}
        data={GraphPointsData}
        id="area-chart"
      >
        {children}
        {GraphsIndividualData.map((item: GraphStyleType, index) => (
          <Area
            type="monotone"
            dataKey={item.dataKey}
            stackId="1"
            stroke={item.stroke}
            fill={item.fill}
            key={item.dataKey}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
