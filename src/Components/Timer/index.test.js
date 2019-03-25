import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from "enzyme";
import { create } from "react-test-renderer";
import Timer from './';

describe('Timer', () => {
    const props = {
        initial: 10,
        onTimeUp: jest.fn()
    }

    jest.useFakeTimers();

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Timer {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = create(<Timer {...props}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls onTimeUp()', () => {
        const component = shallow(<Timer {...props}/>);
        expect(props.onTimeUp).not.toHaveBeenCalled();
        jest.runAllTimers();
        expect(props.onTimeUp).toHaveBeenCalled();
    });
});