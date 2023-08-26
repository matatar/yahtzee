import { useState, useEffect,useRef } from 'react'
import './App.css'
import Setup from '../components/Setup'
import { v4 as uuidv4 } from 'uuid';
import PlayerPanel from '../components/PlayerPanel';
import { useTranslation } from 'react-i18next';
import Play from '../components/Play';
import Die from '../components/Die';
import falsyToZero from '../utils/falsyToZero';
import findDuplicates from '../utils/findDuplicates';
import isContainedIn from '../utils/isContainedIn';

function App() {

  const [games, setGames] = useState([])
  const [dice, setDice] = useState([])
  const [playerName, setPlayerName] = useState("")
  const [status, setStatus] = useState("setup")
  const {t, i18n } = useTranslation()
  const [currentGameId, setCurrentGameId] = useState(null)
  const [turn, setTurn] = useState(null)
  const values = []  
  function initTurn() {
    setTurn({
      rollsLeft: 3
    })
  }

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
  
  function handleRollDice() {
    setTurn(prevTurn => ({
      ...prevTurn,
      rollsLeft: prevTurn.rollsLeft - 1
    }))
    if (dice.length === 0) setDice(allNewDice())
    
    setDice(prevDice => prevDice.map(die => {
      const nextDie = newDie()
      values.push(nextDie.value)
      return die.hold ? die : nextDie
    }))
  }
  
  useEffect(() => calculateScore(), [dice])

  function calculateScore() {
    const calcResult = {
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
      chance: 0,
      yahtzee: null,
    }
    const values = dice.map(die => die.value)
    for (let value of values) {
      calcResult.chance = calcResult.chance + value
      switch (value) {
        case 1:  
          calcResult.ones = falsyToZero(calcResult.ones) + 1
          break
        case 2:  
          calcResult.twos = falsyToZero(calcResult.twos) + 2
          break
        case 3:  
          calcResult.threes = falsyToZero(calcResult.threes) + 3
          break
        case 4:  
          calcResult.fours = falsyToZero(calcResult.fours) + 4
          break
        case 5:  
          calcResult.fives = falsyToZero(calcResult.fives) + 5
          break
        case 6:  
          calcResult.sixes = falsyToZero(calcResult.sixes) + 6
          break
      }    
    }
    const duplicates = findDuplicates(values)
    if (duplicates.length === 0) return
    let isThreeOfAKind = false
    let isPair = false
    for (let duplicate of duplicates) {
      const arr = values.filter(value => value === duplicate)
      isPair = (arr.length === 2)
      if (arr.length >= 3) {
        isThreeOfAKind = true
        calcResult.threeOfAKind = duplicate * 3
      }
      if (isPair && isThreeOfAKind) {
        calcResult.fullHouse = 25
      }
      if (arr.length >= 4) {
        calcResult.fourOfAKind = duplicate * 4
      }
      if (arr.length === 5) {
        calcResult.yahtzee = 50
      }
      //TODO: fix straits
      // small straight: 1,2,3,4 | 2,3,4,5 | 3,4,5,6
      if (isContainedIn([1,2,3,4], values) || isContainedIn([2,3,4,5], values) || isContainedIn([3,4,5,6], values)) {
        calcResult.smallStraight = 30
      }
      // large straight: 1,2,3,4,5 | 2,3,4,5,6
      if (isContainedIn([1,2,3,4,5], values) || isContainedIn([2,3,4,5,6], values)) {
        calcResult.largeStraight = 40
      }
    }
    setTurn(prev => ({
      rollsLeft: prev.rollsLeft,
      ...calcResult
    }))
  }
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      if (die.id===id) 
        return {...die, hold: !die.hold} 
      else return die
    }))
  }

  function releaseAllDice() {
    setDice(prevDice => prevDice.map(die => ({
      ...die,
      hold: false
    })))    
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
      initTurn()
      setStatus("playing") 
    } else {
      //TODO: Message mehr Spieler benötigt
    }
  }

  function handleNextTurn(){
    initTurn();
    releaseAllDice(); 
    for (let i = 0; i < games.length; i++) {
      if (i === games.length - 1) {
        setCurrentGameId(games[0].id)
        return
      }
      if (games[i].id === currentGameId) {
        setCurrentGameId(games[i+1].id)
        return
      }
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
          turn={turn}
          handleFigureClick={ e => handleFigureClick(e) }
          handleRollDice={handleRollDice}
          handleNextTurn={handleNextTurn}
        />}
      </div>
    </>
  )
}

export default App