import React from "react";
import styles from "./Die.module.css";

export default class Die extends React.Component {
    render() {
        const { value, holdDice, hold } = this.props;
        let img = ""
        let className = `${styles.die} ${hold && styles.hold}`;
        switch (value) {
            case 1:
                img = "dice-one.svg"
                break
            case 2:
                img = "dice-two.svg"
                break
            case 3:
                img = "dice-three.svg"
                break
            case 4:
                img = "dice-four.svg"
                break
            case 5:
                img = "dice-five.svg"
                break
            case 6:
                img = "dice-six.svg"
                break
        }
        return (
            <div className={className} onClick={holdDice}>
                <img src={'../src/assets/' + img} />
            </div>
        )
    }
}