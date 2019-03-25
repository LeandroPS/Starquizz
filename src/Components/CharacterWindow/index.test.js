import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import CharacterWindow from './';

describe('Character window', () => {
    const props = {
        character: {
            species: [],
            name: 'Luke Skywalker',
            height: 123,
            homeworld: 'earth',
            films: [],
            vehicles: []
        }, 
        getResource: ()=>{ return undefined},
        onClose: jest.fn()
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CharacterWindow {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = create(<CharacterWindow {...props}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('contain right info', () => {
        const component = shallow(<CharacterWindow {...props}/>);

        expect(component.find('table').text()).toContain('123 cm');
    });

    it('executes onClose function when click on close button', () => {
        const component = shallow(<CharacterWindow {...props}/>);
        component.find('button.close').simulate('click');
        expect(props.onClose).toHaveBeenCalled();
    });

});