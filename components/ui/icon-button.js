import classes from "./icon-button.module.css";

function IconButton(props) {
  return (
    <button
      {...props}
      className={
        props.primary
          ? classes.buttonPrimary
          : props.success
          ? classes.buttonSuccess
          : props.error
          ? classes.buttonError
          : classes.button
      }
    >
      {props.children}
    </button>
  );
}

export default IconButton;
