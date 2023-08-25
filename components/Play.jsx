import React from "react";
import style from "./Play.module.css"


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
        } = this.props

        //TODO: export to utils
        const falsyToZero = (value) => {
            let result = Number(value);
            if(Number.isNaN(result)){
              result = 0;
            }
          
            return result;
          };
        
        const currentGame = games.filter(game => game.id === currentGameId)
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
                            <div className={style.figure}><div className={style.col1}>{t('play_ones')}</div><div className={style.col2}>{t('play_onesLabel')}</div><div className={style.col1}>{currentGame.ones}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_twos')}</div><div className={style.col2}>{t('play_twosLabel')}</div><div className={style.col1}>{currentGame.twos}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_threes')}</div><div className={style.col2}>{t('play_threesLabel')}</div><div className={style.col1}>{currentGame.threes}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fours')}</div><div className={style.col2}>{t('play_foursLabel')}</div><div className={style.col1}>{currentGame.fours}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fives')}</div><div className={style.col2}>{t('play_fivesLabel')}</div><div className={style.col1}>{currentGame.fives}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_sixes')}</div><div className={style.col2}>{t('play_sixesLabel')}</div><div className={style.col1}>{currentGame.sixes}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_total')}</div><div className={style.col2}></div><div className={style.col1}>{total}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_bonus')}</div><div className={style.col2}>{t('play_bonusLabel')}</div><div className={style.col1}>{bonus}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_totalUpper')}</div><div className={style.col2}></div><div className={style.col1}>{totalUpper}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_threeOfAKind')}</div><div className={style.col2}>{t('play_threeOfAKindLabel')}</div><div className={style.col1}>{currentGame.threeOfAKind}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fourOfAKind')}</div><div className={style.col2}>{t('play_fourOfAKindLabel')}</div><div className={style.col1}>{currentGame.fourOfAKind}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_fullHouse')}</div><div className={style.col2}>{t('play_fullHouseLabel')}</div><div className={style.col1}>{currentGame.fullHouse}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_smallStraight')}</div><div className={style.col2}>{t('play_smallStraightLabel')}</div><div className={style.col1}>{currentGame.smallStraight}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_largeStraight')}</div><div className={style.col2}>{t('play_largeStraightLabel')}</div><div className={style.col1}>{currentGame.largeStraight}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_yahtzee')}</div><div className={style.col2}>{t('play_yahtzeeLabel')}</div><div className={style.col1}>{currentGame.yahtzee}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_chance')}</div><div className={style.col2}>{t('play_chanceLabel')}</div><div className={style.col1}>{currentGame.chance}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_totalLower')}</div><div className={style.col2}></div><div className={style.col1}>{totalLower}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_totalUpper')}</div><div className={style.col2}></div><div className={style.col1}>{totalUpper}</div></div>
                            <div className={style.figure}><div className={style.col1}>{t('play_grandTotal')}</div><div className={style.col2}></div><div className={style.col1}>{grandTotal}</div></div>
                        </div>
                        <div className={classNameDice}>
                            {dieElements}
                        </div>
                        <div>
                            {turn.rollsLeft > 0 && <button className="btn-outline" onClick={handleRollDice}>{t('play_rollDice')}</button>}
                            {turn.rollsLeft === 0 && <button className="btn-outline" onClick={handleNextTurn}>{t('play_nextTurn')}</button>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}