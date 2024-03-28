import React from "react";
import op from "object-path";
import ky from "ky";
import data from "~/config";

// const data = {
//   title: "Hello World",
//   description: "Hello World description",
//   og: {
//     title: "Hello World",
//     description: "Hello World description",
//     image: "https://duogeeks.com/images/logo.png",
//   },
// };

const HelloWorld: React.FC<{ showList?: boolean }> = ({ showList = true }) => {
  const [state, setState] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (showList) {
      setLoading(true);
      ky.get("https://jsonplaceholder.typicode.com/todos/")
        .json()
        .then((data: any) => {
          setState(data);
          setLoading(false);
        });
    }
  }, [showList]);

  const title = op.get(data, "og.title");

  return (
    <div>
      <h3>Alias Config From Root</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <p>{title ? "✨ CJS package works" : "💥 CJS package does not work"}</p>

      {showList && (
        <div>
          <h3>Data</h3>
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
      )}
    </div>
  );
};

export default HelloWorld;
