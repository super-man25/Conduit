import { shallow } from 'enzyme';
import React from 'react';
import { IntegrationToggleAlertModal } from '../components/IntegrationToggleAlertModal';
import { SecondaryButton, PrimaryButton } from '_components';

describe('<IntegrationToggleAlertModal />', () => {
  const createProps = (overrides) => ({
    ...overrides,
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
    integration: { isActive: false }
  });

  it('should call onCancel when the cancel button is clicked', () => {
    const props = createProps();
    const wrapper = shallow(<IntegrationToggleAlertModal {...props} />);

    wrapper
      .find(SecondaryButton)
      .first()
      .simulate('click');

    expect(props.onCancel).toHaveBeenCalled();
  });

  it('should call onConfirm when the continue button is clicked', () => {
    const props = createProps();
    const wrapper = shallow(<IntegrationToggleAlertModal {...props} />);

    wrapper
      .find(PrimaryButton)
      .first()
      .simulate('click');

    expect(props.onConfirm).toHaveBeenCalled();
  });
});
