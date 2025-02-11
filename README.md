# Finanças Pessoais - Aplicação Web

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

Uma aplicação web moderna para gerenciamento de finanças pessoais, construída com React e TailwindCSS.

## 🚀 Funcionalidades

- **Dashboard Interativo**
  - Visualização rápida do saldo atual
  - Gráficos de evolução financeira
  - Resumo de movimentações recentes

- **Gestão Completa**
  - Controle de receitas e despesas
  - Cadastro e acompanhamento de contas fixas
  - Registro e evolução salarial

- **Personalização**
  - Temas personalizáveis
  - Interface adaptável (tema claro/escuro)
  - Efeitos visuais configuráveis

- **Responsividade**
  - Layout otimizado para todos os dispositivos
  - Experiência mobile-first
  - Menu lateral adaptativo

## 🛠️ Tecnologias Utilizadas

- **React** - Framework JavaScript
- **TailwindCSS** - Framework CSS
- **Firebase** - Autenticação e Banco de Dados
- **Recharts** - Biblioteca de gráficos
- **Hero Icons** - Ícones vetoriais

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/financas-pessoais.git
```

2. Instale as dependências:
```bash
cd financas-pessoais
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione suas configurações do Firebase

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔧 Configuração

### Firebase

Configure suas credenciais do Firebase em `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  // ...outras configurações
};
```

### Personalização

Ajuste os temas em `src/contexts/ThemeContext.js`:

```javascript
const defaultTheme = {
  primary: '#0ea5e9',
  secondary: '#64748b',
  // ...outras cores
};
```

## 📱 Layout Responsivo

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:

- **Desktop**: Menu lateral expansível
- **Tablet**: Layout adaptativo
- **Mobile**: Menu hamburguer e navegação otimizada

## 🔐 Autenticação

- Login com email/senha
- Autenticação com Firebase
- Proteção de rotas

## 🎨 Personalização Visual

- **Temas**: Múltiplos esquemas de cores
- **Efeito Vidro**: Toggle para efeito glassmorphism
- **Bordas**: Diferentes níveis de arredondamento

## 📊 Componentes Principais

- **Dashboard**: Visão geral das finanças
- **Movimentações**: Registro de entradas e saídas
- **Contas**: Gestão de contas fixas
- **Salários**: Acompanhamento salarial

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## �� Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Amitael Maranzatto** - *Trabalho Inicial* - [@maranzatto](https://github.com/maranzatto)

## 🙏 Agradecimentos

- Inspiração
- Referências utilizadas
- Bibliotecas de terceiros
