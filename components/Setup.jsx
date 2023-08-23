import React from 'react';
import styles from './Setup.module.css';

export default class Setup extends React.Component {
    render() {
        return (
        <>
            <div className="setup">
                <h2 className={styles.h2}>{this.props.t('setup_player')}</h2>
                {this.props.playerPanelElements}
            </div>
            <div>
                <form onSubmit={this.props.handlePlayerAdd}>
                    <input 
                        name="playerInput" 
                        className={styles["setup__player-input"]} 
                        onChange={this.props.handlePlayerNameChange}
                        value={this.props.playerName}
                        placeholder={this.props.t('setup_playerAdd')} 
                    />
                    <button className="btn-outline" type="submit"  >
                        +
                    </button>
                </form>
                <button className="btn-outline" onClick={this.props.handleStartButton}>{this.props.t('setup_startGame')}</button>
            </div>
        </>
        )
    }
}

