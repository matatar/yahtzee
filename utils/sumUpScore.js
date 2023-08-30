import falsyToZero from "./falsyToZero";

export default function sumUpScore(game) {
    const total = falsyToZero(game.ones)
        + falsyToZero(game.two)  + falsyToZero(game.threes)
        + falsyToZero(game.fours) + falsyToZero(game.fives)
        + falsyToZero(game.sixes)        
    const bonus = total >= 63  ? 35 : 0
    const totalUpper = total + bonus
    const totalLower = falsyToZero(game.threeOfAKind) + falsyToZero(game.fourOfAKind)
        + falsyToZero(game.fullHouse) + falsyToZero(game.smallStraight)
        + falsyToZero(game.largeStraight) + falsyToZero(game.yahtzee)
        + falsyToZero(game.chance)
    const grandTotal = totalUpper + totalLower
    return [total, bonus, totalUpper, totalLower, grandTotal]
}