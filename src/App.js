import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";

import Navegacion from "./componentes/Navegacion";
function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  console.log(name);
  console.log(description);

  useEffect(() => {}, []);

  return (
    <>
      <Navegacion />
    </>
  );
}

export default App;
