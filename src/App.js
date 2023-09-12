import "./App.css";
import { allSongs } from "./Songs";
import { useState } from "react";
import logo from "./imgs/2022_Causeries_Vit_utan_bakgrund.jpg.png";

function App() {
  const [currentSetlist, setCurrentSetlist] = useState([]);

  function handleRandomizeSetlist() {
    setCurrentSetlist(shuffleArray(allSongs));
  }

  function shuffleArray(array) {
    let shuffledArray = [...array];
    for (var i = shuffledArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    return shuffledArray;
  }

  const renderedSetlist = currentSetlist.map((song, index) => {
    return (
      <div className="song-row" key={index + 1}>
        {index + 1}: {song}
      </div>
    );
  });

  return (
    <div className="App">
      <div className="header">
        <img src={logo} className="logo-img" />
        {renderedSetlist.length > 0 && <h1>Todays Setlist:</h1>}
      </div>
      <div className="set-list">
        {renderedSetlist.length > 0 && renderedSetlist}
      </div>
      <button onClick={handleRandomizeSetlist} className="random-btn">
        Randomize Setlist
      </button>
    </div>
  );
}

export default App;
