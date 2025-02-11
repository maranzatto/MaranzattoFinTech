import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyInput, DateInput } from './common/MaskedInput';

export default function GestaoContas() {
  const [contas, setContas] = useState([
    { id: 1, nome: 'Aluguel', valor: 1500, vencimento: '05/03/2024' },
    { id: 2, nome: 'Internet', valor: 100, vencimento: '10/03/2024' },
    { id: 3, nome: 'Energia', valor: 200, vencimento: '15/03/2024' },
  ]);

  const [novaConta, setNovaConta] = useState({
    nome: '',
    valor: '',
    vencimento: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setContas([...contas, { ...novaConta, id: Date.now() }]);
    setNovaConta({ nome: '', valor: '', vencimento: '' });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-6">
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
          <h2 className="text-xl font-semibold text-text mb-4">Cadastrar Nova Conta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Nome da Conta</label>
              <input
                type="text"
                value={novaConta.nome}
                onChange={(e) => setNovaConta({ ...novaConta, nome: e.target.value })}
                className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Valor</label>
              <CurrencyInput
                value={novaConta.valor}
                onValueChange={(value) => setNovaConta({ ...novaConta, valor: value })}
                className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Vencimento</label>
              <DateInput
                value={novaConta.vencimento}
                onChange={(e) => setNovaConta({ ...novaConta, vencimento: e.target.value })}
                className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-theme shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 transition-colors"
            >
              Cadastrar Conta
            </button>
          </form>
        </div>

        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6 flex-1">
          <h2 className="text-xl font-semibold text-text mb-4">Contas Cadastradas</h2>
          <div className="h-[calc(100%-3rem)] overflow-auto">
            <div className="space-y-4">
              {contas.map((conta) => (
                <div key={conta.id} className="flex justify-between items-center p-4 border rounded-theme">
                  <div>
                    <h3 className="font-medium">{conta.nome}</h3>
                    <p className="text-sm text-gray-500">Vence dia {conta.vencimento}</p>
                  </div>
                  <span className="text-danger font-medium">
                    {typeof conta.valor === 'number' 
                      ? new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(conta.valor)
                      : conta.valor}
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