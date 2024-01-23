// Core
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Layout
import Update from "../layout/Update"

// Components
import Dropper from "../components/Dropper";

// Style
import { Container } from '../style/SignUp.style';
import { FormInput, FormButton, ErrorMessage } from "../style/Login.style";

// Firebase
import { auth, database, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');

  // Handle Functions
  const handleCadastro = () => {
    if(!username || !email || !telefone || !senha || !foto ){
      setError('Campos vazios ou incompletos. Tente novamente!');
    }else{
      createUser();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  };

  // Firebase
  const createUser = async () => {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      const uid_data = user.uid;
      const email_data = user.email;

      const imageRef = storageRef(storage, `profile-image/${uid_data}`);
  
      // Convert data URL to Blob
      const blob = dataURLtoBlob(foto);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      createUserNode(uid_data, email_data, downloadURL);
    } catch (e) {
      console.error(e);
      setError('Erro ao criar o usuário. Por favor tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  const createUserNode = async (id, email, imageUrl) => {
    try {
      const dataRef = ref(database, `usuario/${id}`);
      const userData = {
        username: username,
        email,
        telefone,
        imageUrl,
      };

      navigate("/cadastro");
      await set(dataRef, userData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <form style={{ padding: "20px" }}>
        <h2 style={{ fontSize: "28px" }}>Cadastro</h2>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 2.5, marginRight: '25px' }}>
            <div style={{ display: "flex", width: "100%" }}>
              <FormInput
                style={{ flex: 1, marginRight: "2%" }}
                placeholder='Insira o usuário'
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormInput
                style={{ flex: 1 }}
                placeholder='Insira o email'
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <FormInput
                style={{ flex: 1, marginRight: "2%" }}
                placeholder='Insira o telefone'
                type="phone"
                id="phone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <FormInput
                style={{ flex: 1 }}
                placeholder='Insira a senha'
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <FormButton type="button" style={{ width: '100%', fontWeight: "bold" }} onClick={handleCadastro}>
              {
                loading
                ? <Update spin={true} />
                : "Cadastrar usuário"
              }
            </FormButton>
          </div>

          <div style={{ flex: 1, width: "100%" }}>
            {
              foto
              ? (
                <div style={{ width: "100%", position: 'relative', textAlign: 'center' }}>
                  <div style={{ width: '100%', height: '180px', overflow: 'hidden', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <img
                      src={foto}
                      alt="Selected Image"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        position: 'relative',
                        marginTop: '10px',
                      }}
                      onClick={() => setFoto(null)}
                    />
                  </div>
                </div>
              ) : <Dropper handleFileChange={handleFileChange} />
            }
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </Container>
  );
};

export default SignUp;
