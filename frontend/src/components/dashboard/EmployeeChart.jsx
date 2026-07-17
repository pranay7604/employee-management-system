import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function EmployeeChart({ dashboard }) {
  const data = [
    {
      name: "Employees",
      value: dashboard.totalEmployees,
    },

    {
      name: "Active",
      value: dashboard.activeEmployees,
    },

    {
      name: "Inactive",
      value: dashboard.inactiveEmployees,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="value" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default EmployeeChart;
