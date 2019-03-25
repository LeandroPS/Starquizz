import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import { shallow, mount } from 'enzyme';
import Card from './';

describe('Card', () => {
    const props = {
        character: {
            species: [],
            name: 'Luke Skywalker',
            height: 123,
            homeworld: 'earth',
            films: [],
            vehicles: []
        },  
        guessed: false,
        getResource: jest.fn(),
        includeGuessedCharacter: jest.fn(),
        addPoints: jest.fn()
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Card {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = create(<Card {...props}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('open details window when clicked help button', () => {
        const component = mount(<Card {...props}/>);
        const button = component.find(".thumb button")
        button.simulate("click");
        
        expect(component.find("div.character-window").length).toBe(1);
    });

    it('call includeGuessedCharacter on right answer', () => {
        const component = shallow(<Card {...props}/>);
        const input  = component.find(".answer input");
        input.simulate('change', { target: { value: 'Luke Skywalker' } });
        component.find(".answer button").simulate("click");
        expect(props.includeGuessedCharacter).toHaveBeenCalled();
    });

});

