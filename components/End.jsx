import React from "react";

export default class End extends React.PureComponent {
    render() {
        const [games] = this.props
        const result = []
        for (let game of games) {
            let upperTotal = game.ones + game.twos + game.threes + game.fours + game.fives + game.sixes
            if ( upperTotal >= 63 ) upperTotal = upperTotal +35
            let grandTotal = upperTotal + game.threeOfAKind 
            + game.fourOfAKind + game.yahtzee + game.fullHouse + game.smallStraight + game.largeStraight
            result.push({
                playerName: game.playerName,
                grandTotal: grandTotal
            })
        }
        result.sort((a, b) => b.grandTotal - a.grandTotal)
        return <div className={styles.end}>
            {result.map(player => <div className={styles.player}><span>{player.playerName}</span><span>{player.grandTotal}</span></div>)}
        </div>
    }
}