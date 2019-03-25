import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import { mount } from 'enzyme'; 
import FeedbackWindow from './';

describe('Feedback window', () => {
    const props = {
        points: 35,
        show: true
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FeedbackWindow {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = create(<FeedbackWindow {...props}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows correct points when passed', () => {
        const component = mount(<FeedbackWindow {...props} />);
        expect(component.find('span.points').text()).toContain('35');
    });

    it('checks if both fields are filled', () => {
        const component = mount(<FeedbackWindow {...props} />);
        const form = component.find('form');

        const spy = jest.spyOn(component.instance(), 'onSubmitUserForm');

        form.simulate('submit');

        expect(spy).not.toHaveBeenCalled();

    });

    it('calls onSubmit when both fields are filled', () => {
        const component = mount(<FeedbackWindow {...props} />);
        const nameInput = component.find('input.name');
        const emailInput = component.find('input.email');
        const form = component.find('form');

        const spy = jest.spyOn(component.instance(), 'onSubmitUserForm');

        nameInput.simulate('change', { target: { value: 'Leandro' } });
        emailInput.simulate('change', { target: { value: 'leandro.pires.souza@gmail.com' } });
        form.simulate('submit');

        expect(spy).toHaveBeenCalled();
    });

    it('show message when saved', () => {
        const component = mount(<FeedbackWindow {...props} />);
        const nameInput = component.find('input.name');
        const emailInput = component.find('input.email');
        const form = component.find('form');

        nameInput.simulate('change', { target: { value: 'Leandro' } });
        emailInput.simulate('change', { target: { value: 'leandro.pires.souza@gmail.com' } });
        form.simulate('submit');

        expect(component.find('span.message').length).toEqual(1);;
    });

});
