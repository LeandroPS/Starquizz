import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CharacterWindow from '../CharacterWindow';
import axios from 'axios';

import './styles.scss';

class Card extends Component{

    constructor(){
        super();

        this.state = {
            showAnwerField: false,
            showCharacterWindow: false,
            usedHelp: false,
            value: "",
            image: null
        }
    }

    componentDidMount(){
        this.getImage(this.props.character.name);
    }

    componentDidUpdate(prevProps){
        if(prevProps.character.name !== this.props.character.name) this.getImage(this.props.character.name);
    }

    getImage = (term) =>{
        let APIKey = "AIzaSyCJndh_Z04YbVnhZ3s6TA0QcVzQ5RX_PQY",
            CustomSearchID = "010694824975899644089:m6l68ukm8ma",
            base_url = "https://www.googleapis.com/customsearch/v1";

        axios.get(base_url,{
            params:{
                key: APIKey,
                cx: CustomSearchID,
                searchType: 'image',
                q: term
            }
         })
            .then((response)=>{
                this.setState({image: response.data.items[0].link});
            });
    }

    onChange = (value) => {
        this.setState({ value });
    }

    onGetHelp = () => {
        this.setState({usedHelp: true, showCharacterWindow: true});
    }

    onCloseHelpModal = () => {
        this.setState({showCharacterWindow: false});
    }

    onAnswer = (answer) => {
        const {character: {name}} = this.props;

        if(answer === name) this.onRightAnswer();
    }

    onRightAnswer = () => {
        const {usedHelp} = this.state;

        this.props.includeGuessedCharacter(this.props.character.name);
        this.props.addPoints(usedHelp?5:10);
    }

    render(){

        const {showAnwerField, showCharacterWindow, value} = this.state;
        const {character, guessed, getResource} = this.props;

        return(
            <React.Fragment>
                <div className={`card ${guessed&&'guessed'}`}>
                    <div className="thumb" style={{backgroundImage: `url(${this.state.image})`}}>
                        {!guessed&&(
                            <button onClick={()=>this.onGetHelp()}>
                                <i className="fas fa-question"></i>
                            </button>
                        )}
        
                    </div>
                    <div className={`answer ${showAnwerField&&"show"}`}>
                        <input 
                            type="text" 
                            placeholder="Resposta"
                            value={value}
                            onChange={(e)=>this.onChange(e.target.value)}
                            disabled={guessed}/>
                        {!guessed&&(
                            <button
                                onClick={()=>this.onAnswer(value)}>
                                Ok
                            </button>
                        )}
                    </div>
                </div>
                {showCharacterWindow&&
                    (<CharacterWindow 
                        character={{...character, ...{image: this.state.image}}}
                        onClose={this.onCloseHelpModal}
                        getResource={getResource}/>)
                }
            </React.Fragment>
        )
    }
}

Card.propTypes = {
    character: PropTypes.object.isRequired, 
    guessed: PropTypes.bool.isRequired, 
    getResource: PropTypes.func.isRequired,
    includeGuessedCharacter: PropTypes.func.isRequired,
    addPoints: PropTypes.func.isRequired
};

export default Card;