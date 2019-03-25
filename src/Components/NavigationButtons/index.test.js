import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import NavigationButtons from './';

describe('Navigation Buttons', () => {

    const props = {
        onNextPage: jest.fn(),
        onPreviousPage: jest.fn()
    }

    it('renders correctly', () => {
        const tree = create(<NavigationButtons {...props}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('executes onNext function when click on next button', () => {
        const component = shallow(<NavigationButtons {...props}/>);
        const button = component.find('button').last();
        button.simulate('click');

        expect(props.onNextPage).toHaveBeenCalled();
    });

    it('executes onPrevious function when click on Previous button', () => {
        const component = shallow(<NavigationButtons {...props}/>);
        const button = component.find('button').first();
        button.simulate('click');

        expect(props.onPreviousPage).toHaveBeenCalled();
    });

});
