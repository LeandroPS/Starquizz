import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../../Components/Card';
import Timer from '../../Components/Timer';
import NavigationButtons from '../../Components/NavigationButtons';
import FeedbackWindow from '../../Components/FeedbackWindow';

import './styles.scss';
import '../../styles/common.scss';

class QuizzScreen extends Component{
    constructor(){
        super();

        this.state = {
            showFeedbackScreen: false,
            currentPage: 0,
            pointsCount: 0,
            guessedCharacters: []
        }
    }

    onTimeUp = () =>{
        this.setState({showFeedbackScreen: true});
    }

    includeGuessedCharacter = (characterName) =>{
        this.setState({guessedCharacters: [...this.state.guessedCharacters, characterName]})
    }

    addPoints = (points) =>{
        this.setState({pointsCount: this.state.pointsCount+points})
    }

    render(){
        const {characters, onNextPage, onPreviousPage, getResource} = this.props;
        const {guessedCharacters, pointsCount, showFeedbackScreen} = this.state;

        return(
            <React.Fragment>
                
                <div className="quizz-screen">
                    <div className="header">
                        <div className="container">
                            <img 
                                alt="Cabeça do Darth Vader" 
                                src={require('../../assets/darth.png')}/>

                            <Timer initial={120} onTimeUp={this.onTimeUp} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="cards-wrapper">
                            {characters.map((character, i) => {
                                return( 
                                    <Card 
                                        key={i}
                                        character={character} 
                                        guessed={guessedCharacters.indexOf(character.name)!==-1}
                                        includeGuessedCharacter={this.includeGuessedCharacter}
                                        addPoints={this.addPoints}
                                        getResource={getResource}/>);
                            })}    
                        </div>
                    </div>
                    <NavigationButtons onNextPage={onNextPage} onPreviousPage={onPreviousPage}/>
                    <FeedbackWindow points={pointsCount} show={showFeedbackScreen}/>
                </div>
            </React.Fragment>
        );
    }
}

QuizzScreen.propTypes = {
    characters: PropTypes.array.isRequired, 
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    getResource: PropTypes.func.isRequired
}

export default QuizzScreen;