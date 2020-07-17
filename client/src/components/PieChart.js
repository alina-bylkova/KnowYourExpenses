import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import '../styles/PieChart.css';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieChartComponent(props) {
  return (
    <PieChart width={600} height={400}>
      <Pie
        isAnimationActive={true}
        data={props.data}
        cx={200}
        cy={200}
        innerRadius={50}
        outerRadius={80}
        labelLine={true}
        label={renderCustomizedLabel}
        dataKey="amount"
        nameKey="category"
        fill="#8884d8"
        paddingAngle={3}
      >
        {props.data.map((entry, index) => (
          <Cell key={index} fill={props.colors[index % props.colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default PieChartComponent;
