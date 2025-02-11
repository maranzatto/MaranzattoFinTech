import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input } from './common/Input';
import { CurrencyInput, DateInput } from './common/MaskedInput';

export default function Salarios() {
  const [salarios, setSalarios] = useState([
    { id: 1, cargo: 'Desenvolvedor', valor: 5000, dataRecebimento: '05/03/2024' },
    { id: 2, cargo: 'Designer', valor: 4000, dataRecebimento: '10/03/2024' },
  ]);

  const [novoSalario, setNovoSalario] = useState({
    cargo: '',
    valor: '',
    dataRecebimento: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalarios([...salarios, { ...novoSalario, id: Date.now() }]);
    setNovoSalario({
      cargo: '',
      valor: '',
      dataRecebimento: '',
    });
  };

  return (
    <div className="h-full w-full">
      <div className="space-y-6 w-full">
        {/* Gráfico de Evolução Salarial */}
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-text mb-4">Evolução Salarial</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salarios}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dataRecebimento" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Formulário de Cadastro */}
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-text mb-4">Cadastrar Novo Salário</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Cargo</label>
              <Input
                type="text"
                value={novoSalario.cargo}
                onChange={(e) => setNovoSalario({ ...novoSalario, cargo: e.target.value })}
                placeholder="Digite o cargo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Valor</label>
              <CurrencyInput
                value={novoSalario.valor}
                onValueChange={(value) => setNovoSalario({ ...novoSalario, valor: value })}
                className="input-theme"
                placeholder="R$ 0,00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">Data de Recebimento</label>
              <DateInput
                value={novoSalario.dataRecebimento}
                onChange={(e) => setNovoSalario({ ...novoSalario, dataRecebimento: e.target.value })}
                className="input-theme"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-theme hover:bg-opacity-90 transition-colors"
            >
              Cadastrar Salário
            </button>
          </form>
        </div>

        {/* Lista de Salários */}
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6 flex-1 w-full">
          <h2 className="text-xl font-semibold text-text mb-4">Salários Cadastrados</h2>
          <div className="h-[calc(100%-3rem)] overflow-auto">
            <div className="space-y-4">
              {salarios.map((salario) => (
                <div key={salario.id} className="flex justify-between items-center p-4 border rounded-theme">
                  <div>
                    <h3 className="font-medium">{salario.cargo}</h3>
                    <p className="text-sm text-gray-500">
                      Recebimento: {salario.dataRecebimento}
                    </p>
                  </div>
                  <span className="text-success font-medium">
                    {typeof salario.valor === 'number' 
                      ? new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(salario.valor)
                      : salario.valor}
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