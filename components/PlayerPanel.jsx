import React from 'react';
import styles from './PlayerPanel.module.css';

export default class PlayerPanel extends React.Component {
    render() {
        return <div className={styles["setup__player-panel"]}>{this.props.playerName}
        <span data-id={this.props.id} onClick={this.props.handlePlayerRemove}>X</span></div>
    }
}