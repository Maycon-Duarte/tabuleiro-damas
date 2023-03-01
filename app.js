// crie uma variavel para indicar de quem é a vez
var vez = 2;

// variavel com as posições iniciais do tabuleiro
var board = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
];

function gerarTabuleiro(matriz) {
  var table = document.getElementById("board");
  // se a matriz for passada como parâmetro, substitua a matriz do tabuleiro
  if (matriz) {
    board = matriz;
  } else {
    for (var i = 0; i < 8; i++) {
      var row = table.insertRow();
      for (var j = 0; j < 8; j++) {
        var cell = row.insertCell();
        if ((i + j) % 2 == 0) {
          cell.className = "light";
        } else {
          cell.className = "dark";
        }
        // adiciona um atributo com a posição da casa
        cell.setAttribute("data-position", i + "," + j);
        if (board[i][j] != 0) {
          var piece = document.createElement("div");
          piece.className = "piece";
          if (board[i][j] == 1) {
            piece.classList.add("black");
          } else {
            piece.classList.add("white");
          }
          cell.appendChild(piece);
        }
      }
    }
  }
  console.log(board);
}
gerarTabuleiro();
// clie um evento onclick para as casas do tabuleiro
var cells = document.querySelectorAll("#board td");
for (var i = 0; i < cells.length; i++) {
  cells[i].onclick = function () {
    // chame uma função chamada movimentarPeca e paçe como parâmetro a posição da casa e a classe da peça
    // apenas chame a função se a casa tiver uma peça dentro e n tiver a classe selected
    if (this.children.length > 0 && !this.classList.contains("selected")) {
      casasLivres(
        this.getAttribute("data-position"),
        this.children[0].className
      );
    }

    // se a casa tiver a classe selected e tiver o atributo data-move
    if (this.classList.contains("selected") && this.getAttribute("data-move")) {
      // chame a função movePiece e passe como parâmetro a posição da casa e a posição da casa que será movimentada e a posição da casa que será capturada
      movePiece(
        this.getAttribute("data-position"),
        this.getAttribute("data-move"),
        this.getAttribute("data-capture")
      );
    }
  };
}
// crie a função casas livres e crie um switcase para cada peça
function casasLivres(position, piece) {
  // sempre que a função for chamada remova a classe selected, e todos os atributos adicionados de todas as casas
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove("selected");
    cells[i].removeAttribute("data-move");
    cells[i].removeAttribute("data-capture");
  }
  switch (piece) {
    case "piece black":
      // se for a vez das peças pretas
      if (vez == 1) {
        // localize as casas que podem ser movimentadas
        var casa1 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) + 1) +
            "," +
            (parseInt(position[2]) + 1) +
            "']"
        );
        var casa2 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) + 1) +
            "," +
            (parseInt(position[2]) - 1) +
            "']"
        );
        // se a casa1 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa1 != null && casa1.children.length == 0) {
          casa1.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa1.setAttribute("data-move", position);
        }
        // se a casa2 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa2 != null && casa2.children.length == 0) {
          casa2.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa2.setAttribute("data-move", position);
        }
        // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura1
        if (
          casa1 != null &&
          casa1.children.length > 0 &&
          casa1.children[0].classList.contains("white")
        ) {
          var captura1 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) + 2) +
              "," +
              (parseInt(position[2]) + 2) +
              "']"
          );
          if (captura1 != null && captura1.children.length == 0) {
            captura1.classList.add("selected");
            captura1.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura1.setAttribute(
              "data-capture",
              casa1.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura2
        if (
          casa2 != null &&
          casa2.children.length > 0 &&
          casa2.children[0].classList.contains("white")
        ) {
          var captura2 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) + 2) +
              "," +
              (parseInt(position[2]) - 2) +
              "']"
          );
          if (captura2 != null && captura2.children.length == 0) {
            captura2.classList.add("selected");
            captura2.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura2.setAttribute(
              "data-capture",
              casa2.getAttribute("data-position")
            );
          }
        }
      }
      console.log("peça preta");
      break;
    case "piece white":
      // se for a vez das peças brancas
      if (vez == 2) {
        // localize as casas que podem ser movimentadas
        var casa1 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) - 1) +
            "," +
            (parseInt(position[2]) + 1) +
            "']"
        );
        var casa2 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) - 1) +
            "," +
            (parseInt(position[2]) - 1) +
            "']"
        );
        // se a casa1 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa1 != null && casa1.children.length == 0) {
          casa1.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa1.setAttribute("data-move", position);
        }
        // se a casa2 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa2 != null && casa2.children.length == 0) {
          casa2.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa2.setAttribute("data-move", position);
        }
        // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura1
        if (
          casa1 != null &&
          casa1.children.length > 0 &&
          casa1.children[0].classList.contains("black")
        ) {
          var captura1 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) - 2) +
              "," +
              (parseInt(position[2]) + 2) +
              "']"
          );
          if (captura1 != null && captura1.children.length == 0) {
            captura1.classList.add("selected");
            captura1.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura1.setAttribute(
              "data-capture",
              casa1.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura2
        if (
          casa2 != null &&
          casa2.children.length > 0 &&
          casa2.children[0].classList.contains("black")
        ) {
          var captura2 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) - 2) +
              "," +
              (parseInt(position[2]) - 2) +
              "']"
          );
          if (captura2 != null && captura2.children.length == 0) {
            captura2.classList.add("selected");
            captura2.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura2.setAttribute(
              "data-capture",
              casa2.getAttribute("data-position")
            );
          }
        }
      }
      console.log("peça branca");
      break;
    case "piece white king":
      // se for a vez das peças brancas e a peça for uma rainha permita o movimento em todas as direções
      if (vez == 2) {
        // localize as casas que podem ser movimentadas
        var casa1 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) - 1) +
            "," +
            (parseInt(position[2]) + 1) +
            "']"
        );
        var casa2 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) - 1) +
            "," +
            (parseInt(position[2]) - 1) +
            "']"
        );
        var casa3 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) + 1) +
            "," +
            (parseInt(position[2]) + 1) +
            "']"
        );
        var casa4 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) + 1) +
            "," +
            (parseInt(position[2]) - 1) +
            "']"
        );
        // se a casa1 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa1 != null && casa1.children.length == 0) {
          casa1.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa1.setAttribute("data-move", position);
        }
        // se a casa2 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa2 != null && casa2.children.length == 0) {
          casa2.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa2.setAttribute("data-move", position);
        }
        // se a casa3 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa3 != null && casa3.children.length == 0) {
          casa3.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa3.setAttribute("data-move", position);
        }
        // se a casa4 estiver vazia e for diferente de null adicione a classe selected na casa
        if (casa4 != null && casa4.children.length == 0) {
          casa4.classList.add("selected");
          // adicione o atributo data-move com a posição da peça que será movimentada
          casa4.setAttribute("data-move", position);
        }
        // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura1
        if (
          casa1 != null &&
          casa1.children.length > 0 &&
          casa1.children[0].classList.contains("black")
        ) {
          var captura1 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) - 2) +
              "," +
              (parseInt(position[2]) + 2) +
              "']"
          );
          if (captura1 != null && captura1.children.length == 0) {
            captura1.classList.add("selected");
            captura1.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura1.setAttribute(
              "data-capture",
              casa1.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura2
        if (
          casa2 != null &&
          casa2.children.length > 0 &&
          casa2.children[0].classList.contains("black")
        ) {
          var captura2 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) - 2) +
              "," +
              (parseInt(position[2]) - 2) +
              "']"
          );
          if (captura2 != null && captura2.children.length == 0) {
            captura2.classList.add("selected");
            captura2.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura2.setAttribute(
              "data-capture",
              casa2.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 3, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura3
        if (
          casa3 != null &&
          casa3.children.length > 0 &&
          casa3.children[0].classList.contains("black")
        ) {
          var captura3 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) + 2) +
              "," +
              (parseInt(position[2]) + 2) +
              "']"
          );
          if (captura3 != null && captura3.children.length == 0) {
            captura3.classList.add("selected");
            captura3.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura3.setAttribute(
              "data-capture",
              casa3.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 4, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura4
        if (
          casa4 != null &&
          casa4.children.length > 0 &&
          casa4.children[0].classList.contains("black")
        ) {
          var captura4 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) + 2) +
              "," +
              (parseInt(position[2]) - 2) +
              "']"
          );
          if (captura4 != null && captura4.children.length == 0) {
            captura4.classList.add("selected");
            captura4.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura4.setAttribute(
              "data-capture",
              casa4.getAttribute("data-position")
            );
          }
        }
      }
      break;
    case "piece black king":
      // use o mesmo processo do case "piece white king" para calcular as casas que o rei pode se movimentar
      if (vez == 1) {
        // localize as casas que podem ser movimentadas
        var casa1 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) - 1) +
            "," +
            (parseInt(position[2]) + 1) +
            "']"
        );
        var casa2 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) - 1) +
            "," +
            (parseInt(position[2]) - 1) +
            "']"
        );
        var casa3 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) + 1) +
            "," +
            (parseInt(position[2]) + 1) +
            "']"
        );
        var casa4 = document.querySelector(
          "[data-position='" +
            (parseInt(position[0]) + 1) +
            "," +
            (parseInt(position[2]) - 1) +
            "']"
        );
        // se a casa existir e estiver vazia, adicione a classe selected
        if (casa1 != null && casa1.children.length == 0) {
          casa1.classList.add("selected");
          casa1.setAttribute("data-move", position);
        }
        if (casa2 != null && casa2.children.length == 0) {
          casa2.classList.add("selected");
          casa2.setAttribute("data-move", position);
        }
        if (casa3 != null && casa3.children.length == 0) {
          casa3.classList.add("selected");
          casa3.setAttribute("data-move", position);
        }
        if (casa4 != null && casa4.children.length == 0) {
          casa4.classList.add("selected");
          casa4.setAttribute("data-move", position);
        }
        // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura1
        if (
          casa1 != null &&
          casa1.children.length > 0 &&
          casa1.children[0].classList.contains("white")
        ) {
          var captura1 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) - 2) +
              "," +
              (parseInt(position[2]) + 2) +
              "']"
          );
          if (captura1 != null && captura1.children.length == 0) {
            captura1.classList.add("selected");
            captura1.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura1.setAttribute(
              "data-capture",
              casa1.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura2
        if (
          casa2 != null &&
          casa2.children.length > 0 &&
          casa2.children[0].classList.contains("white")
        ) {
          var captura2 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) - 2) +
              "," +
              (parseInt(position[2]) - 2) +
              "']"
          );
          if (captura2 != null && captura2.children.length == 0) {
            captura2.classList.add("selected");
            captura2.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura2.setAttribute(
              "data-capture",
              casa2.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 3, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura3
        if (
          casa3 != null &&
          casa3.children.length > 0 &&
          casa3.children[0].classList.contains("white")
        ) {
          var captura3 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) + 2) +
              "," +
              (parseInt(position[2]) + 2) +
              "']"
          );
          if (captura3 != null && captura3.children.length == 0) {
            captura3.classList.add("selected");
            captura3.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura3.setAttribute(
              "data-capture",
              casa3.getAttribute("data-position")
            );
          }
        }
        // se tiver uma peça adversária na casa 4, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
        // dica: chame a variavel de captura4
        if (
          casa4 != null &&
          casa4.children.length > 0 &&
          casa4.children[0].classList.contains("white")
        ) {
          var captura4 = document.querySelector(
            "[data-position='" +
              (parseInt(position[0]) + 2) +
              "," +
              (parseInt(position[2]) - 2) +
              "']"
          );
          if (captura4 != null && captura4.children.length == 0) {
            captura4.classList.add("selected");
            captura4.setAttribute("data-move", position);
            // adicione um atributo indicando a posição da peça que será capturada
            captura4.setAttribute(
              "data-capture",
              casa4.getAttribute("data-position")
            );
          }
        }
      }
      break;

    default:
      console.log("casa vazia");
  }
}

