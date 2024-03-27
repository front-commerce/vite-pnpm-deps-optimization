import React from "react";
import op from "object-path";
import ky from "ky";

const data = {
  title: "Hello World",
  description: "Hello World description",
  og: {
    title: "Hello World",
    description: "Hello World description",
    image: "https://duogeeks.com/images/logo.png",
  },
};

const HelloWorld: React.FC = () => {
  const [state, setState] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    ky.get("https://jsonplaceholder.typicode.com/todos/")
      .json()
      .then((data: any) => {
        setState(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <strong>Hello World !</strong>
      <p>{data.description}</p>
      <p>Name: {op.get(data, "og.title")}</p>

      <div>
        <h3>TODO Data</h3>
        {loading && <div>Loading...</div>}
        {!loading && state.length === 0 && (
          <div>
            💥 Something went wrong
            <pre>
              {JSON.stringify({
                ky: ky,
                op: op,
              })}
            </pre>
          </div>
        )}
        {Boolean(state.length) && (
          <ul>
            {state.map((item, index) => (
              <li key={index}>
                {item.completed ? "✅" : "⬜"} - {item.title} (#{item.id})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HelloWorld;
