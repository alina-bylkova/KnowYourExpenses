import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import '../styles/LineChart.css';

function LineChartComponent(props) {
  return (
    <LineChart width={600} height={300} data={props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="monthName" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}

export default LineChartComponent;
