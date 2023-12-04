// Funções reutilizaveis para os blocos de código JavaScript do Automa

function obterTextoBlocoDeCodigo(pagina, termo){
    let index = obterIndexArrayPorTermo(pagina, termo);
    let block = pagina[(index+1)]
    if(block.type !== "code"){
      block = pagina[(index+2)]
      if(block.type !== "code"){
        block = pagina[(index+3)]
        if(block.type !== "code"){
          block = pagina[(index+4)]
        }
      }
    }
    return block?.code?.rich_text?.[0]?.plain_text || null;
  }
  
  function obterIndexArrayPorTermo(pagina, termo){
    let resIndex = null;
    const block = pagina.find((objeto, index) => {
      if(buscaProfundaArrayJson(objeto, termo)){
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
  