// crie a função movePiece e passe como parâmetro a posição da casa e a posição da casa que será movimentada
function movePiece(position, move, capture) {
  // localize a casa que será movimentada
  var casa = document.querySelector(
    "[data-position='" + move[0] + "," + move[2] + "']"
  );
  // localize a peça que será movimentada
  var peca = document.querySelector(
    "[data-position='" + position[0] + "," + position[2] + "']"
  );
  // adicione a peça na casa
  peca.appendChild(casa.children[0]);
  // remova a classe selected de todas as casas
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove("selected");
  }

  // verifica se a pela pode se tornar uma dama
  if (peca.children[0].classList.contains("white")) {
    if (parseInt(position[0]) == 0) {
      peca.children[0].classList.add("king");
    }
  } else {
    if (parseInt(position[0]) == 7) {
      peca.children[0].classList.add("king");
    }
  }
  // se a casa que será movimentada tiver o atributo data-capture
  if (capture) {
    // localize a peça que será capturada
    var pecaCapturada = document.querySelector(
      "[data-position='" + capture[0] + "," + capture[2] + "']"
    );
    // remova a peça capturada do tabuleiro
    pecaCapturada.removeChild(pecaCapturada.children[0]);
    // chama a função que verifica se a peça pode capturar novamente
    // se retornar true, mantem a vez da peça
    // se retornar false, muda a vez da peça
    // se a peça ainda pode capturar, mantem a vez dela
    if (!checkCapture(position)) {
      // mude a vez da peça
      vez = vez == 1 ? 2 : 1;
    }
  } else {
    // mude a vez da peça
    vez = vez == 1 ? 2 : 1;
  }
  // remova os atributos data-move e data-capture da casa
  casa.removeAttribute("data-move");
  casa.removeAttribute("data-capture");
}
// crie a função checkCapture e passe como parâmetro a posição da casa que foi movimentada
function checkCapture(position) {
  // localize a peça que foi movimentada
  var peca = document.querySelector(
    "[data-position='" + position[0] + "," + position[2] + "']"
  );
  // se a peça for branca
  if (peca.children[0].classList.contains("white")) {
    // localize a casa que está a frente da peça branca
    var casa1 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) - 1) +
        "," +
        (parseInt(position[2]) - 1) +
        "']"
    );
    // localize a casa que está a frente da peça branca
    var casa2 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) - 1) +
        "," +
        (parseInt(position[2]) + 1) +
        "']"
    );
    // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      casa1 != null &&
      casa1.children.length > 0 &&
      casa1.children[0].classList.contains("black")
    ) {
      var captura1 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) - 2) +
          "," +
          (parseInt(position[2]) - 2) +
          "']"
      );
      if (captura1 != null && captura1.children.length == 0) {
        return true;
      }
    }
    // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      casa2 != null &&
      casa2.children.length > 0 &&
      casa2.children[0].classList.contains("black")
    ) {
      var captura2 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) - 2) +
          "," +
          (parseInt(position[2]) + 2) +
          "']"
      );
      if (captura2 != null && captura2.children.length == 0) {
        return true;
      }
    }
  }
  // se a peça for preta
  if (peca.children[0].classList.contains("black")) {
    // localize a casa que está a frente da peça preta
    var casa1 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) + 1) +
        "," +
        (parseInt(position[2]) + 1) +
        "']"
    );
    // localize a casa que está a frente da peça preta
    var casa2 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) + 1) +
        "," +
        (parseInt(position[2]) - 1) +
        "']"
    );
    // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      casa1 != null &&
      casa1.children.length > 0 &&
      casa1.children[0].classList.contains("white")
    ) {
      var captura1 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) + 2) +
          "," +
          (parseInt(position[2]) + 2) +
          "']"
      );
      if (captura1 != null && captura1.children.length == 0) {
        return true;
      }
    }
    // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      casa2 != null &&
      casa2.children.length > 0 &&
      casa2.children[0].classList.contains("white")
    ) {
      var captura2 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) + 2) +
          "," +
          (parseInt(position[2]) - 2) +
          "']"
      );
      if (captura2 != null && captura2.children.length == 0) {
        return true;
      }
    }
  }
  // se tiver as classes piece white king
  if (
    peca.children[0].classList.contains("white") &&
    peca.children[0].classList.contains("king")
  ) {
    console.log("dama branca");
    // localize as casas que estão atraz da peça branca
    // dica: chame elas de tras 1 e tras 2
    var tras1 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) + 1) +
        "," +
        (parseInt(position[2]) + 1) +
        "']"
    );
    var tras2 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) + 1) +
        "," +
        (parseInt(position[2]) - 1) +
        "']"
    );
    // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      tras1 != null &&
      tras1.children.length > 0 &&
      tras1.children[0].classList.contains("black")
    ) {
      var captura1 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) + 2) +
          "," +
          (parseInt(position[2]) + 2) +
          "']"
      );
      if (captura1 != null && captura1.children.length == 0) {
        return true;
      }
    }
    // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      tras2 != null &&
      tras2.children.length > 0 &&
      tras2.children[0].classList.contains("black")
    ) {
      var captura2 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) + 2) +
          "," +
          (parseInt(position[2]) - 2) +
          "']"
      );
      if (captura2 != null && captura2.children.length == 0) {
        return true;
      }
    }
  }
  // se tiver as classes piece black king
  if (
    peca.children[0].classList.contains("black") &&
    peca.children[0].classList.contains("king")
  ) {
    console.log("dama preta");
    // localize as casas que estão atraz da peça preta
    // dica: chame elas de tras 1 e tras 2
    var tras1 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) - 1) +
        "," +
        (parseInt(position[2]) + 1) +
        "']"
    );
    var tras2 = document.querySelector(
      "[data-position='" +
        (parseInt(position[0]) - 1) +
        "," +
        (parseInt(position[2]) - 1) +
        "']"
    );
    // se tiver uma peça adversária na casa 1, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      tras1 != null &&
      tras1.children.length > 0 &&
      tras1.children[0].classList.contains("white")
    ) {
      var captura1 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) - 2) +
          "," +
          (parseInt(position[2]) + 2) +
          "']"
      );
      if (captura1 != null && captura1.children.length == 0) {
        return true;
      }
    }
    // se tiver uma peça adversária na casa 2, calcule a posição da casa que está a frente da peça adversária e verifique se a mesma está vazia e existe
    if (
      tras2 != null &&
      tras2.children.length > 0 &&
      tras2.children[0].classList.contains("white")
    ) {
      var captura2 = document.querySelector(
        "[data-position='" +
          (parseInt(position[0]) - 2) +
          "," +
          (parseInt(position[2]) - 2) +
          "']"
      );
      if (captura2 != null && captura2.children.length == 0) {
        return true;
      }
    }
  }
  // se não tiver nenhuma peça adversária na frente da peça, retorne false
  return false;
}
