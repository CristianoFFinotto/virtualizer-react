import "./Spinner.css"; // Create a CSS file for spinner styles

interface SpinnerProps {
  open?: boolean;
}

const Spinner = ({ open = false }: SpinnerProps) => {
  return (
    <dialog open={open}>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </dialog>
  );
};

export default Spinner;
