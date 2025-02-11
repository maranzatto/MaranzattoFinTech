import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyInput, DateInput } from './common/MaskedInput';

export default function Movimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([
    { id: 1, tipo: 'entrada', descricao: 'Salário', valor: 5000, data: '05/03/2024' },
    { id: 2, tipo: 'saida', descricao: 'Aluguel', valor: 1500, data: '05/03/2024' },
    { id: 3, tipo: 'saida', descricao: 'Internet', valor: 100, data: '10/03/2024' },
  ]);

  const [novaMovimentacao, setNovaMovimentacao] = useState({
    tipo: 'entrada',
    descricao: '',
    valor: '',
    data: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovimentacoes([...movimentacoes, { ...novaMovimentacao, id: Date.now() }]);
    setNovaMovimentacao({
      tipo: 'entrada',
      descricao: '',
      valor: '',
      data: '',
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-6">
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
          <h2 className="text-xl font-semibold text-text mb-4">Nova Movimentação</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Tipo</label>
              <select
                value={novaMovimentacao.tipo}
                onChange={(e) => setNovaMovimentacao({ ...novaMovimentacao, tipo: e.target.value })}
                className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Descrição</label>
              <input
                type="text"
                value={novaMovimentacao.descricao}
                onChange={(e) => setNovaMovimentacao({ ...novaMovimentacao, descricao: e.target.value })}
                className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Valor</label>
              <CurrencyInput
                value={novaMovimentacao.valor}
                onValueChange={(value) => setNovaMovimentacao({ ...novaMovimentacao, valor: value })}
                className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Data</label>
              <DateInput
                value={novaMovimentacao.data}
                onChange={(e) => setNovaMovimentacao({ ...novaMovimentacao, data: e.target.value })}
                className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-theme shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 transition-colors"
            >
              Registrar Movimentação
            </button>
          </form>
        </div>

        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6 flex-1">
          <h2 className="text-xl font-semibold text-text mb-4">Histórico de Movimentações</h2>
          <div className="h-[calc(100%-3rem)] overflow-auto">
            <div className="space-y-4">
              {movimentacoes.map((mov) => (
                <div key={mov.id} className="flex justify-between items-center p-4 border rounded-theme">
                  <div>
                    <h3 className="font-medium">{mov.descricao}</h3>
                    <p className="text-sm text-gray-500">{mov.data}</p>
                  </div>
                  <span className={mov.tipo === 'entrada' ? 'text-success font-medium' : 'text-danger font-medium'}>
                    {mov.tipo === 'entrada' ? '+' : '-'} 
                    {typeof mov.valor === 'number' 
                      ? new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(mov.valor)
                      : mov.valor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 