import { useState } from "react";
import styles from "../css/main-page.module.css";
import { useNavigate } from "react-router-dom";
import { API } from "../api/API";

function MainPage() {
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <h1>PFtrackr</h1>
      <div>
        <div>
          <form
            action="#"
            onSubmit={async (ev) => {
              ev.preventDefault();

              try {
                const gyms = await API.getGyms(zipCode);
                if (gyms.length === 0) {
                  return alert("No gyms found");
                }

                console.log("did nav");
                navigate("/choose-gym", {
                  state: {
                    gyms,
                  },
                });
              } catch (err) {
                alert("Error: " + String(err));
              }
            }}
          >
            <div>
              <p>Enter your ZIP code</p>
              <input
                type="number"
                value={zipCode}
                onChange={(ev) => setZipCode(ev.target.value)}
              />
            </div>
            <button>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { MainPage };
