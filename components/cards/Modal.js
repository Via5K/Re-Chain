import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import useSession from '../hooks/useSession';

const Modal = ({ onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [Theme, setTheme] = useState({
    bg: 'black',
    font: 'white',
  });

  // create ref for the StyledModalWrapper component
  const modalWrapperRef = React.useRef();

  const { getItem } = useSession();

  // check if the user has clickedinside or outside the modal
  const backDropHandler = (e) => {
    if (!modalWrapperRef?.current?.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    let theme = { ...Theme };
    if (getItem('bg')) {
      theme.bg = getItem('bg');
      theme.font = getItem('font');
    }
    setTheme(theme);

    setIsBrowser(true);

    // attach event listener to the whole windor with our handler
    window.addEventListener('click', backDropHandler);

    // remove the event listener when the modal is closed
    return () => window.removeEventListener('click', backDropHandler);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const StyledModalBody = styled.div`
    padding-top: 10px;
    color: ${Theme.font};
    font-size: larger;
    font-weight: bolder;
    padding: 1rem;
    max-width: 100%;
  `;

  const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
    text-decoration: none;
  `;

  // the wrapper component
  const StyledModalWrapper = styled.div`
    width: 85%;  
    max-width: 500px;
    height: 500px;
    min-height: 500px;
    position: fixed;
    `;

  const StyledModal = styled.div`
    background: radial-gradient(
      circle,
      rgba(15, 152, 221, 1) 30%,
      rgba(19, 181, 210, 1) 68%,
      rgba(23, 205, 221, 1) 91%
    );
    background-color: rgba(0,0,0,0.1);
    min-height:40%;
    width:100%;
    border-radius: 1rem;
    padding: 15px;
    box-shadow: 0px 1px 14px 1px #aaa;
  `;

  const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  `;

  const modalContent = (
    <StyledModalOverlay>
      {/* Wrap the whole Modal inside the newly created StyledModalWrapper 
          and use the ref
      */}
      <StyledModalWrapper ref={modalWrapperRef}>
        <StyledModal>
          <StyledModalHeader>
            <a
              href="#"
              onClick={handleCloseClick}
              style={{ textDecoration: 'none' }}
            >
              🆗
            </a>
          </StyledModalHeader>
          {title && <StyledModalTitle>{title}</StyledModalTitle>}
          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    </StyledModalOverlay>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

export default Modal;
