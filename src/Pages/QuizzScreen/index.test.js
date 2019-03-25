import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import { shallow, mount } from "enzyme";
import QuizzScreen from './';

describe('Quizz Screen', () => {
    const props = {
        characters: [
            {name: 'Luke Skywalker'},
            {name: 'Darth Vader'}
        ],
        guessedCharacters: [],
        onNextPage: ()=>{},
        onPreviousPage: ()=>{},
        getResource: ()=>{}
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<QuizzScreen {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = create(<QuizzScreen {...props}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows cards', () => {
        const component = mount(<QuizzScreen {...props}/>);

        expect(component.find(".cards-wrapper .card").length).toEqual(2);
    });

});
