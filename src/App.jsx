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
import End from '../components/End';
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
  useEffect(() => checkGameEnd(), [games])

  function isGameEnd() {
    for (let game of games) {
      if (Object.values(game).includes(null)) return false
    }
    return true
  }

  function checkGameEnd() {
    if (status === "playing" && isGameEnd()) setStatus("end")
  }

  function calculateScore() {
    if (turn === null || turn.rollsLeft === 3) return
    
    //TODO: make this more dry
    const [currentGame] = games.filter(game => game.id === currentGameId)
    
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
      chance: null,
      yahtzee: null
    }
    
    const values = dice.map(die => die.value)

    if (currentGame.ones === null) calcResult.ones = 0
    if (currentGame.twos === null) calcResult.twos = 0
    if (currentGame.threes === null) calcResult.threes = 0
    if (currentGame.fours === null) calcResult.fours = 0
    if (currentGame.fives === null) calcResult.fives = 0
    if (currentGame.sixes === null) calcResult.sixes = 0
    
    for (let value of values) {
      if (currentGame.chance === null) calcResult.chance = calcResult.chance + value
      switch (value) {
        case 1:  
          if (currentGame.ones === null) calcResult.ones = falsyToZero(calcResult.ones) + 1
          break
        case 2:  
          if (currentGame.twos === null) calcResult.twos = falsyToZero(calcResult.twos) + 2
          break
        case 3:  
          if (currentGame.threes === null) calcResult.threes = falsyToZero(calcResult.threes) + 3
          break
        case 4:  
          if (currentGame.fours === null) calcResult.fours = falsyToZero(calcResult.fours) + 4
          break
        case 5:  
          if (currentGame.fives === null) calcResult.fives = falsyToZero(calcResult.fives) + 5
          break
        case 6:  
          if (currentGame.sixes === null) calcResult.sixes = falsyToZero(calcResult.sixes) + 6
          break
      }    
    }
    const duplicates = findDuplicates(values)
    let isThreeOfAKind = false
    let isPair = false
    
    if (currentGame.threeOfAKind === null) calcResult.threeOfAKind = 0
    if (currentGame.fourOfAKind === null) calcResult.fourOfAKind = 0
    
    for (let duplicate of duplicates) {
      const arr = values.filter(value => value === duplicate)
      if (arr.length === 2) isPair = true
      if (arr.length >= 3) {
        isThreeOfAKind = true
        if (currentGame.threeOfAKind === null) calcResult.threeOfAKind = duplicate * 3
      }

      if (arr.length >= 4 && currentGame.fourOfAKind === null) {
        calcResult.fourOfAKind = duplicate * 4
      }
      if (currentGame.yahtzee === null) {
        calcResult.yahtzee = 0
        if (arr.length === 5) {
          calcResult.yahtzee = 50
        }  
      }
    }
    if (currentGame.fullHouse === null) {
      calcResult.fullHouse = 0
      if (isPair && isThreeOfAKind ) {
       calcResult.fullHouse = 25
      }
    }

    if (currentGame.smallStraight === null) {
      calcResult.smallStraight = 0
      if (isContainedIn(values, [1,2,3,4]) || isContainedIn(values, [2,3,4,5]) || isContainedIn(values, [3,4,5,6])) {
        calcResult.smallStraight = 30
      }
    }

    if (currentGame.largeStraight === null) {
      calcResult.largeStraight = 0
      if (isContainedIn(values, [1,2,3,4,5]) || isContainedIn(values, [2,3,4,5,6])) {
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
      //test
      setGames(prev => prev.map(game => ({
        playerName: game.playerName,
        id: game.id,
        ones: null,
      twos: 8,
      threes: 15,
      fours: 20,
      fives: 25,
      sixes: 30,
      threeOfAKind: 0,
      fourOfAKind: 17,
      fullHouse: 25,
      smallStraight: 30,
      largeStraight: 40,
      chance: 25,
      yahtzee: 50
      })))
    } else {
      //TODO: Message mehr Spieler benötigt
    }
  }

  function handleNextTurn(){
    if (turn.hasOwnProperty('ones')) return
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
    if (e.target.innerHTML==="") return
    setGames(prev => prev.map(game => {
      if (game.id === currentGameId)
        return {...game, [e.target.dataset.target]: Number(e.target.innerHTML)}
      else return game 
    }))
    setTurn({
      rollsLeft: 0
    })
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
          games={games}
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
        {status === "end" && <End
          games={games}
        />}
      </div>
    </>
  )
}

export default App