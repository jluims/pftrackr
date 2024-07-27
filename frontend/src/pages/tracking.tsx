import { Line } from "react-chartjs-2";
import styles from "../css/tracking.module.css";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CapacityData } from "../types/capacity";
import { API } from "../api/API";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayToStr = (num: number) => dayNames[num];

const convertTime = (time: number) =>
  (time % 12 || 12) + (time < 12 ? " AM" : " PM");
//   time == 0 ? "12:00 AM" : time < 12 ? time + ":00 AM" : time - 12 + ":00 PM";

function TrackingPage() {
  const { state } = useLocation();
  const [capacities, setCapacities] = useState<CapacityData>();
  const [day, setDay] = useState(dayToStr(new Date().getDay()));
  const [times, setTimes] = useState<number[]>([]);
  const [visits, setVisits] = useState<number[]>([]);
  const gymId = state.gymId as string;

  function getBestTime() {
    let shortest = visits[0];
    let shortestTime = times[0];
    for (let i = 1; i < times.length; i++) {
      const curr = visits[i];
      if (curr < shortest) {
        shortest = curr;
        shortestTime = times[i];
      }
    }

    return shortestTime;
  }

  function nextDay() {
    let dayIndex = dayNames.indexOf(day);
    dayIndex++;
    if (dayIndex > dayNames.length - 1) {
      dayIndex = 0;
    }

    setDay(dayToStr(dayIndex));
  }

  function prevDay() {
    let dayIndex = dayNames.indexOf(day);
    dayIndex--;
    if (dayIndex < 0) {
      dayIndex = dayNames.length - 1;
    }

    setDay(dayToStr(dayIndex));
  }

  function updateDataPoints() {
    if (!capacities) return;
    const histories = capacities.crowdHistory;
    const newTimes: number[] = [];
    const newVisits: number[] = [];

    for (const history of histories) {
      if (history.weekDay === day) {
        newTimes.push(history.hourOfDay);
        newVisits.push(history.visits);
      }
    }

    setTimes(newTimes);
    setVisits(newVisits);
  }

  useEffect(updateDataPoints, [day, capacities]);

  useEffect(() => {
    if (!gymId) return;

    API.getCapacityInfo(gymId)
      .then((res) => {
        setCapacities(res);
      })
      .catch((err) => {
        alert("Error: " + String(err));
      });
  }, [gymId]);

  if (state == null) {
    location.href = "/";
    return <></>;
  }

  return (
    <div className={styles.content}>
      <h1>Gym tracking</h1>
      <p>Max occupancy: {capacities?.maxCapacity}</p>
      <p>The best time to go is {convertTime(getBestTime())}</p>
      <div className={styles.dayWrapper}>
        <button onClick={prevDay}>&lt;</button>
        <p>{day}</p>

        <button onClick={nextDay}>&gt;</button>
      </div>
      <div className={styles.chartWrapper}>
        <Line
          options={{
            responsive: true,
            interaction: {
              mode: "index" as const,
              intersect: false,
            },
            scales: {
              y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
              },
            },
          }}
          data={{
            labels: times.map((n) => convertTime(n)),
            datasets: [
              {
                label: "Gym occupancy",
                data: visits,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export { TrackingPage };
