import React from "react";

interface Props {
  message: string;
}
const Toast: React.FC<Props> = ({ message }) => {
  return (
    <div>
      <p className="text-s12 text-[red] pb-[-2rem]">{message}</p>
    </div>
  );
};

export default Toast;
