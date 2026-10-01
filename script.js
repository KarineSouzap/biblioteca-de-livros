    // Os dados ficam apenas na memória.
    // Se a página for atualizada, eles serão apagados.
    const livros = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Sistema de Biblioteca de Livros</h1>
        <p>
          Este é um exemplo simples de SPA feita com HTML, CSS e JavaScript.
          A navegação acontece sem recarregar a página.
        </p>

        <p>
          Os livros cadastrados ficam temporariamente guardados em um array JavaScript.
        </p>

        <div class="contador">
          Livros cadastrados nesta sessão: <strong>${livros.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar livro</button>
          <button class="botao secundario" id="btnVerLivros">Ver livros</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerLivros")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Livro</h1>

        <form id="formLivro">
          <div class="campo">
            <label for="titulo">Título</label>
            <input id="titulo" type="text" placeholder="Digite o título do livro" required />
          </div>

          <div class="campo">
            <label for="genero">Gênero</label>
            <input id="genero" type="text" placeholder="Digite o gênero" required />
          </div>

          <div class="campo">
            <label for="autor">Autor</label>
            <input id="autor" type="text" placeholder="Digite o autor" required />
          </div>

          <div class="campo">
            <label for="disponivel">Disponível ou Emprestado?</label>
            <input id="disponivel" type="text" placeholder="Digite o status" required />
          </div>

          <button class="botao" type="submit">Salvar livro</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formLivro").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const titulo = document.querySelector("#titulo").value.trim();
        const genero = document.querySelector("#genero").value.trim();
        const autor = document.querySelector("#autor").value.trim();
        const disponivel = document.querySelector("#disponivel").value.trim();


        livros.push({
          titulo,
          genero,
          autor,
          disponivel

        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Livro cadastrado com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Biblioteca de Livros</h1>
        <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de livros.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (livros.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum livro cadastrado ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      livros.forEach((livro, indice) => {
        linhas += `
          <tr>
            <td>${livro.titulo}</td>
            <td>${livro.genero}</td>
            <td>${livro.autor}</td>
            <td>${livro.disponivel}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Gênero</th>
              <th>Autor</th>
              <th>Disponível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          livros.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Este exemplo foi criado para demonstrar uma Single Page Application simples.
        </p>
        <p>
          Existe apenas um arquivo HTML. Ao clicar nas opções do menu,
          o JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
        </p>
        <p>
          O projeto também demonstra cadastro em array, manipulação do DOM,
          eventos de clique, envio de formulário, listagem e exclusão.
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();
