// Importando a função mdLinks do arquivo index.js
const mdLinks = require('./index.js');

// Caminho do arquivo Markdown que será analisado
const filePath = './README.md';

// Chamando a função mdLinks com o caminho do arquivo como argumento
mdLinks(filePath)
  .then(links => {
    // Imprimindo os links encontrados no console
    console.log(links);
  })
  .catch(error => {
    // Lidando com erros, caso ocorram, e imprimindo a mensagem de erro no console
    console.error('Erro:', error.message);
  });

// Exportando o mdLinks para ser utilizado em outros arquivos (opcional)
module.exports = mdLinks;
