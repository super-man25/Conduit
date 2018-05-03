import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { SiteHeaderPresenter, UserWelcome } from '_components/';

const authState = { model: { id: 1, firstName: 'root', lastName: 'root' } };

describe('<SiteHeaderPresenter />', () => {
  it('SiteHeaderPresenter renders correctly with no props', () => {
    const tree = renderer
      .create(<SiteHeaderPresenter authState={authState} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('renders SiteHeaderPresenter with authState prop from store.auth', () => {
    // Stubbing out store. Would normally use a helper method. Did it inline for simplicity.
    const store = {
      getState: () => ({
        auth: authState
      }),
      dispatch: () => {},
      subscribe: () => {}
    };
    // const wrapper = shallow(<SiteHeaderPresenter store={store} />);
    // const authStateProp = wrapper.prop('authState');
    // expect(authStateProp).toBe(authState);

    const subject = mount(<SiteHeaderPresenter store={store} />).find(
      UserWelcome
    );
    const userProp = subject.prop('user');
    expect(userProp).toBe(authState.model);
  });

  xit('clicking sprocket button fires handleSproketClick method', () => {
    const handleSprocketClickSpy = jest.spyOn(
      SiteHeaderPresenter.prototype,
      'handleSprocketClick'
    );
    const wrapper = mount(<SiteHeaderPresenter authState={authState} />);
    expect(
      SiteHeaderPresenter.prototype.handleSprocketClickSpy
    ).toHaveBeenCalledTimes(0);
    wrapper
      .find('#sprocket')
      .first()
      .simulate('click');
    expect(SiteHeaderPresenter.prototype.handleChange).toHaveBeenCalledTimes(1);
    handleSprocketClickSpy.mockClear();
  });

  // provide a history prop of an empty array
  // test that handleSprocketClick pushes '/settings' onto props.history
});
