import { useEffect } from "react";
import { useState } from "react";

const numeroDePaginas = 42;

const array = [];
for (let i = 0; i < numeroDePaginas; i++) {
  array.push(i + 1);
}

function App() {
  const [pagina, setPagina] = useState(1);
  const [paginado, setPaginado] = useState(array);
  const [personajes, setPersonajes] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
      .then((informacion) => {
        return informacion.json();
      })
      .then((objeto) => setPersonajes(objeto.results));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getPagina = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pagina}`
      );
      const data = await getPagina.json();
      setPersonajes(data.results);
    };

    fetchData();
  }, [pagina]);

  useEffect(() => {
    console.log(personajes);
  }, [personajes]);

  useEffect(() => {
    if (pagina === 1) {
      setPaginado([
        array[0],
        array[1],
        array[2],
        "...",
        array[array.length - 2],
        array[array.length - 1],
      ]);
    }
    if (pagina === 3) {
      setPaginado([
        array[0],
        array[1],
        array[2],
        array[3],
        "...",
        array[array.length - 2],
        array[array.length - 1],
      ]);
    }
    if (pagina === 4) {
      setPaginado([
        array[0],
        array[1],
        array[2],
        array[3],
        array[4],
        "...",
        array[array.length - 2],
        array[array.length - 1],
      ]);
    }
    if (pagina >= 5) {
      setPaginado([
        array[0],
        array[1],
        "...",
        array[pagina - 2],
        array[pagina - 1],
        array[pagina],
        "...",
        array[array.length - 2],
        array[array.length - 1],
      ]);
    }
  }, [pagina]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {personajes?.map((personajes, index) => {
          return <img key={index} src={personajes.image} alt="" />;
        })}
      </div>
      <h1>{pagina}</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {paginado.map((ele, index) => {
          return (
            <button
              onClick={() => setPagina(ele)}
              key={index}
              disabled={ele === "..."}
            >
              {ele}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
