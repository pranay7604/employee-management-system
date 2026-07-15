import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [
    "#4caf50",
    "#f44336",
    "#ff9800"
];

function AttendanceChart({ dashboard }) {

    const data = [

        {
            name: "Present",
            value: dashboard.presentEmployees
        },

        {
            name: "Absent",
            value: dashboard.absentEmployees
        },

        {
            name: "Pending Leave",
            value: dashboard.pendingLeaves
        }

    ];

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                >

                    {data.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />

                    ))}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}

export default AttendanceChart;