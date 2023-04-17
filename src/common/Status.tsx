import React from "react";
import Context, { TContext } from "../ChatContext";
export const Status = () => {
  const { status } = React.useContext(Context) as TContext;
  return <p className="m-2 text-sm">*{status && status.message}</p>;
};
