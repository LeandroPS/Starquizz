import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Timer extends Component{
    constructor(){
        super();

        this.state = {
            currentTime: null
        }
    }

    componentDidMount(){
        this.setState({currentTime: this.props.initial});

        this.countDown = setInterval(this.onDecrease, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.countDown);
    }

    onDecrease = ()=> {
        let {currentTime} = this.state;

        if(currentTime>1){
            currentTime--;
            this.setState({currentTime});
        }else{
            this.onTimeUp();
        }
    }

    onTimeUp = () => {
        clearInterval(this.countDown);
        this.props.onTimeUp();
    }

    formatTime = (totalSeconds) =>{
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds - minutes * 60;

        return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    }

    render(){
        const {currentTime} = this.state;

        return(
            <div className="timer">
                {this.formatTime(currentTime)}
            </div>
        );
    }
}

Timer.propTypes = {
    initial: PropTypes.number.isRequired
}

export default Timer;