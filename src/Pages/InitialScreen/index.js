import React, {Component} from 'react'

import '../../styles/common.scss';
import './styles.scss';

class Initialscreen extends Component{

    render(){
        const {start} = this.props;

        return(
            <div className="initial-screen">
                <div className="centered">
                    <img 
                        className="darth-head"
                        src={require('../../assets/darth.png')}
                        alt="A cabeça do Darth Vader"/>
                    <h1>Star Wars quizz</h1>
                    <button 
                        className="button start-button" 
                        onClick={()=>start()}>
                        START
                    </button>
                </div>
            </div>
        );
    }
}

export default Initialscreen;