import React from "react";
import HelloWorld from "@test-pkg/hello-world";
import config from "~/config";

const HelloWorldParent: React.FC = () => {
  return (
    <div style={{ border: "1px dashed orange", padding: 10 }}>
      <h1>Nested Packages</h1>

      <h3>Alias Config From Root</h3>
      <pre>{JSON.stringify(config, null, 2)}</pre>

      <div style={{ border: "1px dashed green", padding: 10 }}>
        <HelloWorld />
      </div>
    </div>
  );
};

export default HelloWorldParent;
