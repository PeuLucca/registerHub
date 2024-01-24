// Core
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Layout
import Edit from "../layout/Edit"
import Delete from "../layout/Delete"
import Update from "../layout/Update"

// Style
import {
  ListContainer,
  StyledList,
  ItemContainer,
  ActionsContainer,
  Button,
  ModalOverlay,
  ModalContent,
  ModalMessage,
} from "../style/List.style"

// Firebase
import { database } from "../firebase";
import { ref, get, remove } from 'firebase/database';

const List = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Handle Functions
  const openModal = (id) => {
    console.log(id);
    setIsModalOpen(true);
    setSelectedItemId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const editList = (list) => {
    navigate("/cadastro", { state: list });
  };

  // Firease
  const getAllData = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");
      const dataRef = ref(database, `pessoaInfo/${userId}`);
      const snapshot = await get(dataRef);
      let completeList = [];

      if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(([id, item]) => {
          completeList.push({
            id: id,
            ...item
          });
        });
      }

      setList(completeList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedItemId) {
        const userId = localStorage.getItem("userId");
        const itemRef = ref(database, `pessoaInfo/${userId}/${selectedItemId}`);
        await remove(itemRef);
        closeModal();
        getAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllData();
  }, [])

  return (
    <div>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalMessage>Tem certeza que deseja apagar?</ModalMessage>
            <div>
              <Button onClick={handleDelete} backgroundColor='white'>Sim</Button>
              <Button onClick={closeModal}>Não</Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
      {loading ? (
        <Update style={{ marginLeft: "50%", fontSize: '28px' }} spin={true} />
      ) : (
        <>
          <StyledList>
            {list.map((item) => (
              <ListContainer key={item.id}>
                <ItemContainer>
                  <h4>{item.pessoa.nome} {item.pessoa.sobrenome}</h4>
                  <p><strong>CPF:</strong> {item.pessoa.cpf}</p>
                  <p><strong>Email:</strong> {item.pessoa.email}</p>
                  <p>
                    <strong>Contato: </strong>{item.contatos[0].contato} - {item.contatos[0].tipoContato}
                    {item.contatos.length > 1 ? ` (+ ${item.contatos.length - 1} forma de contato)` : null}
                  </p>
                  <ActionsContainer>
                    <Button backgroundColor='#207868' onClick={() => editList(item)} >
                      <Edit style={{ color: 'white' }}/>
                    </Button>
                    <Button backgroundColor='#b42e41' onClick={() => openModal(item.id)}>
                      <Delete style={{ color: 'white' }} />
                    </Button>
                  </ActionsContainer>
                </ItemContainer>
              </ListContainer>
            ))}
          </StyledList>
        </>
      )}
    </div>
  );
};

export default List;
