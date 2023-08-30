import React from "react";
import style from "./Play.module.css"
import falsyToZero from "../utils/falsyToZero";

export default class Play extends React.Component {
    render() {
        const {
            games, 
            currentGameId,
            t,
            turn,
            handleRollDice,
            dieElements,
            handleNextTurn,
            handleFigureClick
        } = this.props
        
        const [currentGame] = games.filter(game => game.id === currentGameId)
        const total = falsyToZero(currentGame.ones)
            + falsyToZero(currentGame.two)  + falsyToZero(currentGame.threes)
            + falsyToZero(currentGame.fours) + falsyToZero(currentGame.fives)
            + falsyToZero(currentGame.sixes)        
        const bonus = total >= 63  ? 35 : 0
        const totalUpper = total + bonus
        const totalLower = falsyToZero(currentGame.threeOfAKind) + falsyToZero(currentGame.fourOfAKind)
            + falsyToZero(currentGame.fullHouse) + falsyToZero(currentGame.smallStraight)
            + falsyToZero(currentGame.largeStraight) + falsyToZero(currentGame.yahtzee)
            + falsyToZero(currentGame.chance)
        const grandTotal = totalUpper + totalLower
        const classNameDice = `${style.dice} ${(turn.rollsLeft === 3 ) && style.invisible}`
        const classNameNextTurnButton = (turn.hasOwnProperty('ones')) ? 'btn-outline disabled' : 'btn-outline' 
        return(
            <>
                <div className={style.play}>
                    <div className={style.playerContainer}>
                        {
                            games.map(game => 
                                <div key={game.id} className={`${style.player} ${game.id === currentGameId && style.active}`}>{game.playerName}</div>
                        )}
                    </div>                    
                    
                    <div className="container">
                        <div className={style.sheet}>
                            <div className={style.figure}><div className={style.col1}>{t('play_ones')}</div><div className={style.col2}>{t('play_onesLabel')}</div><div className={style.col3}>{currentGame.ones}</div><div data-target="ones" onClick={handleFigureClick} title={(turn.ones != null) ? t('play_add') + turn.ones : '' } className={`${style.col3} ${style.highlighted}`}>{turn.ones}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_twos')}</div><div className={style.col2}>{t('play_twosLabel')}</div><div className={style.col3}>{currentGame.twos}</div><div data-target="twos" onClick={handleFigureClick} title={(turn.twos != null) ? t('play_add') + turn.twos : '' } className={`${style.col3} ${style.highlighted}`}>{turn.twos}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_threes')}</div><div className={style.col2}>{t('play_threesLabel')}</div><div className={style.col3}>{currentGame.threes}</div><div data-target="threes" onClick={handleFigureClick} title={(turn.threes != null) ? t('play_add') + turn.threes : '' } className={`${style.col3} ${style.highlighted}`}>{turn.threes}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fours')}</div><div className={style.col2}>{t('play_foursLabel')}</div><div className={style.col3}>{currentGame.fours}</div><div data-target="fours" onClick={handleFigureClick} title={(turn.fours != null) ? t('play_add') + turn.fours : '' } className={`${style.col3} ${style.highlighted}`}>{turn.fours}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fives')}</div><div className={style.col2}>{t('play_fivesLabel')}</div><div className={style.col3}>{currentGame.fives}</div><div data-target="fives" onClick={handleFigureClick} title={(turn.fives != null) ? t('play_add') + turn.fives : '' } className={`${style.col3} ${style.highlighted}`}>{turn.fives}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_sixes')}</div><div className={style.col2}>{t('play_sixesLabel')}</div><div className={style.col3}>{currentGame.sixes}</div><div data-target="sixes" onClick={handleFigureClick} title={(turn.sixes != null) ? t('play_add') + turn.sixes : '' } className={`${style.col3} ${style.highlighted}`}>{turn.sixes}</div></div>
                            <hr />
                            <div className={style.figure}><div className={style.col1}>{t('play_total')}</div><div className={style.col2}></div><div className={style.col3}>{total}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_bonus')}</div><div className={style.col2}>{t('play_bonusLabel')}</div><div className={style.col3}>{bonus}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_totalUpper')}</div><div className={style.col2}></div><div className={style.col3}>{totalUpper}</div></div>
                            <hr />
                            <div className={style.figure}><div className={style.col1}>{t('play_threeOfAKind')}</div><div className={style.col2}>{t('play_threeOfAKindLabel')}</div><div className={style.col3}>{currentGame.threeOfAKind}</div><div data-target="threeOfAKind" onClick={handleFigureClick} title={(turn.threeOfAKind != null) ? t('play_add') + turn.threeOfAKind : '' } className={`${style.col3} ${style.highlighted}`}>{turn.threeOfAKind}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fourOfAKind')}</div><div className={style.col2}>{t('play_fourOfAKindLabel')}</div><div className={style.col3}>{currentGame.fourOfAKind}</div><div data-target="fourOfAKind" onClick={handleFigureClick} title={(turn.fourOfAKind != null) ? t('play_add') + turn.fourOfAKind : '' } className={`${style.col3} ${style.highlighted}`}>{turn.fourOfAKind}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fullHouse')}</div><div className={style.col2}>{t('play_fullHouseLabel')}</div><div className={style.col3}>{currentGame.fullHouse}</div><div data-target="fullHouse" onClick={handleFigureClick} title={(turn.fullHouse != null) ? t('play_add') + turn.fullHouse : '' } className={`${style.col3} ${style.highlighted}`}>{turn.fullHouse}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_smallStraight')}</div><div className={style.col2}>{t('play_smallStraightLabel')}</div><div className={style.col3}>{currentGame.smallStraight}</div><div data-target="smallStraight" onClick={handleFigureClick} title={(turn.smallStraight != null) ? t('play_add') + turn.smallStraight : '' } className={`${style.col3} ${style.highlighted}`}>{turn.smallStraight}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_largeStraight')}</div><div className={style.col2}>{t('play_largeStraightLabel')}</div><div className={style.col3}>{currentGame.largeStraight}</div><div data-target="largeStraight" onClick={handleFigureClick} title={(turn.largeStraight != null) ? t('play_add') + turn.largeStraight : '' } className={`${style.col3} ${style.highlighted}`}>{turn.largeStraight}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_yahtzee')}</div><div className={style.col2}>{t('play_yahtzeeLabel')}</div><div className={style.col3}>{currentGame.yahtzee}</div><div data-target="yahtzee" onClick={handleFigureClick} title={(turn.yahtzee != null) ? t('play_add') + turn.yahtzee : '' } className={`${style.col3} ${style.highlighted}`}>{turn.yahtzee}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_chance')}</div><div className={style.col2}>{t('play_chanceLabel')}</div><div className={style.col3}>{currentGame.chance}</div><div data-target="chance" onClick={handleFigureClick} title={(turn.chance != null) ? t('play_add') + turn.chance : '' } className={`${style.col3} ${style.highlighted}`}>{turn.chance}</div></div>
                            <hr />
                            <div className={style.figure}><div className={style.col1}>{t('play_totalLower')}</div><div className={style.col2}></div><div className={style.col3}>{totalLower}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_totalUpper')}</div><div className={style.col2}></div><div className={style.col3}>{totalUpper}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_grandTotal')}</div><div className={style.col2}></div><div className={style.col3}>{grandTotal}</div></div>
                        </div>
                        <div>
                            <div className="container">
                                {turn.rollsLeft > 0 && <button className="btn-outline" onClick={handleRollDice}>{t('play_rollDice')}</button>}
                                {turn.rollsLeft === 0 && <button className={classNameNextTurnButton} onClick={handleNextTurn}>{t('play_nextTurn')}</button>}
                                <div>{t('play_rollsLeft')}: {turn.rollsLeft}</div>
                            </div>
                            <div className={classNameDice}>
                                {dieElements}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}