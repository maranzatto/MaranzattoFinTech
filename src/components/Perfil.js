import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserCircleIcon,
  CameraIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { 
  DateInput, 
  CpfInput, 
  PhoneInput, 
  PisInput, 
  CurrencyInput 
} from './common/MaskedInput';

export default function Perfil() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  const [perfil, setPerfil] = useState({
    nome: 'Usuário Exemplo',
    email: user?.email || 'usuario@exemplo.com',
    telefone: '(11) 99999-9999',
    dataNascimento: '1990-01-01',
    pis: '123.45678.90-1',
    cpf: '123.456.789-00',
    profissao: 'Desenvolvedor',
    empresa: 'Empresa XYZ',
    salarioBase: '5000',
    foto: null
  });

  const [editando, setEditando] = useState(false);
  const [novosDados, setNovosDados] = useState(perfil);

  const handleFotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfil(prev => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = () => {
    setPerfil(novosDados);
    setEditando(false);
  };

  const formatarData = (data) => {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const parseData = (data) => {
    if (!data) return '';
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-glass backdrop-blur-theme rounded-theme shadow-lg p-6">
        {/* Cabeçalho com Foto */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden border-4 cursor-pointer group-hover:opacity-90 transition-opacity"
              style={{ borderColor: theme.primary }}
              onClick={handleFotoClick}
            >
              {perfil.foto ? (
                <img 
                  src={perfil.foto} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircleIcon 
                  className="w-full h-full text-gray-400"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFotoChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-text">{perfil.nome}</h2>
          <p className="text-secondary">{perfil.profissao}</p>
        </div>

        {/* Informações do Perfil */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-text">Informações Pessoais</h3>
            <button
              onClick={() => setEditando(!editando)}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <PencilIcon className="h-5 w-5 mr-1" />
              {editando ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campos do formulário */}
            {editando ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Nome</label>
                  <input
                    type="text"
                    value={novosDados.nome}
                    onChange={(e) => setNovosDados({ ...novosDados, nome: e.target.value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Email</label>
                  <input
                    type="email"
                    value={novosDados.email}
                    onChange={(e) => setNovosDados({ ...novosDados, email: e.target.value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Telefone</label>
                  <PhoneInput
                    value={novosDados.telefone}
                    onChange={(e) => setNovosDados({ ...novosDados, telefone: e.target.value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Data de Nascimento</label>
                  <DateInput
                    value={formatarData(novosDados.dataNascimento)}
                    onChange={(e) => setNovosDados({ 
                      ...novosDados, 
                      dataNascimento: parseData(e.target.value)
                    })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">PIS</label>
                  <PisInput
                    value={novosDados.pis}
                    onChange={(e) => setNovosDados({ ...novosDados, pis: e.target.value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">CPF</label>
                  <CpfInput
                    value={novosDados.cpf}
                    onChange={(e) => setNovosDados({ ...novosDados, cpf: e.target.value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Profissão</label>
                  <input
                    type="text"
                    value={novosDados.profissao}
                    onChange={(e) => setNovosDados({ ...novosDados, profissao: e.target.value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Empresa</label>
                  <input
                    type="text"
                    value={novosDados.empresa}
                    onChange={(e) => setNovosDados({ ...novosDados, empresa: e.target.value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Salário Base</label>
                  <CurrencyInput
                    value={novosDados.salarioBase}
                    onValueChange={(value) => setNovosDados({ ...novosDados, salarioBase: value })}
                    className="w-full rounded-theme border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </>
            ) : (
              // Visualização das informações
              <>
                <div>
                  <p className="text-sm text-secondary">Nome</p>
                  <p className="text-text">{perfil.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">Email</p>
                  <p className="text-text">{perfil.email}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">Telefone</p>
                  <p className="text-text">{perfil.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">Data de Nascimento</p>
                  <p className="text-text">{formatarData(perfil.dataNascimento)}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">PIS</p>
                  <p className="text-text">{perfil.pis}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">CPF</p>
                  <p className="text-text">{perfil.cpf}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">Profissão</p>
                  <p className="text-text">{perfil.profissao}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">Empresa</p>
                  <p className="text-text">{perfil.empresa}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">Salário Base</p>
                  <p className="text-text">
                    {typeof perfil.salarioBase === 'number' 
                      ? `R$ ${perfil.salarioBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                      : perfil.salarioBase}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Botão Salvar */}
          {editando && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSalvar}
                className="px-4 py-2 bg-primary text-white rounded-theme hover:bg-opacity-90 transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 