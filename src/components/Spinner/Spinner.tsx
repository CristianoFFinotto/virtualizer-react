import style from "./Spinner.module.css";

export const Spinner = ({ open = false }: { open?: boolean }) => {
  return (
    <dialog open={open}>
      <div className={style.spinner}>
        <div className={style["double-bounce1"]}></div>
        <div className={style["double-bounce2"]}></div>
      </div>
    </dialog>
  );
};
