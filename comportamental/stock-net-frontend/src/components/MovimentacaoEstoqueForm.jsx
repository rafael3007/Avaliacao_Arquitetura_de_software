import React, { useState } from 'react';
import axios from 'axios';

const MovimentacaoEstoqueForm = () => {
  const [materialId, setMaterialId] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [quantidade, setQuantidade] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/movimentacao-estoque', {
        materialId,
        tipo,
        quantidade,
      });
      console.log(response)
      alert('Movimentação registrada com sucesso!');
    } catch (error) {
      alert('Erro ao registrar movimentação: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Material ID:
        <input type="number" value={materialId} onChange={(e) => setMaterialId(e.target.value)} />
      </label>
      <label>
        Tipo:
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saída">Saída</option>
        </select>
      </label>
      <label>
        Quantidade:
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default MovimentacaoEstoqueForm;