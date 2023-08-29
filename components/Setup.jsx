import React from 'react';
import styles from './Setup.module.css';

export default class Setup extends React.Component {
    render() {
        const classNameStartButton = this.props.games.length < 2 ? 'btn-outline disabled' : 'btn-outline'
        return (
        <div className='container'>
            <div className={styles.setup}>
                <h2 className={styles.h2}>{this.props.t('setup_player')}</h2>
                {this.props.playerPanelElements}
            </div>
            <div className={styles.setup}>
                <form onSubmit={this.props.handlePlayerAdd}>
                    <input 
                        name="playerInput" 
                        className={styles["setup__player-input"]} 
                        onChange={this.props.handlePlayerNameChange}
                        value={this.props.playerName}
                        placeholder={this.props.t('setup_playerAdd')} 
                    />
                    <button className={`btn-outline ${styles.setupAddButton}`} type="submit"  >
                        <span>+</span>
                    </button>
                </form>
                <button className={classNameStartButton} onClick={this.props.handleStartButton}>{this.props.t('setup_startGame')}</button>
            </div>
        </div>
        )
    }
}

