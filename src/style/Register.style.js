// Core
import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  padding: 2%;
  margin: 0 auto;
  margin-top: 2em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: box-shadow 0.3s ease;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-1px);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  margin-right: 10px;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input, select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const FormButton = styled.button`
  margin-top: 8px;
  padding: 10px;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 10%;

  &:hover {
    background-color: green;
  }
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SaveButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #013220;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkgreen;
  }
`;
