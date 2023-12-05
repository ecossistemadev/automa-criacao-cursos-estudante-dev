// Funções reutilizaveis para os blocos de código JavaScript do Automa

function obterTextoBlocosDeLista(pagina, termo) {
  let index = obterIndexArrayPorTermo(pagina, termo);
  let block = null;
  for (let indexFor = 1; indexFor < 10; indexFor++) {
    block = pagina[(index + indexFor)]
    if (block.type == "bulleted_list_item") {
      return;
    }else{
      let lastBlock = pagina[(index + indexFor) - 1 ]
      if (block.type == "bulleted_list_item") {
        indexFor = 11;
        return;
      }
    }
  }
  return block?.bulleted_list_item?.rich_text?.[0]?.plain_text || null;
}

function obterTextoBlocoDeCodigo(pagina, termo) {
  let index = obterIndexArrayPorTermo(pagina, termo);
  let block = null;
  for (let indexFor = 1; indexFor < 5; indexFor++) {
    block = pagina[(index + indexFor)]
    if (block.type == "code") {
      return;
    }
  }
  return block?.code?.rich_text?.[0]?.plain_text || null;
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


console.log("")
console.log("Funções definidas!")
console.log("")
