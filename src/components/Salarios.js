import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Salarios() {
  const [salarios, setSalarios] = useState([
    { id: 1, data: '01/2024', valor: 5000 },
    { id: 2, data: '02/2024', valor: 5000 },
    { id: 3, data: '03/2024', valor: 5500 },
  ]);

  const [novoSalario, setNovoSalario] = useState({
    data: '',
    valor: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalarios([...salarios, { ...novoSalario, id: Date.now() }]);
    setNovoSalario({ data: '', valor: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <Link to="/dashboard" className="text-xl font-bold">Voltar ao Dashboard</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Gráfico de Evolução Salarial */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Evolução Salarial</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salarios}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#0ea5e9" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Formulário de Cadastro */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Registrar Salário</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mês/Ano</label>
              <input
                type="text"
                value={novoSalario.data}
                onChange={(e) => setNovoSalario({ ...novoSalario, data: e.target.value })}
                placeholder="MM/AAAA"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor</label>
              <input
                type="number"
                value={novoSalario.valor}
                onChange={(e) => setNovoSalario({ ...novoSalario, valor: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Registrar Salário
            </button>
          </form>
        </div>

        {/* Histórico de Salários */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Salários</h2>
          <div className="space-y-4">
            {salarios.map((salario) => (
              <div key={salario.id} className="flex justify-between items-center p-4 border rounded-lg">
                <span className="font-medium">{salario.data}</span>
                <span className="text-success font-medium">
                  R$ {salario.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 