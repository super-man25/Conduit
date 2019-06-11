// @flow
import * as React from 'react';
import styled from 'styled-components';
import { zIndexes, cssConstants } from '_constants';
import { Manager, Reference, Popper } from 'react-popper';

const BACKGROUND = new Map()
  .set('primary', cssConstants.PRIMARY_BLUE)
  .set('secondary', cssConstants.PRIMARY_LIGHTER_GRAY);

const COLOR = new Map()
  .set('primary', cssConstants.PRIMARY_WHITE)
  .set('secondary', cssConstants.PRIMARY_BLUE);

const POPOVER_MAX_WIDTH = '200px';

type Props = {
  theme: 'primary' | 'secondary',
  children: React.Node,
  target: React.ElementType,
  placement: 'top' | 'right' | 'bottom' | 'left',
  style: {
    maxWidth?: string
  },
  isOpen: boolean,
  hideCaret: boolean
};

const PopperBox = styled.div.attrs((props) => {
  const backgroundColor = BACKGROUND.get(props.theme);
  const textColor = COLOR.get(props.theme);
  return { backgroundColor, textColor };
})`
  ${(props) => props.popperStyle};
  border-radius: 3px;
  max-width: ${(props) => props.maxWidth || POPOVER_MAX_WIDTH};
  min-height: 3rem;
  z-index: ${zIndexes.POPOVER};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  padding: 1rem;
  transition: all 0.1s ease-in;
`;

const Arrow = styled.div.attrs((props) => {
  const arrowColor = BACKGROUND.get(props.theme);
  return {
    arrowColor
  };
})`
  ${(props) => props.arrowStyle};
  position: absolute;

  /* Carets */
  &::before {
    position: absolute;
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
  }

  &[data-placement*='top'] {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1rem;
    margin-bottom: -0.9rem;

    &::before {
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      border-top: 0.5rem solid ${(props) => props.arrowColor};
    }
  }

  &[data-placement*='bottom'] {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1rem;
    margin-top: -0.4rem;

    &::before {
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      border-bottom: 0.5rem solid ${(props) => props.arrowColor};
    }
  }

  &[data-placement*='right'] {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 1rem;
    margin-left: -0.4rem;

    &::before {
      border-top: 0.5rem solid transparent;
      border-bottom: 0.5rem solid transparent;
      border-right: 0.5rem solid ${(props) => props.arrowColor};
    }
  }

  &[data-placement*='left'] {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 1rem;
    margin-right: 0.1rem;

    &::before {
      border-top: 0.5rem solid transparent;
      border-bottom: 0.5rem solid transparent;
      border-left: 0.5rem solid ${(props) => props.arrowColor};
    }
  }
`;

const ReferenceBox = styled.div`
  max-width: ${(props) => props.maxWidth || POPOVER_MAX_WIDTH};
`;

export const Popover = ({
  children,
  placement = 'top',
  target,
  theme = 'primary',
  style,
  isOpen,
  hideCaret,
  ...rest
}: Props) => {
  // Sample modifiers for react-popper behavior
  const modifiers = {
    //flip: { enabled: true }
    //preventOverflow: { enabled: false }
  };

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <ReferenceBox ref={ref} {...style}>
            {target}
          </ReferenceBox>
        )}
      </Reference>
      <Popper placement={placement} modifiers={modifiers} eventsEnabled={true}>
        {({ ref, style: popperStyle, arrowProps }) =>
          isOpen && (
            <PopperBox
              ref={ref}
              theme={theme}
              data-placement={placement}
              popperStyle={popperStyle}
              {...style}
            >
              {children}
              {!hideCaret && (
                <Arrow
                  ref={arrowProps.ref}
                  theme={theme}
                  arrowStyle={arrowProps.style}
                  data-placement={placement}
                />
              )}
            </PopperBox>
          )
        }
      </Popper>
    </Manager>
  );
};
