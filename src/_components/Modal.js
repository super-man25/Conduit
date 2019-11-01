// @flow
import React, { useEffect, useRef } from 'react';
import type { Node } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import { cssConstants } from '_constants';
import { useClickAway } from '_hooks';

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -20%);
  }
  100% {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  background-color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  z-index: 9;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.25);
  animation: ${slideUp} 200ms ease-out;
  animation-fill-mode: forwards;
`;

type PortalProps = {
  children: Node
};

const modalRoot: ?HTMLElement = document.getElementById('modal-root');
const element = document.createElement('div');

const Portal = ({ children }: PortalProps) => {
  useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(element);
    }

    return function() {
      if (modalRoot) {
        modalRoot.removeChild(element);
      }
    };
  }, []);

  return ReactDOM.createPortal(children, element);
};

type Props = {
  children: Node,
  closeModal: () => void
};

export const Modal = ({ children, closeModal }: Props) => {
  const modalRef = useRef();

  useClickAway({
    ref: modalRef,
    handleClickAway: closeModal
  });

  return (
    <Portal>
      <ModalOverlay />
      <ModalContent ref={modalRef}>{children}</ModalContent>
    </Portal>
  );
};
