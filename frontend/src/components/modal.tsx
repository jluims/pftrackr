import { useCallback } from "react";
import styles from "../css/modal.module.css";
type Props = {
  title: string;
  content: string;
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
};
function Modal({ title, content, visible, setVisible }: Props) {
  const close = useCallback(
    () => setVisible?.(!visible),
    [setVisible, visible]
  );

  return (
    <div
      className={`${styles.modalWrapper} ${visible ? styles.modalVisible : ""}`}
      onClick={(e) => {
        e.stopPropagation();

        if (e.target !== e.currentTarget) {
          return;
        }

        close();
      }}
    >
      <div className={styles.modal}>
        <h1>{title}</h1>
        <p>{content}</p>
        <button className={styles.closeBtn} onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}

export { Modal };
