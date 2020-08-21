import StyledModal from 'styled-react-modal';

const Modal = StyledModal.styled`
  padding: 2rem;
  
  opacity: 1;
  background: ${(props: any) => props.theme.colors.card};
  border-radius: ${(props: any) => props.theme.borderRadius};
  
  transition: opacity ease 500ms;
`;


export default Modal;