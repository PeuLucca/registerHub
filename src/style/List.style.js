import styled from "styled-components";

export const ListContainer = styled.div`
  width: 90%;
  padding: 2%;
  margin: 0 auto;
  margin-top: 2em;
  margin-bottom: 1em;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: box-shadow 0.3s ease, background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    transform: translateY(-3px);
  }
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyledListItem = styled.li`
  margin-bottom: 20px;
`;

export const ItemContainer = styled.div`
  padding: 15px;
  border-radius: 8px;
  text-align: left;
`;

export const ActionsContainer = styled.div`
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  margin-right: 5px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  text-align: center;
`;

export const ModalMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;
