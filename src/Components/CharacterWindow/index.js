import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class CharacterWindow extends Component{

    constructor(){
        super();

        this.state = {
            show: false
        }
    }

    componentDidMount(){
        this.setState({show: true});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isMounted && !this.props.isMounted) {
          setTimeout(
            () => this.setState({ show: false }),
            300
          );
        } else if (!prevProps.isMounted && this.props.isMounted) {
          this.setState({ show: true });
        }
      }

    render(){
        const { character, onClose, getResource } = this.props;
        const { show } = this.state;

        return(
            <div className={`character-window ${show&&'show'}`}>
                <button className="close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="inner">
                    <div className="thumbnail" style={{backgroundImage: `url(${character.image})`}}>
    
                    </div>
                    <div className="details">
                        <h1>Details</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Specie:</th>
                                    <th>Height:</th>
                                    <th>Planet:</th>
                                    <th>Movies:</th>
                                    <th>Vehicles:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{character.species.map((planet, i)=>{
                                        return `${i===0?'':', '}${getResource(planet)}`;
                                    })}</td>
                                    <td>
                                        {character.height} cm
                                    </td>
                                    <td>
                                        {getResource(character.homeworld)};
                                    </td>
                                    <td>
                                        {character.films.map((film, i)=>{
                                            return `${i===0?'':', '}${getResource(film)}`;
                                        })}
                                    </td>
                                    <td>
                                        {character.vehicles.map((vehicle, i)=>{
                                            return `${i===0?'':', '}${getResource(vehicle)}`;
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

CharacterWindow.propTypes = {
    character: PropTypes.object.isRequired, 
    getResource: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CharacterWindow;
