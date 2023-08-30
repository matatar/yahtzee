import React from "react";
import styles from "./End.module.css";
import sumUpScore from "../utils/sumUpScore";
export default class End extends React.Component {
    render() {
        const {games} = this.props
        const result = []
        
        for (let game of games) {
            const [total, bonus, totalUpper, totalLower, grandTotal] = sumUpScore(game)
            result.push({
                id: game.id,
                playerName: game.playerName,
                grandTotal: grandTotal
            })
        }
        result.sort((a, b) => b.grandTotal - a.grandTotal)
        return <div className={styles.end}>
            {result.map((player, index) => <div key={player.id} className={styles.player}>
                <span>{index+1}.</span>
                <span>{player.playerName}</span>
                <span>{player.grandTotal}</span>
            </div>)}
        </div>
    }
}