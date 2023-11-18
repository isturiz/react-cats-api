import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`;
  const CAT_ENDPONT_RANDOM_IMG = `https://api.thecatapi.com/v1/images/search?limit=1`;

  const [fact, setFact] = useState();
  // const [newFact, setNewFact] = useState(0);
  const [image, setImage] = useState();

  const fetchRandomFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.fact);
        // const firstWord = data.fact.split(" ", 3).join(" "); <--- Get the first tree words
        const firstWord = data.fact;

        setFact(firstWord);

        fetch(CAT_ENDPONT_RANDOM_IMG)
          .then((response) => response.json())
          .then((data) => {
            console.log(data[0].url);
            setImage(data[0].url);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRandomFact();
  }, []);

  return (
    <>
      <section>
        {fact && <p>{fact}</p>}
        {image && (
          <img src={image} alt="image from random image cats API" width={300} />
        )}
      </section>
      <button onClick={fetchRandomFact}>Obtener nuevo hecho</button>
    </>
  );
}

export default App;
