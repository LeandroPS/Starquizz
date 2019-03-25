import React, {Component} from 'react'
import PropTypes from 'prop-types';

import '../../styles/common.scss';
import './styles.scss';

class Initialscreen extends Component{

    render(){
        const {onStart} = this.props;

        return(
            <div className="initial-screen">
                <div className="centered">
                    <img 
                        className="darth-head"
                        src={require('../../assets/darth.png')}
                        alt="A cabeça do Darth Vader"/>
                    <h1>Star Wars quizz</h1>
                    <h2>Com esse quiz você terá oportunidade de identificar os principais personagens de Star- wars, marcar pontos e se tornar um expert nesta série de filmes maravilhosa!</h2>
                    <button 
                        className="button start-button" 
                        onClick={()=>onStart()}>
                        START
                    </button>
                </div>
            </div>
        );
    }
}

Initialscreen.propTypes = {
    onStart: PropTypes.func.isRequired
}

export default Initialscreen;