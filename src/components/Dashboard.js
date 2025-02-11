import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [saldo, setSaldo] = useState(5000);
  const [movimentacoes] = useState([
    { data: '01/03', valor: 4200 },
    { data: '02/03', valor: 4500 },
    { data: '03/03', valor: 4100 },
    { data: '04/03', valor: 5000 },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-6">
        {/* Card do Saldo */}
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
          <h2 className="text-xl font-semibold text-text mb-4">Saldo Atual</h2>
          <p className="text-3xl font-bold text-primary">
            R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Gráfico de Evolução */}
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6 flex-1">
          <h2 className="text-xl font-semibold text-text mb-4">Evolução do Saldo</h2>
          <div className="h-[calc(100%-3rem)]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={movimentacoes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#0ea5e9" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumo de Movimentações */}
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
          <h2 className="text-xl font-semibold text-text mb-4">Movimentações Recentes</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Salário</span>
              <span className="text-success">+ R$ 5.000,00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Aluguel</span>
              <span className="text-danger">- R$ 1.500,00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Internet</span>
              <span className="text-danger">- R$ 100,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 