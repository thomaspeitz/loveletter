import * as React from "react";

type prop = {
  title: string;
  text: string;
};

const Loveletter = ({ text, title }: prop): JSX.Element => {
  return (
    <>
      <h1>{title}</h1>
      <h3>{text}</h3>
    </>
  );
};

export default Loveletter;
