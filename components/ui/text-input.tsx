import classes from "./text-input.module.scss";

function TextInput(props: any) {
  return (
    <div className={classes.form}>
      <input key={props.key} placeholder={props.placeholder} {...props} />
      <label htmlFor={props.id}>{props.placeholder || "title"}</label>
    </div>
  );
}

export default TextInput;
