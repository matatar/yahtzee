import React from "react";
import styles from "./LanguageSelect.module.css";

export default class LanguageSelect extends React.Component {
    render() {
        const { handleLanguageSelect } = this.props
        return (
                <div className={styles.languageSelect}>
                    <select name="language" onChange={handleLanguageSelect}>
                        <option value="de">De</option>
                        <option value="en">En</option>
                    </select>
                </div>
            )
    }
}