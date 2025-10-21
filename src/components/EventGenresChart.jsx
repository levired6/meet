import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const [outerRadius, setOuterRadius] = useState(getResponsiveRadius());

    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];


    function getResponsiveRadius() {
        const width = window.innerWidth;
        if (width <= 360) return 45;
        if (width <= 420) return 65;
        if (width <= 768) return 90;
        return 120;
    }

    const formatLabel = (name) => {
        if (name === 'JavaScript') return 'JS';
        return name;
    };


    useEffect(() => {
        const getData = () => {
            return genres.map((genre) => {
                const filteredEvents = events.filter(
                    (event) => event.summary && event.summary.includes(genre)
                );
                return { name: genre, value: filteredEvents.length };
            });
        };
        setData(getData());
    }, [events]);

    useEffect(() => {
        const handleResize = () => setOuterRadius(getResponsiveRadius());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const labelOffset = outerRadius * 0.25;
        const radius = outerRadius + labelOffset;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return percent > 0 ? (
            <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={15}
            >
                {`${formatLabel(genres[index])} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <ResponsiveContainer minWidth={350} width="99%" height={400}>
            <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>

                <Pie
                    data={data || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={outerRadius}
                    fill="#dd92fb"
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {(data || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;