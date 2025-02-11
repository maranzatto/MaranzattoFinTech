import { useState } from 'react';
import { PlusCircleIcon, BellIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { Input } from './common/Input';
import { CurrencyInput, DateInput, PhoneInput } from './common/MaskedInput';
import { Modal } from './common/Modal';

export default function GestaoContas() {
  const [contas, setContas] = useState([
    { id: 1, nome: 'Aluguel', valor: 1500, vencimento: '05/03/2024', categoria: 'Moradia' },
    { id: 2, nome: 'Internet', valor: 100, vencimento: '10/03/2024', categoria: 'Serviços' },
    { id: 3, nome: 'Energia', valor: 200, vencimento: '15/03/2024', categoria: 'Serviços' },
  ]);

  const [categorias, setCategorias] = useState([
    'Moradia',
    'Alimentação',
    'Transporte',
    'Lazer',
    'Serviços',
    'Outros'
  ]);

  const [novaConta, setNovaConta] = useState({
    nome: '',
    valor: '',
    vencimento: '',
    categoria: '',
    notificacoes: {
      email: true,
      sms: false,
      diasAntesVencimento: 3,
      emailContato: '',
      telefoneContato: ''
    }
  });

  const [novaCategoria, setNovaCategoria] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [mostrarConfiguracaoNotificacao, setMostrarConfiguracaoNotificacao] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setContas([...contas, { ...novaConta, id: Date.now() }]);
    setNovaConta({ nome: '', valor: '', vencimento: '', categoria: '', notificacoes: { email: true, sms: false, diasAntesVencimento: 3, emailContato: '', telefoneContato: '' } });
  };

  const handleAdicionarCategoria = (e) => {
    e.preventDefault();
    if (novaCategoria.trim()) {
      setCategorias([...categorias, novaCategoria.trim()]);
      setNovaCategoria('');
      setModalAberto(false);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="space-y-4 md:space-y-6 w-full">
        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-4 md:p-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
            <h2 className="text-lg md:text-xl font-semibold text-text">Cadastrar Nova Conta</h2>
            <button
              onClick={() => setModalAberto(true)}
              className="flex items-center text-primary hover:text-primary/80 transition-colors sm:ml-4"
              title="Adicionar Categoria"
            >
              <PlusCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Nome da Conta</label>
                <Input
                  type="text"
                  value={novaConta.nome}
                  onChange={(e) => setNovaConta({ ...novaConta, nome: e.target.value })}
                  placeholder="Digite o nome da conta"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Categoria</label>
                <select
                  value={novaConta.categoria}
                  onChange={(e) => setNovaConta({ ...novaConta, categoria: e.target.value })}
                  className="input-theme"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Valor</label>
                <CurrencyInput
                  value={novaConta.valor}
                  onValueChange={(value) => setNovaConta({ ...novaConta, valor: value })}
                  className="input-theme"
                  placeholder="R$ 0,00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Vencimento</label>
                <DateInput
                  value={novaConta.vencimento}
                  onChange={(e) => setNovaConta({ ...novaConta, vencimento: e.target.value })}
                  className="input-theme"
                  required
                />
              </div>
            </div>

            {/* Configuração de Notificações */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-text">Notificações</h3>
                <button
                  type="button"
                  onClick={() => setMostrarConfiguracaoNotificacao(!mostrarConfiguracaoNotificacao)}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <BellIcon className="h-5 w-5 mr-2" />
                  Configurar Notificações
                </button>
              </div>

              {mostrarConfiguracaoNotificacao && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-theme">
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={novaConta.notificacoes.email}
                        onChange={(e) => setNovaConta({
                          ...novaConta,
                          notificacoes: {
                            ...novaConta.notificacoes,
                            email: e.target.checked
                          }
                        })}
                        className="rounded-theme text-primary focus:ring-primary"
                      />
                      <span className="text-sm flex items-center">
                        <EnvelopeIcon className="h-4 w-4 mr-1" />
                        Email
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={novaConta.notificacoes.sms}
                        onChange={(e) => setNovaConta({
                          ...novaConta,
                          notificacoes: {
                            ...novaConta.notificacoes,
                            sms: e.target.checked
                          }
                        })}
                        className="rounded-theme text-primary focus:ring-primary"
                      />
                      <span className="text-sm flex items-center">
                        <DevicePhoneMobileIcon className="h-4 w-4 mr-1" />
                        SMS
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Dias antes do vencimento
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        value={novaConta.notificacoes.diasAntesVencimento}
                        onChange={(e) => setNovaConta({
                          ...novaConta,
                          notificacoes: {
                            ...novaConta.notificacoes,
                            diasAntesVencimento: e.target.value
                          }
                        })}
                        placeholder="Ex: 3"
                      />
                    </div>

                    {novaConta.notificacoes.email && (
                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Email para notificação
                        </label>
                        <Input
                          type="email"
                          value={novaConta.notificacoes.emailContato}
                          onChange={(e) => setNovaConta({
                            ...novaConta,
                            notificacoes: {
                              ...novaConta.notificacoes,
                              emailContato: e.target.value
                            }
                          })}
                          placeholder="seu@email.com"
                        />
                      </div>
                    )}

                    {novaConta.notificacoes.sms && (
                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Telefone para SMS
                        </label>
                        <PhoneInput
                          value={novaConta.notificacoes.telefoneContato}
                          onChange={(e) => setNovaConta({
                            ...novaConta,
                            notificacoes: {
                              ...novaConta.notificacoes,
                              telefoneContato: e.target.value
                            }
                          })}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-theme hover:bg-opacity-90 transition-colors mt-6"
            >
              Cadastrar Conta
            </button>
          </form>
        </div>

        <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-4 md:p-6 flex-1 w-full">
          <h2 className="text-lg md:text-xl font-semibold text-text mb-4">Contas Cadastradas</h2>
          <div className="h-[calc(100%-3rem)] overflow-auto">
            <div className="space-y-3 md:space-y-4">
              {contas.map((conta) => (
                <div key={conta.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-theme">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-medium">{conta.nome}</h3>
                    <p className="text-sm text-gray-500">
                      Vence dia {conta.vencimento} • {conta.categoria}
                    </p>
                  </div>
                  <span className="text-danger font-medium text-right sm:ml-4">
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

      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title="Nova Categoria"
      >
        <form onSubmit={handleAdicionarCategoria} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Nome da Categoria
            </label>
            <Input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Digite o nome da categoria"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="w-full sm:w-auto px-4 py-2 text-text hover:bg-gray-100 rounded-theme transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-theme hover:bg-opacity-90 transition-colors"
            >
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 