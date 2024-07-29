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
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CapacityData } from "../types/capacity";
import { API } from "../api/API";
import { Modal } from "../components/modal";

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

const dayColors = [
  "rgb(255, 99, 132)",
  "rgb(245, 99, 255)",
  "rgb(159, 99, 255)",
  "rgb(99, 115, 255)",
  "rgb(99, 198, 255)",
  "rgb(99, 255, 148)",
  "rgb(206, 255, 99)",
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
  const [overlayMode, setOverlayMode] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorContent, setErrorContent] = useState("");
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

  const getDayData = useCallback(
    (day: string) => {
      if (!capacities) return null;
      const newTimes: number[] = [];
      const newVisits: number[] = [];

      const histories = capacities.crowdHistory;
      for (const history of histories) {
        if (history.weekDay === day) {
          newTimes.push(history.hourOfDay);
          newVisits.push(history.visits);
        }
      }

      return { newTimes, newVisits };
    },
    [capacities]
  );

  function updateDataPoints() {
    // if (!capacities) return;
    // const histories = capacities.crowdHistory;
    const dayData = getDayData(day);
    if (!dayData) return;

    const { newTimes, newVisits } = dayData;
    // const newTimes: number[] = [];
    // const newVisits: number[] = [];

    // for (const history of histories) {
    //   if (history.weekDay === day) {
    //     newTimes.push(history.hourOfDay);
    //     newVisits.push(history.visits);
    //   }
    // }

    setTimes(newTimes);
    setVisits(newVisits);
  }

  useEffect(updateDataPoints, [day, capacities, getDayData]);

  function getData() {
    const datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      yAxisID: string;
    }[] = [];

    if (overlayMode) {
      let i = 0;
      for (const day of dayNames) {
        const dayData = getDayData(day);
        if (dayData) {
          const { newVisits } = dayData;
          datasets.push({
            label: day,
            data: newVisits,
            borderColor: dayColors[i],
            backgroundColor: dayColors[i],
            yAxisID: "y",
          });
        }
        i++;
      }

      // return {};
    } else {
      const i = dayNames.indexOf(day);
      datasets.push({
        label: "Gym occupancy",
        data: visits,
        borderColor: dayColors[i],
        backgroundColor: dayColors[i],
        yAxisID: "y",
      });
      // return {
      //   labels: times.map((n) => convertTime(n)),
      //   datasets: [
      //     {
      //       label: "Gym occupancy",
      //       data: visits,
      //       borderColor: "rgb(255, 99, 132)",
      //       backgroundColor: "rgba(255, 99, 132, 0.5)",
      //       yAxisID: "y",
      //     },
      //   ],
      // };
    }

    return {
      labels: times.map((n) => convertTime(n)),
      datasets,
      // [
      //   {
      //     label: "Gym occupancy",
      //     data: visits,
      //     borderColor: "rgb(255, 99, 132)",
      //     backgroundColor: "rgba(255, 99, 132, 0.5)",
      //     yAxisID: "y",
      //   },
      // ],
    };
  }

  useEffect(() => {
    if (!gymId) return;

    API.getCapacityInfo(gymId)
      .then((res) => {
        setCapacities(res);
      })
      .catch((err) => {
        setErrorContent(String(err));
        setErrorVisible(true);
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
      <p>
        Note: This data is from Planet Fitness itself, it may not be completely
        accurate.
      </p>
      {!overlayMode && (
        <div className={styles.dayWrapper}>
          <button onClick={prevDay}>&lt;</button>
          <p>{day}</p>
          <button onClick={nextDay}>&gt;</button>
        </div>
      )}
      <button
        onClick={() => setOverlayMode(!overlayMode)}
      >
        Overlay mode {overlayMode ? "on" : "off"}
      </button>
      <div className={styles.chartWrapper}>
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: true,
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
          data={getData()}
        />
      </div>
      <Modal
        title="Error"
        content={errorContent}
        visible={errorVisible}
        setVisible={setErrorVisible}
      />
    </div>
  );
}

export { TrackingPage };
