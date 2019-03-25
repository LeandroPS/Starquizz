import React , {Component} from 'react'
import PropTypes from 'prop-types';

import './styles.scss';
import '../../styles/common.scss';

class FeedbackWindow extends Component{
    constructor(){
        super();
        this.state = {
            user:{ 
                name: "",
                email: "",
                points: ""
            },
            showMessage: false
        }
    }

    componentDidMount(){
        this.setState({points: this.props.points});
    }

    saveUserOnLocalStorage = (user) =>{
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    handleChange = (field, value) =>{
        let user = this.state.user;
        user[field] = value;
        this.setState({user});
    }

    onSubmitUserForm = (e) =>{
        e.preventDefault();
        this.saveUserOnLocalStorage(this.state.user);
        this.setState({showMessage: true});
    }

    render(){
        const {points, show} = this.props;
        const {showMessage} = this.state;

        return(
            <div className={`feedback-window ${show&&'show'}`}>
                <div className="centered">
                    <h1>Quizz finalizado</h1>
                    <div className="points">
                        <span  className="title">
                            você fez
                        </span>
                        <span  className="points">
                            {points} Pontos!
                        </span>
                    </div>
                    <form onSubmit={this.onSubmitUserForm}>
                        <span>Preencha este formulário pra salvar a sua pontuação:</span>
                        <input 
                            type="text" 
                            className="name"
                            onChange={(e)=>this.handleChange('name', e.target.value)} 
                            placeholder="Nome" 
                            required/>
                        <input 
                            type="email" 
                            className="email"
                            onChange={(e)=>this.handleChange('email', e.target.value)} 
                            placeholder="E-mail" 
                            required/>
                        {showMessage&&<span className="message">Você salvou suas informações com sucesso</span>}
                        <button className="button">Salvar</button>
                    </form>
                </div>
            </div>
        );
    }
}

FeedbackWindow.propTypes = {
    points: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired
};

export default FeedbackWindow;