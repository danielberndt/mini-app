import { useEffect, useState } from "react";

/*

Part one
--------

- change the styling such that the number and button are in the center of the screen
- instead of numbers, show these emojis instead:
  ⚀ ⚁ ⚂ ⚃ ⚄ ⚅


Part two
--------

Instead of using `useLocalDie`, use `useRemoteDie`.
Fix these issues:
- display the new value after rolling the die.
- the `/do-a-roll` fails quite frequently. Add a retry mechanism.

*/

const useRemoteDie = () => {
  const [value, setValue] = useState();

  useEffect(() => {
    fetch("/get-value")
      .then((res) => res.json())
      .then((res) => {
        setValue(res.value);
      });
  }, []);

  const roll = () => {
    fetch("/do-a-roll", { method: "POST" });
  };

  return [value, roll];
};

const getRandomDieValue = () => Math.floor(Math.random() * 6 + 1);
const useLocalDie = () => {
  const [value, setValue] = useState(getRandomDieValue);
  const roll = () => setValue(getRandomDieValue());
  return [value, roll];
};

const App = () => {
  const [value, roll] = useLocalDie();

  return (
    <>
      <h1>{value}</h1>
      <button onClick={roll}>Roll</button>
    </>
  );
};

export default App;
