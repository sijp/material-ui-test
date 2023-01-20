import { hot } from "react-hot-loader";
import "./App.css";

import Button from "@mui/material/Button";

function App() {
  const label: String = "Hello!!!";
  return (
    <div className="App">
      <Button variant="contained">{label}</Button>
    </div>
  );
}

export default hot(module)(App);
