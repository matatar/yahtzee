import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: "Yahtzee",
      setup_player: "Player",
      setup_playerAdd: "Add new player",
      setup_startGame: "Start game",
      play_ones: "Ace",
      play_onesLabel: "Count and add only Aces",
      play_twos: "Twos",
      play_twosLabel: "Count and add only Twos",
      play_threes: "Threes",
      play_threesLabel: "Count and add only Threes",
      play_fours: "Fours",
      play_foursLabel: "Count and add only Fours",
      play_fives: "Fives",
      play_fivesLabel: "Count and add only Fives",
      play_sixes: "Sixes",
      play_sixesLabel: "Count and add only Sixes",
      play_total: "Total Score",
      play_bonus: "Bonus if Total Score is 63 or over",
      play_bonusLabel: "Score 35",
      play_threeOfAKind: "Three of a Kind",
      play_threeOfAKindLabel: "Add total of all dice",
      play_fourOfAKind: "Four of a Kind",
      play_fourOfAKindLabel: "Add total of all dice",
      play_fullHouse: "Full House",
      play_fullHouseLabel: "Score 25",
      play_smallStraight: "Small Straight",
      play_smallStraightLabel: "Score 30",
      play_largeStraight: "Large Straight",
      play_largeStraightLabel: "Score 40",
      play_yahtzee: "Yahtzee",
      play_yahtzeeLabel: "Score 50",
      play_chance: "Chance",
      play_chanceLabel: "Score total of all 5 dice",
      play_yahtzeeBonus: "Yahtzee Bonus",
      play_totalUpper: "Total of Upper Section",
      play_totalLower: "Total of Lower Section",
      play_grandTotal: "Grand Total",
      play_rollDice: "Roll Dice",
      play_rollsLeft: "Rolls Left",
      play_nextTurn: "Next Turn",
      play_add: "Add "
    },
  },
  de: {
    translation: {
      header: "Kniffel",
      setup_player: "Spieler",
      setup_playerAdd: "Neuen Spieler hinzufügen",
      setup_startGame: "Spiel starten",
      play_ones: "Einsen",
      play_onesLabel: "Nur Einser zählen",
      play_twos: "Zweien",
      play_twosLabel: "Nur Zweier zählen",
      play_threes: "Dreien",
      play_threesLabel: "Nur Dreier zählen",
      play_fours: "Vieren",
      play_foursLabel: "Nur Vierer zählen",
      play_fives: "Fünfen",
      play_fivesLabel: "Nur Fünfer zählen",
      play_sixes: "Sechsen",
      play_sixesLabel: "Nur Sechser zählen",
      play_total: "Gesamt",
      play_bonus: "Bonus bei 63 oder mehr",
      play_bonusLabel: "plus 35",
      play_threeOfAKind: "Dreierpasch",
      play_threeOfAKindLabel: "Alle Augen zählen",
      play_fourOfAKind: "Viererpasch",
      play_fourOfAKindLabel: "Alle Augen zählen",
      play_fullHouse: "Full-House",
      play_fullHouseLabel: "25 Punkte",
      play_smallStraight: "Kleine Straße",
      play_smallStraightLabel: "30 Punkte",
      play_largeStraight: "Große Straße",
      play_largeStraightLabel: "40 Punkte",
      play_yahtzee: "Kniffel",
      play_yahtzeeLabel: "50 Punkte",
      play_chance: "Chance",
      play_chanceLabel: "Alle Augen zählen",
      play_yahtzeeBonus: "Yahtzee Bonus",
      play_totalUpper: "gesamter oberer Teil",
      play_totalLower: "gesamter unterer Teil",
      play_grandTotal: "Endsumme",
      play_rollDice: "Würfeln",
      play_nextTurn: "nächster Spieler",
      play_rollsLeft: "Würfe übrig",
      play_add: "plus "
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "de", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
