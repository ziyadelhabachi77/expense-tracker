import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useWeeklyActivityChart } from "../../../hooks";


Chart.register(...registerables);

const WeeklyActivityChart = () => {
  const chartRef = useRef(null);
  const instanceRef = useRef(null);

  const {data,isLoading} = useWeeklyActivityChart();



  useEffect(() => {
    if (!chartRef.current || !data?.length) return;

    if (instanceRef.current) instanceRef.current.destroy();

    const maxVal = Math.max(...data.map((d) => d.total));

    instanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: data.map((d) => d.day),
        datasets: [
          {
            data: data.map((d) => d.total),
            backgroundColor: data.map((d) =>
              d.total === maxVal ? "#16a34a" : "#86efac"
            ),
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.y.toFixed(2)} DH`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: "#9ca3af", font: { size: 12 } },
          },
          y: {
            display: true,
            beginAtZero: true,
            grid: { color: "#f3f4f6" },
            border: { display: false },
            ticks: {
              color: "#9ca3af",
              font: { size: 11 },
              callback: (value) => `${value} DH`,
            },
          },
        },
      },
    });

    return () => instanceRef.current?.destroy();
  }, [data]);

  return (
    <div className="bg-white max-md:w-full lg:flex-1 w-90 md:w-140 rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">
          Weekly Activity
        </h2>
        <span className="text-xs text-gray-500 border border-gray-200 rounded-lg px-2 py-1">
          Last 7 Days
        </span>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex items-end justify-between h-36 px-2">
          {[40, 70, 50, 90, 60, 30, 80].map((h, i) => (
            <div
              key={i}
              className="w-6 bg-gray-200 rounded-t-md animate-pulse"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      ) : !data?.length ? (
        <div className="h-36 flex items-center justify-center text-sm text-gray-400">
          No activity this week
        </div>
      ) : (
        <div className="relative h-36">
          <canvas
            ref={chartRef}
            role="img"
            aria-label="Weekly spending activity bar chart"
          />
        </div>
      )}
    </div>
  );
};

export default WeeklyActivityChart;