import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  // Dados mockados para exemplo
  const [saldo, setSaldo] = useState(5000);
  const [resumo] = useState({
    receitasMes: 7500,
    despesasMes: 4200,
    contasVencer: 3,
    contasAtrasadas: 1,
  });

  const [movimentacoes] = useState([
    { data: '01/03', valor: 4200 },
    { data: '02/03', valor: 4500 },
    { data: '03/03', valor: 4100 },
    { data: '04/03', valor: 5000 },
    { data: '05/03', valor: 4800 },
    { data: '06/03', valor: 5200 },
    { data: '07/03', valor: 5000 },
  ]);

  const despesasPorCategoria = [
    { name: 'Moradia', value: 2000 },
    { name: 'Alimentação', value: 1200 },
    { name: 'Transporte', value: 500 },
    { name: 'Lazer', value: 300 },
    { name: 'Outros', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="h-full w-full">
      <div className="space-y-6 w-full">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Saldo Atual */}
          <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
            <h3 className="text-sm font-medium text-text mb-2">Saldo Atual</h3>
            <p className="text-2xl font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo)}
            </p>
          </div>

          {/* Receitas do Mês */}
          <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text mb-2">Receitas do Mês</h3>
              <ArrowTrendingUpIcon className="h-5 w-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.receitasMes)}
            </p>
          </div>

          {/* Despesas do Mês */}
          <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text mb-2">Despesas do Mês</h3>
              <ArrowTrendingDownIcon className="h-5 w-5 text-danger" />
            </div>
            <p className="text-2xl font-bold text-danger">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.despesasMes)}
            </p>
          </div>

          {/* Contas Pendentes */}
          <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text mb-2">Contas Pendentes</h3>
              <BanknotesIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm text-text">A vencer</p>
                <p className="text-xl font-bold text-primary">{resumo.contasVencer}</p>
              </div>
              <div>
                <p className="text-sm text-text">Atrasadas</p>
                <p className="text-xl font-bold text-danger">{resumo.contasAtrasadas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Evolução do Saldo */}
          <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Evolução do Saldo</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={movimentacoes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
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

          {/* Despesas por Categoria */}
          <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Despesas por Categoria</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={despesasPorCategoria}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {despesasPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Últimas Movimentações */}
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Últimas Movimentações</h3>
            <ClockIcon className="h-5 w-5 text-text" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <ArrowTrendingUpIcon className="h-4 w-4 text-success mr-2" />
                <span className="text-text">Salário</span>
              </div>
              <span className="text-success">+ R$ 5.000,00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <ArrowTrendingDownIcon className="h-4 w-4 text-danger mr-2" />
                <span className="text-text">Aluguel</span>
              </div>
              <span className="text-danger">- R$ 1.500,00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <ArrowTrendingDownIcon className="h-4 w-4 text-danger mr-2" />
                <span className="text-text">Supermercado</span>
              </div>
              <span className="text-danger">- R$ 850,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 