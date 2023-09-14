import { ErrorProps } from "../types/interfaces";

const Error = (props: ErrorProps) => {
  if (props.message === "") {
    return <></>;
  }

  return (
    <div>
      <h3>{props.message}</h3>
    </div>
  );
};

export default Error;
