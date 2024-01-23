// Core
import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  padding: 1%;
  margin: 0 auto;
  margin-top: 5em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: box-shadow 0.3s ease;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    transform: translateY(-3px);
  }
`;