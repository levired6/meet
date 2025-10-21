import React, { useState, useEffect } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    // Populate chart data when events change
    useEffect(() => {
        setData(getData());

        // force Recharts to recalc layout after data updates
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 0);
    }, [events]); // no need for `${events}`, just track events directly

    const getData = () => {
        return allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split(/, | - /)[0]; // Handles "Berlin, Germany" or "Dubai - UAE"
            return { city, count };
        });
    };



    return (
        <ResponsiveContainer minWidth={350} width="99%" height={420}>
            <ScatterChart
                margin={{
                    top: 30,
                    right: 25,
                    bottom: 60,
                    left: -30,
                }}
            >

                <CartesianGrid stroke="#fff" />
                <XAxis
                    type="category"
                    dataKey="city"
                    name="City"
                    angle={60}
                    interval={0}
                    tick={{ dx: 20, dy: 40, fontSize: 15, fill: "#fff" }}
                    axisLine={{ stroke: "#fff" }}  // axis color
                    tickLine={{ stroke: "#fff" }}
                />
                <YAxis
                    type="number"
                    dataKey="count"
                    name="Number of Events"
                    allowDecimals={false}
                    tick={{
                        fontSize: 12,
                        fill: "#fff",
                    }}
                    axisLine={{ stroke: "#fff" }}
                    tickLine={{ stroke: "#fff" }}
                />
                <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{ backgroundColor: "#fff", border: "1px solid #fff" }}
                    itemStyle={{ color: "#7b2cbf" }}
                    labelStyle={{ color: "#fff" }}
                />
                <Scatter name="Events in City" data={data} shape={({ tooltipPayload, tooltipPosition, ...rest }) => (
                    <circle
                        {...rest}
                        r={6}  // dot radius
                        style={{
                            fill: "#dd92fb",
                            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.4))"
                        }}
                    />
                )}
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default CityEventsChart;