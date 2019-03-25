import React from 'react';
import PropTypes from 'prop-types';


import './styles.scss';

const NavigationButtons = ({onNextPage, onPreviousPage}) => {

    return(
        <div className="navigation-buttons">
            <button onClick={onPreviousPage}>
                Anterior
            </button>
            <button onClick={onNextPage}>
                Próximo
            </button>
        </div>
    );
}

NavigationButtons.propTypes = {
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired
}

export default NavigationButtons;