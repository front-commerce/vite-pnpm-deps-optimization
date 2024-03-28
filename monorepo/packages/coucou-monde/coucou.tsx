import React from "react";
import op from "object-path";

const data = {
  title: "Bonjour le monde",
  description: "Description de Bonjour le monde",
  og: {
    title: "Bonjour le monde",
    description: "Description de Bonjour le monde",
    image: "https://duogeeks.com/images/logo.png",
  },
};

const HelloWorld: React.FC = () => {
  return (
    <div>
      <strong>Coucou monde !</strong>
      <p>{data.description}</p>
      <p>Nom : {op.get(data, "og.title")}</p>
    </div>
  );
};

export default HelloWorld;
