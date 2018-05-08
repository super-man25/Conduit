import React from 'react';
import { Tabbable } from '_components';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Tabbable>
        {(selectedTab) => (
          <div>
            {selectedTab === 0 && <span>I am tab number 0</span>}
            {selectedTab === 1 && <span>I am tab number 1</span>}
          </div>
        )}
      </Tabbable>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders different content when selectedTab is changed', () => {
  const wrapper = mount(
    <Tabbable>
      {(selectedTab, setSelectedTab) => (
        <div>
          <button onClick={() => setSelectedTab(0)} />
          <button onClick={() => setSelectedTab(1)} />
          {selectedTab === 0 && <span>I am tab number 0</span>}
          {selectedTab === 1 && <span>I am tab number 1</span>}
        </div>
      )}
    </Tabbable>
  );

  expect(
    wrapper
      .find('span')
      .at(0)
      .text()
  ).toEqual('I am tab number 0');

  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  expect(
    wrapper
      .find('span')
      .at(0)
      .text()
  ).toEqual('I am tab number 1');
});
