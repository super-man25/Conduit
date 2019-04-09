// @flow
import React from 'react';
import {
  Flex,
  PrimaryButton,
  SecondaryButton,
  H4,
  Loader,
  NumberInputField
} from '_components';

import styled from 'styled-components';

const Row = styled.div`
  margin: 4px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 24px;
`;

const Label = styled.label`
  align-self: flex-start;
`;

const Text = styled.span`
  width: 60px;
  margin-left: 16px;
  display: inline-block;
  text-align: right;
  font-size: 1.125rem;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 60px;
  margin-left: 16px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #aaa;
`;

const Group = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  padding-top: 20px;

  > *:not(:first-child) {
    margin-left: 8px;
  }
`;

type FormValues = {
  eventScore?: number,
  eventScoreModifier?: number,
  spring?: number,
  springModifier?: number
};

type Props = {
  initialValues: FormValues,
  onChange?: (formValues: FormValues) => any,
  onSubmit: (
    formValues: FormValues,
    onSuccess: () => void,
    onError: () => void
  ) => any
};

type State = {
  values: FormValues,
  initialValues: FormValues,
  editing: boolean,
  submitting: boolean
};

const SPRING_DECIMALS = 2;
const SCORE_DECIMALS = 3;

function safeAdd(a: any, b: any, fix: number) {
  const aVal = +a;
  const bVal = +b;

  if (isNaN(aVal) || isNaN(bVal)) {
    return '--';
  }

  return (aVal + bVal).toFixed(fix);
}

function fixedOrDash(number: any, fix: number) {
  const numberVal = +number;

  if (isNaN(numberVal)) {
    return '--';
  }

  return numberVal.toFixed(fix);
}

export class PricingForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      values: props.initialValues,
      initialValues: props.initialValues,
      editing: false,
      submitting: false
    };
  }

  handleChange = (field: string, value: any) => {
    const oldValues = this.state.values;
    const values = { ...oldValues, [field]: value };

    this.setState({ values });
    if (this.props.onChange) {
      this.props.onChange(values);
    }
  };

  handleCancel = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.initialValues);
    }
    this.setState({
      values: this.state.initialValues,
      editing: false
    });
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleSuccess = () => {
    this.setState({
      submitting: false,
      editing: false,
      initialValues: this.state.values
    });
  };

  handleError = () => {
    this.setState({ submitting: false, editing: true });
  };

  handleSave = () => {
    this.setState({ submitting: true });
    this.props.onSubmit(
      this.state.values,
      this.handleSuccess,
      this.handleError
    );
  };

  render() {
    const { editing, submitting, values } = this.state;

    return (
      <>
        <Flex direction="row" justify="space-around">
          <Group>
            <H4
              style={{
                alignSelf: 'flex-start',
                padding: '0 4px',
                margin: '0',
                marginBottom: '12px'
              }}
            >
              Event Score
            </H4>
            <div style={{ maxWidth: '160px', paddingLeft: '20px' }}>
              <Row style={{ fontSize: '1.1rem' }}>
                <Label>Base:</Label>
                <Text>{fixedOrDash(values.eventScore, SCORE_DECIMALS)}</Text>
              </Row>
              <Row style={{ fontSize: '1.1rem' }}>
                <Label>Modifier:</Label>
                {editing ? (
                  <NumberInputField
                    component={Input}
                    value={values.eventScoreModifier}
                    onChange={(e) =>
                      this.handleChange('eventScoreModifier', e.target.value)
                    }
                  />
                ) : (
                  <Text>
                    {fixedOrDash(values.eventScoreModifier, SCORE_DECIMALS)}
                  </Text>
                )}
              </Row>
              <Line />
              <Row style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                <Label>Final:</Label>
                <Text>
                  {safeAdd(
                    values.eventScore,
                    values.eventScoreModifier,
                    SCORE_DECIMALS
                  )}
                </Text>
              </Row>
            </div>
          </Group>
          <Group>
            <H4
              style={{
                alignSelf: 'flex-start',
                padding: '0 4px',
                margin: '0',
                marginBottom: '12px'
              }}
            >
              Spring Value
            </H4>
            <div style={{ maxWidth: '160px', paddingLeft: '20px' }}>
              <Row style={{ fontSize: '1.1rem' }}>
                <Label>Base:</Label>
                <Text>{fixedOrDash(values.spring, SPRING_DECIMALS)}</Text>
              </Row>
              <Row style={{ fontSize: '1.1rem' }}>
                <Label>Modifier:</Label>
                {editing ? (
                  <NumberInputField
                    component={Input}
                    value={values.springModifier}
                    onChange={(e) =>
                      this.handleChange('springModifier', e.target.value)
                    }
                  />
                ) : (
                  <Text>
                    {fixedOrDash(values.springModifier, SPRING_DECIMALS)}
                  </Text>
                )}
              </Row>
              <Line />
              <Row style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                <Label>Final:</Label>
                <Text>
                  {safeAdd(
                    values.spring,
                    values.springModifier,
                    SPRING_DECIMALS
                  )}
                </Text>
              </Row>
            </div>
          </Group>
        </Flex>
        <ButtonGroup>
          {editing ? (
            <>
              <SecondaryButton onClick={this.handleCancel}>
                Cancel
              </SecondaryButton>
              <PrimaryButton disabled={submitting} onClick={this.handleSave}>
                {submitting ? <Loader small /> : 'Save'}
              </PrimaryButton>
            </>
          ) : (
            <SecondaryButton onClick={this.handleEdit}>Edit</SecondaryButton>
          )}
        </ButtonGroup>
      </>
    );
  }
}
