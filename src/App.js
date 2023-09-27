import "./App.css";
import { useEffect, useState } from "react";
import logo from "./imgs/2022_Causeries_Vit_utan_bakgrund.jpg.png";

function App() {
  const [currentSetlist, setCurrentSetlist] = useState([]);
  const [allSongs, setAllSongs] = useState();
  const [amount, setAmount] = useState(10);

  function getAllSongs() {
    fetch("/data.json", {
      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllSongs(data.songs);
      });
  }

  function handleRandomizeSetlist() {
    setCurrentSetlist(shuffleArray(allSongs).slice(0, amount));
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

  function HandleAmountChange(step) {
    if (amount + step < 0) setAmount(0);
    else if (amount + step > allSongs.length) setAmount(allSongs.length);
    else setAmount(amount + step);
  }

  useEffect(() => {
    getAllSongs();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <img src={logo} className="logo-img" alt="band-logo" />
        {renderedSetlist.length > 0 && <h1>Todays Setlist:</h1>}
      </div>
      {allSongs && currentSetlist.length > 0 && (
        <div className="set-list">
          {renderedSetlist.length > 0 && renderedSetlist}
        </div>
      )}
      {allSongs && (
        <div className="random-main-control">
          <button onClick={handleRandomizeSetlist} className="random-btn">
            Randomize Setlist
          </button>
          <div className="songs-amount-input">
            <button
              className="amount-btn"
              onClick={() => HandleAmountChange(1)}
            >
              +
            </button>
            <input
              type="number"
              value={amount}
              min={1}
              max={allSongs.length}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
            <button
              className="amount-btn"
              onClick={() => HandleAmountChange(-1)}
            >
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
