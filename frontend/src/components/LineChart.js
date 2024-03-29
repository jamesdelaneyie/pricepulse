import React, { useState, useEffect } from 'react';

const LineChart = ({ data }) => {

    const [chartRange, setChartRange] = useState("1Y")
    const [width, setWidth] = useState(500);
    
    //reverse the order of the array
    const chartData = data.slice()
    chartData.reverse();

    //change all prices to numbers
    chartData.forEach(d => {
        d.price = Number(d.price);
    });
    
    // get the max and min price from the data, the price is stored as a string so we need to convert it to a number
    const maxPrice = Math.max(...chartData.map(d => Number(d.price)));
    const minPrice = Math.min(...chartData.map(d => Number(d.price)));

    const height = 150;

    const handleResize = () => {
      setWidth(document.querySelector(".chart").clientWidth - 40);
    }
    window.addEventListener('resize', handleResize);

    useEffect(() => {
      handleResize();
    }, []);
    


    // create an array of points for the line
    const points = chartData.map((d, i) => {
        const x = i * (width / (data.length - 1));
        const y = height - ((d.price - minPrice) / (maxPrice - minPrice)) * height;
        return `${x},${y}`;
    })

    const linePoints = points.join(" ");

    const XAxis = ({ data }) => (
        <g className="x-axis">
          {data.map((d, i) => {
            if (i % 90 !== 0) {
              // skip every 4th entry
              return null;
            }
            const x = (i / (data.length - 1)) * width;
            return (
              <g key={i} transform={`translate(${x}, 0)`}>
                <line y2={height} stroke="#cecece" strokeWidth="0.5" />
                {/* if its the first entry, add 20 to the x position */}
                {/* if its the last entry, subtract 20 from the x position */}
                <text
                  x={i === 0 ? 20 : i === data.length - 1 ? -20 : 0}
                  y={height + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#2563eb"
                >
                  {/* show the time only in HH:MM */}
                  { (new Date(d.date_created)).toLocaleDateString() }
                </text>
              </g>
            );
          })}
        </g>
      );



    const Line = ({ points }) => (
        <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="1"
            points={points}
        />
    );

    //add circle elements with the price value inside them at each point
    const Circles = ({ points }) => (
        <g className="circles">
          {points.map((point, i) => {
            const [x, y] = point.split(",");
            const radius = 1;
            return (
                <g key={i}>
                    <Circle x={x} y={y} r={radius} fill="#2563eb" />
                    <Text x={x} y={y - radius - 2}>
                        {Number(chartData[i].price).toFixed(2)}
                    </Text>
                </g>
            );
          })}
        </g>
      );

    //add a hover effect to the circles to show the price
    const Circle = ({ x, y, r, fill }) => (
        <circle
            cx={x}
            cy={y}
            r={r}
            fill={fill}
            onMouseEnter={e => {
                const circle = e.target;
                const text = circle.nextSibling;
                text.setAttribute("visibility", "visible");
            }}
            onMouseLeave={e => {
                const circle = e.target;
                const text = circle.nextSibling;
                text.setAttribute("visibility", "hidden");
            }}
        />
    );

    const Text = ({ x, y, children }) => (
        <text
            x={x}
            y={y - 2}
            textAnchor="middle"
            fontSize="12"
            fill="#2563eb"
            visibility="hidden"
        >
            {children}
        </text>
    );

                
    return (
        <main className="p-4 border border-slate-200 rounded mb-3 pb-10">
            <div className="chart">
                <svg className="ml-3 mt-2" height={height} width={width} style={{overflow: 'visible'}}>
                    <XAxis data={chartData} />
                    {/*<YXAxis data={chartData} />*/}
                    <Circles points={points} />
                    <Line points={linePoints} />
                </svg>       
                {/*<ul className="flex justify-center text-xs font-medium border border-slate-200 mt-10 rounded overflow-hidden">
                    <li className="flex-1 text-center text-slate-600 p-2 hover:bg-blue-500 hover:text-white hover:cursor-pointer">1D</li>
                    <li className="flex-1 text-center text-slate-600 p-2 hover:bg-blue-500 hover:text-white hover:cursor-pointer">1W</li>
                    <li className="flex-1 text-center text-slate-600 p-2 hover:bg-blue-500 hover:text-white hover:cursor-pointer">1M</li>
                    <li className="flex-1 text-center text-slate-600 p-2 hover:bg-blue-500 hover:text-white hover:cursor-pointer">1Y</li>
                    <li className="flex-1 text-center text-slate-600 p-2 hover:bg-blue-500 hover:text-white hover:cursor-pointer">ALL</li>
                </ul>*/}
            </div>
        </main>
    )
}

export default LineChart;


