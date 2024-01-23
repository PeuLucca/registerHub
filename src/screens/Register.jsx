// Core
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Style
import {
  Container,
  Form,
  FormGroup,
  FormRow,
  FormButton
} from "../style/Register.style";
import { FormLabel, ErrorMessage, SuccessMessage } from "../style/Login.style";

// Layout
import Add from "../layout/Add";
import Delete from "../layout/Delete";
import Save from "../layout/Save";
import Update from "../layout/Update";

// SelectOptions
import { estadosBrasil, tiposContato } from "../selectOptions"

// Firebase
import { database } from "../firebase";
import { ref, push, set, update } from 'firebase/database';

const Register = () => {
  const location = useLocation();
  const { state } = location;
  const [loading, setLoading] = useState(false);
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    cpf: '',
    rg: '',
  });
  const [enderecos, setEnderecos] = useState([{
    logradouro: '',
    numero: '',
    cep: '',
    complemento: '',
    cidade: '',
    estado: '',
  }]);
  const [contatos, setContatos] = useState([{
    nome: '',
    contato: '',
    tipoContato: '',
  }]);
  const [errors, setErrors] = useState({
    dadosPessoais: '',
    enderecos: '',
    contatos: '',
  });
  const [success, setSuccess] = useState('');

  // Handle functions
  const validateForm = () => {
    const newErrors = {
      dadosPessoais: '',
      enderecos: '',
      contatos: '',
    };
  
    // Validar dados pessoais
    for (const key in dadosPessoais) {
      if (dadosPessoais[key] === '') {
        newErrors.dadosPessoais = 'Preencha todos os campos de dados pessoais!';
        setErrors(newErrors);
      }
    }
  
    // Validar endereços
    for (const endereco of enderecos) {
      for (const key in endereco) {
        // Remova a validação para o campo 'complemento'
        if (key !== 'complemento' && endereco[key] === '') {
          newErrors.enderecos = 'Preencha todos os campos de endereços!';
          setErrors(newErrors);
        }
      }
    }
  
    // Validar contatos
    for (const contato of contatos) {
      for (const key in contato) {
        if (contato[key] === '') {
          newErrors.contatos = 'Preencha todos os campos de contatos!';
          setErrors(newErrors);
        }
      }
    }
  
    setErrors(newErrors);
  
    if(!newErrors.contatos && !newErrors.dadosPessoais && !newErrors.enderecos){
      if(state){ // edit
        updatePessoa();
      }else{ // new
        savePessoa();
      }
    }
  };

  const formatCpf = (cpfNumber) => {
    const cleaned = ('' + cpfNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cpfNumber;
  };

  const handleInputChange = (e, stateSetter, index, fieldName) => {
    const { value } = e.target;
    stateSetter((prev) => {
      const newState = [...prev];
      newState[index][fieldName] = value;
      return newState;
    });
  };

  const adicionarCampo = (stateSetter, campo) => {
    if(campo === "enderecos"){
      stateSetter((prev) => [...prev, {
        logradouro: '',
        numero: '',
        cep: '',
        complemento: '',
        cidade: '',
        estado: ''
      }]);
    }else{
      stateSetter((prev) => [...prev, {
        nome: '',
        contato: '',
        tipoContato: ''
      }]);
    }
  };

  const removerCampo = (stateSetter, index) => {
    stateSetter((prev) => prev.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setDadosPessoais({
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      email: '',
      cpf: '',
      rg: '',
    });

    setEnderecos([{
      logradouro: '',
      numero: '',
      cep: '',
      complemento: '',
      cidade: '',
      estado: '',
    }]);

    setContatos([{
      nome: '',
      contato: '',
      tipoContato: '',
    }]);
  };

  // Firebase
  const savePessoa = async () => {
    try{
      setLoading(true);

      const userId = localStorage.getItem("userId");
      const dataRef = ref(database, `pessoaInfo/${userId}`);
      const newPessoaRef = push(dataRef); // cria um identificador único
      const pessoaData = {
        pessoa: dadosPessoais,
        enderecos,
        contatos
      };

      await set(newPessoaRef, pessoaData);
      setSuccess("Pessoa cadastrada com sucesso");
      clearForm();
    }catch(e){
      console.error(e);
    }finally{
      setLoading(false);
    }
  };

  const updatePessoa = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");
      const dataRef = ref(database, `pessoaInfo/${userId}/${state.id}`);
      const updatedData = {
        pessoa: dadosPessoais,
        enderecos,
        contatos
      };

      await update(dataRef, updatedData);
      setSuccess("Pessoa atualizada com sucesso");
      clearForm();
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      const {
        pessoa: { nome, sobrenome, dataNascimento, email, cpf, rg },
        enderecos,
        contatos,
      } = state;

      setDadosPessoais({ nome, sobrenome, dataNascimento, email, cpf, rg });
      setEnderecos(enderecos);
      setContatos(contatos);
    }
  }, [state]);

  return (
    <div>
      <Form>
        <Container>
          {/* Dados Pessoais */}
          <div>
            <h3 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Dados Pessoais</h3>
            <FormRow>
              <FormGroup>
                <FormLabel>Nome:</FormLabel>
                <input
                  type="text"
                  name="name"
                  value={dadosPessoais.nome}
                  onChange={(e) => setDadosPessoais((prevDados) => ({ ...prevDados, nome: e.target.value }))}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Sobrenome:</FormLabel>
                <input
                  type="text"
                  name="lastname"
                  value={dadosPessoais.sobrenome}
                  onChange={(e) => setDadosPessoais((prevDados) => ({ ...prevDados, sobrenome: e.target.value }))}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Data de Nascimento:</FormLabel>
                <input
                  type="date"
                  name="date"
                  value={dadosPessoais.dataNascimento}
                  onChange={(e) => setDadosPessoais((prevDados) => ({ ...prevDados, dataNascimento: e.target.value }))}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>Email:</FormLabel>
                <input
                  type="email"
                  name="email"
                  value={dadosPessoais.email}
                  onChange={(e) => setDadosPessoais((prevDados) => ({ ...prevDados, email: e.target.value }))}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>CPF:</FormLabel>
                <input
                  type="text"
                  name="cpf"
                  value={dadosPessoais.cpf}
                  onChange={(e) => setDadosPessoais((prevDados) => ({ ...prevDados, cpf: formatCpf(e.target.value) }))}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>RG:</FormLabel>
                <input
                  type="text"
                  name="rg"
                  value={dadosPessoais.rg}
                  onChange={(e) => setDadosPessoais((prevDados) => ({ ...prevDados, rg: e.target.value }))}
                />
              </FormGroup>
            </FormRow>
          </div>
          {errors.dadosPessoais && <ErrorMessage>{errors.dadosPessoais}</ErrorMessage>}
        </Container>

        <Container>
          {/* Endereços */}
          <h3 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Endereços</h3>
          {enderecos.map((endereco, index) => (
            <div key={index}>
              <FormRow>
                <FormGroup>
                  <FormLabel>Logradouro:</FormLabel>
                  <input
                    type="text"
                    name="logradouro"
                    value={endereco.logradouro}
                    onChange={(e) => handleInputChange(e, setEnderecos, index, 'logradouro')}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Número:</FormLabel>
                  <input
                    type="number"
                    name="number"
                    value={endereco.numero}
                    onChange={(e) => handleInputChange(e, setEnderecos, index, 'numero')}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>CEP:</FormLabel>
                  <input
                    type="text"
                    name="cep"
                    value={endereco.cep}
                    onChange={(e) => handleInputChange(e, setEnderecos, index, 'cep')}
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <FormLabel>Complemento:</FormLabel>
                  <input
                    type="text"
                    name="complemento"
                    value={endereco.complemento}
                    onChange={(e) => handleInputChange(e, setEnderecos, index, 'complemento')}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Cidade:</FormLabel>
                  <input
                    type="text"
                    name="cidade"
                    value={endereco.cidade}
                    onChange={(e) => handleInputChange(e, setEnderecos, index, 'cidade')}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Estado:</FormLabel>
                  <select
                    name="estado"
                    value={endereco.estado}
                    onChange={(e) => handleInputChange(e, setEnderecos, index, 'estado')}
                  >
                    <option value="">Selecione o estado</option>
                    {estadosBrasil.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </FormRow>
              <FormButton
                disabled={enderecos.length === 1}
                style={{ backgroundColor: 'red' }}
                type="button"
                onClick={() => removerCampo(setEnderecos, index)}
              >
                Remover <Delete />
              </FormButton>
            </div>
          ))}
          <FormButton type="button" onClick={() => adicionarCampo(setEnderecos, "enderecos")}>
            Adicionar <Add />
          </FormButton>
          {errors.enderecos && <ErrorMessage>{errors.enderecos}</ErrorMessage>}
        </Container>

        <Container>
          <h3 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Contatos</h3>
          {contatos.map((contato, index) => (
            <div key={index}>
              <FormRow>
                <FormGroup>
                  <FormLabel>Nome:</FormLabel>
                  <input
                    type="text"
                    name="nome"
                    value={contato.nome}
                    onChange={(e) => handleInputChange(e, setContatos, index, 'nome')}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Contato:</FormLabel>
                  <input
                    type="text"
                    name="contato"
                    value={contato.contato}
                    onChange={(e) => handleInputChange(e, setContatos, index, 'contato')}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Tipo de Contato:</FormLabel>
                  <select
                    name="tipoContato"
                    value={contato.tipoContato}
                    onChange={(e) => handleInputChange(e, setContatos, index, 'tipoContato')}
                  >
                    <option value="">Selecione o tipo de contato</option>
                    {tiposContato.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </FormRow>
              <FormButton
                disabled={contatos.length === 1}
                style={{ backgroundColor: 'red' }}
                type="button"
                onClick={() => removerCampo(setContatos, index)}
              >
                Remover <Delete />
              </FormButton>
            </div>
          ))}
          <FormButton type="button" onClick={() => adicionarCampo(setContatos, "contatos")}>
            Adicionar <Add />
          </FormButton>
          {errors.contatos && <ErrorMessage>{errors.contatos}</ErrorMessage>}
        </Container>

        {success && <SuccessMessage>{success}</SuccessMessage>}

        <FormButton
          type="button"
          onClick={validateForm}
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            margin: "0 auto",
            width: '90%',
            marginTop: "1em"
          }}
        >
          {
            loading
            ? <Update spin={true} />
            : <>Salvar <Save /></>
          }
        </FormButton>
      </Form>
    </div>
  );
};

export default Register;
