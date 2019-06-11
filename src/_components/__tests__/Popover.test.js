import * as React from 'react';
import renderer from 'react-test-renderer';
import { Popover } from '_components';

describe('Popover', () => {
  it('renders with placement top', () => {
    const component = (
      <Popover isOpen placement="top" target={<button>click me</button>}>
        <div>This is a popover</div>
      </Popover>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with placement bottom', () => {
    const component = (
      <Popover isOpen placement="bottom" target={<button>click me</button>}>
        <div>This is a popover</div>
      </Popover>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with placement left', () => {
    const component = (
      <Popover isOpen placement="left" target={<button>click me</button>}>
        <div>This is a popover</div>
      </Popover>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with placement right', () => {
    const component = (
      <Popover isOpen placement="right" target={<button>click me</button>}>
        <div>This is a popover</div>
      </Popover>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with secondary theme', () => {
    const component = (
      <Popover isOpen theme="secondary" target={<button>click me</button>}>
        <div>This is a popover</div>
      </Popover>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with text align right', () => {
    const component = (
      <Popover isOpen align="right" target={<button>click me</button>}>
        <div>This is a popover</div>
      </Popover>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with caret hidden', () => {
    const component = (
      <Popover isOpen hideCaret target={<button>click me</button>}>
        <div>This is a popover</div>
      </Popover>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
