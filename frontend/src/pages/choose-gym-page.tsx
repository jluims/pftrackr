import { useLocation, useNavigate } from "react-router-dom";
import styles from "../css/choose-gym.module.css";
import { Club } from "../types/gyms";

function ChooseGymPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  if (state == null) {
    location.href = "/";
    return <></>;
  }

  const gyms = state.gyms as Club[];

  return (
    <div>
      <h1>Select a gym</h1>
      <div className={styles.list}>
        {gyms.map((gym) => {
          return (
            <button
              className={styles.gym}
              onClick={() => {
                navigate("/tracking", {
                  state: {
                    gymId: gym.id,
                  },
                });
              }}
            >
              <p>{gym.location.address}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { ChooseGymPage };
