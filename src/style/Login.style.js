// Core
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  width: 600px;
  margin: 0 auto;
  margin-top: 5em;
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

export const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  text-align: center;
  position: relative;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 15px;
  color: black;
`;

export const FormInput = styled.input`
  width: 110%;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
  }
`;

export const FormButton = styled.button`
  width: 110%;
  padding: 12px;
  background-color: transparent;
  color: #FF6533;
  border: 2px solid #FF6533;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #FF6533;
    color: #fff;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
  font-size: 14px;
`;

export const SuccessMessage = styled.h3`
  color: green;
  font-size: 15px;
  font-weight: bold;
  margin: 0 auto;
  width: 90%;
  margin-top: 1em;
`;