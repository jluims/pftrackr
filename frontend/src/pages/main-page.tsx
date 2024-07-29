import { useState } from "react";
import styles from "../css/main-page.module.css";
import { useNavigate } from "react-router-dom";
import { API } from "../api/API";
import { Modal } from "../components/modal";

function MainPage() {
  const [zipCode, setZipCode] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorContent, setErrorContent] = useState("");
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
                if (!zipCode) {
                  setErrorContent("Please enter a ZIP/postal code");
                  setErrorVisible(true);
                  return;
                }
                const gyms = await API.getGyms(zipCode);
                if (gyms.length === 0) {
                  setErrorContent("No gyms found");
                  setErrorVisible(true);
                  return;
                }

                console.log("did nav");
                navigate("/choose-gym", {
                  state: {
                    gyms,
                  },
                });
              } catch (err) {
                const errorMsg =
                  err instanceof Error ? err.message : String(err);
                // alert(errorMsg);
                setErrorContent(errorMsg);
                setErrorVisible(true);
              }
            }}
          >
            <div>
              <p>Enter your ZIP/postal code</p>
              <input
                type="number"
                value={zipCode}
                onChange={(ev) => setZipCode(ev.target.value)}
                placeholder="e.g. 12345"
                className={styles.input}
              />
            </div>
            <button className={styles.searchBtn}>Search</button>
          </form>
        </div>
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

export { MainPage };
