import React from "react";
import style from "./Play.module.css"


export default class Play extends React.Component {
    render() {
        const {
            games, 
            currentGameId,
            t,
            calcObject,
            rollDice,
            dieElements
        } = this.props
        return(
            <>
                <div className={style.play}>
                    <div className={style.playerContainer}>
                        {
                            games.map(game => 
                                <div key={game.id} className={`${style.player} ${game.id === currentGameId && style.active}`}>{game.playerName}</div>
                        )}
                    </div>                   
                    {
                        this.props.games.map(game => {
                            if (game.id === currentGameId) {
                                return(
                                    <div className="container">
                                        <div className={style.sheet}>
                                            <div className={style.figure}><div className={style.col1}>{t('play_ones')}</div><div className={style.col2}>{t('play_onesLabel')}</div><div className={style.col1}>{game.ones}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_twos')}</div><div className={style.col2}>{t('play_twosLabel')}</div><div className={style.col1}>{game.twos}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_threes')}</div><div className={style.col2}>{t('play_threesLabel')}</div><div className={style.col1}>{game.threes}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_fours')}</div><div className={style.col2}>{t('play_foursLabel')}</div><div className={style.col1}>{game.fours}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_fives')}</div><div className={style.col2}>{t('play_fivesLabel')}</div><div className={style.col1}>{game.fives}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_sixes')}</div><div className={style.col2}>{t('play_sixesLabel')}</div><div className={style.col1}>{game.sixes}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_total')}</div><div className={style.col2}></div><div className={style.col1}>DUMMY</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_bonus')}</div><div className={style.col2}>{t('play_bonusLabel')}</div><div className={style.col1}>DUMMY</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_totalUpper')}</div><div className={style.col2}></div><div className={style.col1}>DUMMY</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_threeOfAKind')}</div><div className={style.col2}>{t('play_threeOfAKindLabel')}</div><div className={style.col1}>{game.threeOfAKind}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_fourOfAKind')}</div><div className={style.col2}>{t('play_fourOfAKindLabel')}</div><div className={style.col1}>{game.fourOfAKind}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_fullHouse')}</div><div className={style.col2}>{t('play_fullHouseLabel')}</div><div className={style.col1}>{game.fullHouse}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_smallStraight')}</div><div className={style.col2}>{t('play_smallStraightLabel')}</div><div className={style.col1}>{game.smallStraight}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_largeStraight')}</div><div className={style.col2}>{t('play_largeStraightLabel')}</div><div className={style.col1}>{game.largeStraight}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_yahtzee')}</div><div className={style.col2}>{t('play_yahtzeeLabel')}</div><div className={style.col1}>{game.yahtzee}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_chance')}</div><div className={style.col2}>{t('play_chanceLabel')}</div><div className={style.col1}>{game.chance}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_totalLower')}</div><div className={style.col2}></div><div className={style.col1}>{game.totalLower}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_totalUpper')}</div><div className={style.col2}></div><div className={style.col1}>{game.totalUpper}</div></div>
                                            <div className={style.figure}><div className={style.col1}>{t('play_grandTotal')}</div><div className={style.col2}></div><div className={style.col1}>{game.grandTotal}</div></div>
                                        </div>
                                        <div className={style.dice}>
                                            {dieElements}
                                        </div>
                                        <div>
                                            <button className="btn-outline" onClick={rollDice}>{t('play_rollDice')}</button>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </>
        )
    }
}