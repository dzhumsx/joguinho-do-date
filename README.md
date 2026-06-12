# 💖 Joguinho do Date

Um mini-aplicativo web interativo e super fofo para você convidar aquela pessoa especial para um encontro de uma forma criativa e inesquecível! Construído com React, TypeScript e Tailwind CSS.

## 🌟 O que é?
O **Joguinho do Date** é uma experiência interativa dividida em duas partes:
1. **O Gerador:** Você acessa a página principal, insere o seu e-mail e gera um **link personalizado**.
2. **O Convite:** Você envia o link gerado para o seu *crush*. Quando a pessoa abrir, ela será surpreendida com a famosa pergunta: *"Você aceita sair comigo?"*. O detalhe especial? O botão "Não" foge do mouse! 🏃‍♂️💨

Quando a pessoa finalmente clicar em "Sim" (porque ela não vai ter outra escolha rs), um formulário fofo no estilo "Quiz" vai aparecer para ela escolher:
- 📅 **Quando** (Data e Hora)
- 😋 **Comida** (Sushi, Pizza, Hambúrguer, etc.)
- 🌟 **Vibe do Encontro** (Cinema, Praia, etc.)

No final, tudo que ela escolher será **enviado automaticamente para o seu e-mail**! 💌

---

## ✨ Funcionalidades
- 🎨 **Design Moderno:** Interface com Glassmorphism, degradês românticos e corações flutuantes no fundo.
- 🔗 **Gerador de Link Seguro:** O e-mail fica codificado na URL para não aparecer em texto puro.
- 🕹️ **Botão Fujão:** Lógica avançada usando React Portals para fazer o botão "Não" fugir perfeitamente pelo navegador sem quebrar o layout.
- 📧 **Notificações via E-mail:** Integração nativa com a API gratuita do [FormSubmit](https://formsubmit.co/), enviando os resultados do encontro direto para a sua caixa de entrada sem precisar de back-end.

---

## 🛠️ Tecnologias Utilizadas
- **React** (com Vite)
- **TypeScript**
- **Tailwind CSS** (para estilização rápida e responsiva)
- **FormSubmit** (para envio de formulários via AJAX)

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para rodar o projeto na sua máquina:

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/joguinho-do-date.git
   ```

2. **Acesse a pasta do projeto**
   ```bash
   cd joguinho-do-date
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. Abra o navegador em `http://localhost:5173/` e crie o seu link!

---

## 💡 Dica de Uso (FormSubmit)
Como o projeto usa o **FormSubmit** para os e-mails, na *primeira vez* que alguém finalizar o quiz através de um link com o seu e-mail, o FormSubmit enviará uma mensagem de **Ativação** para a sua caixa de entrada.
Basta abrir seu e-mail, clicar em *"Activate Form"* e pronto! A partir daí, todos os dates confirmados chegarão lindamente formatados para você.

---

Feito com muito ❤️ para espalhar amor!
