import { useState, useEffect } from 'react'
import './App.css'
import Setup from '../components/Setup'
import { v4 as uuidv4 } from 'uuid';
import PlayerPanel from '../components/PlayerPanel';
import { useTranslation } from 'react-i18next';
import Play from '../components/Play';
import Die from '../components/Die';

function App() {

  const [games, setGames] = useState([])
  const [dice, setDice] = useState(allNewDice())
  const [playerName, setPlayerName] = useState("")
  const [status, setStatus] = useState("setup")
  const { t, i18n } = useTranslation()
  

  function addGame(playerName) {
    const newGame = {
      playerName: playerName,
      id: uuidv4(),
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      chance: null,
      yahtzee: null,
    }
    setGames([
      ...games,
      newGame
    ])
  }
  
  function allNewDice(){
    const numberOfDice = 5
    const dice = []
    for (let i = 0; i < numberOfDice; i++) {
      dice.push(newDie())
    }
    return dice
  }
  
  function newDie() {
    return ({
      hold: false,
      value: Math.ceil(Math.random()* 6),
      id: uuidv4()
    })
  }
  
  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.hold ? die : newDie()
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      if (die.id===id) 
        return {...die, hold: !die.hold} 
      else return die
    }))
  }

  const [currentGameId, setCurrentGameId] = useState(null)
  // TODO: implement
  const calcObject = {

  }
  
  function handlePlayerAdd(e) {
    e.preventDefault()
    //TODO: Message bei leerem Namen
    if (playerName === "") return
    addGame(playerName)
    setPlayerName("")
  }

  function handlePlayerRemove(e) {
    setGames(games.filter(game => game.id !== e.target.dataset.id))
    
  }

  function handlePlayerNameChange(e) {
    setPlayerName(e.target.value)
  }

  function handleStartButton(){
    if (games.length >= 2) {
      setCurrentGameId(games[0].id)
      setStatus("playing") 
    } else {
      //TODO: Message mehr Spieler benötigt
    }
  }

  function handleFigureClick(e) {
    //TODO: implementation
    console.log("Figure clicked")
  }

  const playerPanelElements = games.map(
    game =>
      <PlayerPanel 
        key={game.id} 
        id={game.id} 
        playerName={game.playerName} 
        handlePlayerRemove={ e => handlePlayerRemove(e) }/>
  )
  
  const dieElements = dice.map((die) => {
    return <Die 
              holdDice={() => holdDice(die.id)} 
              key={die.id} 
              value={die.value} 
              hold={die.hold}
            />
  })
 
  return (
    <>
      <h1>{t('header')}</h1>
      <div className='container'>
        {status === "setup" && <Setup
          playerName={playerName} 
          handlePlayerAdd={ e => handlePlayerAdd(e) } 
          playerPanelElements={playerPanelElements}
          handlePlayerNameChange={ e=> handlePlayerNameChange(e)}
          handleStartButton={handleStartButton}
          t={t}
        />}
        {status === "playing" && <Play 
          games={games}
          currentGameId={currentGameId}
          dieElements={dieElements}
          t={t}
          calcObject={calcObject}
          handleFigureClick={ e => handleFigureClick(e) }
          rollDice={rollDice}
        />}
      </div>
    </>
  )
}

export default App
