import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import InitialScreen from './';

describe('Initial screen', () => {
    const props = {
        onStart: jest.fn()
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<InitialScreen {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = create(<InitialScreen {...props}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('executes onStart function when clicking on start button', () => {
        const component = shallow(<InitialScreen {...props}/>);

        const button = component.find("button");
        button.simulate("click");

        expect(props.onStart).toHaveBeenCalled();

    });
});