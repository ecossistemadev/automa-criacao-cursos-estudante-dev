// Funções reutilizaveis para os blocos de código JavaScript do Automa

function obterTextoBlocoDeLink(blocos, termo) {
  let index = obterIndexArrayPorTermo(blocos, termo);
  let bloco = null;

  for (let indexFor = 1; indexFor < 10;) {
    bloco = blocos[(index + indexFor)]

    if (bloco?.type !== "bookmark") {
      indexFor++;
    } else {
      indexFor = 11;
    }
  }
  return bloco?.bookmark?.url || null;
}

function obterTextoBlocosDeListaEmArray(blocos, termo) {
  let index = obterIndexArrayPorTermo(blocos, termo);
  let lista = [];
  let bloco = null;

  for (let indexFor = 1; indexFor < 10;) {
    bloco = blocos[(index + indexFor)]

    if (bloco?.type !== "bulleted_list_item") {
      let blocoAnterior = blocos[((index + indexFor) - 1)]
      if (blocoAnterior?.type === "bulleted_list_item") {
        indexFor = 11;
      } else {
        indexFor++;
      }
    } else {
      lista.push(bloco?.bulleted_list_item?.rich_text?.[0]?.plain_text || null);
      indexFor++;
    }
  }
  return lista || null;
}

function obterTextoBlocosDeListaEmMarkdown(blocos, termo, simbolo = "*") {
  let index = obterIndexArrayPorTermo(blocos, termo);
  let markdown = ``;
  let bloco = null;

  for (let indexFor = 1; indexFor < 10;) {
    bloco = blocos[(index + indexFor)]

    if (bloco?.type !== "bulleted_list_item") {
      let blocoAnterior = blocos[((index + indexFor) - 1)]
      if (blocoAnterior?.type === "bulleted_list_item") {
        indexFor = 11;
      } else {
        indexFor++;
      }
    } else {
      let text = bloco?.bulleted_list_item?.rich_text?.[0]?.plain_text || null;
      if(text){
        markdown += `${simbolo} ${text || ""}\n`;
      }
      indexFor++;
    }
  }
  return markdown || "";
}

function obterTextoBlocoDeCodigo(blocos, termo) {
  let index = obterIndexArrayPorTermo(blocos, termo);
  let bloco = null;

  for (let indexFor = 1; indexFor < 10;) {
    bloco = blocos[(index + indexFor)]

    if (bloco?.type !== "code") {
      indexFor++;
    } else {
      indexFor = 11;
    }
  }
  return bloco?.code?.rich_text?.[0]?.plain_text || null;
}

function obterIndexArrayPorTermo(pagina, termo) {
  let resIndex = null;
  const block = pagina.find((objeto, index) => {
    if (buscaProfundaArrayJson(objeto, termo)) {
      resIndex = index;
      return objeto;
    }
  });
  return resIndex;
}

function buscaProfundaArrayJson(obj, termo) {
  for (const chave in obj) {
    if (typeof obj[chave] === 'object') {
      const encontrado = buscaProfundaArrayJson(obj[chave], termo);
      if (encontrado) return true;
    } else if (String(obj[chave]).includes(termo)) {
      return true;
    }
  }
  return false;
}

function loadCSS(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild(link);
}

console.log("")
console.log("Funções definidas!")
console.log("")
