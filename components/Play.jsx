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