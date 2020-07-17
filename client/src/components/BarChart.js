import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import '../styles/BarChart.css';

function BarChartComponent(props) {
  return (
    <BarChart
      width={600}
      height={300}
      layout="vertical"
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="category" type="category" />
      <Tooltip />
      <Bar dataKey="amount" fill="#8884d8">
        {props.data.map((entry, index) => (
          <Cell key={index} fill={props.colors[index % props.colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
}

export default BarChartComponent;
