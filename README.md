
# 📍 Mapa de Locais Favoritos - Desafio Frontend

Este projeto é uma aplicação web interativa que permite aos usuários explorar um mapa, buscar endereços e gerenciar uma lista de locais favoritos com persistência de dados.

## 🚀 Como Rodar o Projeto Localmente

1. **Instalação**: No terminal, dentro da pasta do projeto, execute:
   ```bash
   npm install
   ```
2. **Execução**: Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. **Acesso**: Abra `http://localhost:3000` no seu navegador.

---

## 🛠️ Decisões Técnicas e Arquitetura

Para este desafio, priorizei ferramentas modernas que garantem performance, escalabilidade e facilidade de manutenção:

- **React + TypeScript**: Escolhido pela tipagem estática que previne erros e melhora a experiência de desenvolvimento.
- **Leaflet & React-Leaflet**: Utilizado para o mapa por ser uma solução leve, open-source e extremamente flexível, sem as limitações de faturamento imediato de outras APIs.
- **Zustand (Gerenciamento de Estado)**: Optei pelo Zustand em vez de Redux ou Context API pela sua simplicidade, performance e facilidade em persistir dados no `localStorage` através do middleware `persist`.
- **React Query (TanStack Query)**: Utilizado para gerenciar as requisições à API de Geocoding (Nominatim). Ele oferece tratamento nativo de cache, estados de carregamento (loading) e erros, otimizando a experiência do usuário.
- **Tailwind CSS**: Para uma estilização rápida, responsiva e consistente com as tendências atuais de design.
- **Nominatim API (OpenStreetMap)**: Escolhida para geocodificação direta e reversa por ser gratuita e não exigir chaves de API para este teste, facilitando a execução imediata do projeto.

---

## ✅ Requisitos Atendidos

- [x] **Mapa Interativo**: Inicializado em Uberlândia-MG.
- [x] **Busca de Endereço**: Campo de busca com sugestões e centralização automática.
- [x] **Seleção no Mapa**: Clique em qualquer ponto para capturar coordenadas.
- [x] **Salvar Favoritos**: Persistência local (não perde os dados ao atualizar a página).
- [x] **Lista de Locais**: Sidebar lateral com navegação rápida entre os locais salvos.
- [x] **Interface Responsiva**: Design adaptado para Desktop e Mobile.
- [x] **Tratamento de Estados**: Feedback visual de loading e erro em todas as interações de rede.

---

## 👨‍💻 Avaliação (Critérios IVARE)

- **Funcionalidade**: O sistema atende 100% dos requisitos.
- **Qualidade de Código**: Código modularizado, variáveis com nomes semânticos e separação clara entre lógica de serviço e interface.
- **Integração**: Uso correto de Hooks customizados e React Query.
- **UI/UX**: Layout limpo, intuitivo e com foco na usabilidade.

## Extra 

- **Obrigado pela oportunidade**: Diria que foi um carnaval um tanto quanto diferente, no qual ao invés de viajar com minha família ou sair com meus amigos,
 passei um bom tempo em casa codando e curtindo minha casa sozinho, enquanto aprendia algumas coisas e fiz um projetinho bem legal, espero que gostem e que
 seja aprovado para a próxima etapa do processo acho que a vaga se encaixou muito bem no que eu quero para a minha vida e será uma satisfação somar a equipe!
 Um abraço e bom carnaval.