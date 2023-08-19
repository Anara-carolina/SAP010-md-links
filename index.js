// Importando a parte do Node.js que lida com arquivos e pastas
const fs = require('fs').promises;
// Importando a parte que lida com caminhos de arquivos e pastas
const path = require('path');

// Definindo a função mdLinks que recebe o caminho do arquivo como argumento
function mdLinks(filePath) {
  // Retornando uma promessa
  return new Promise((resolve, reject) => {
    // Obtendo o caminho absoluto do arquivo
    const absolutePath = path.resolve(filePath);
    // Lista de extensões válidas para arquivos Markdown
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    // Obtendo a extensão do arquivo
    const fileExtension = path.extname(absolutePath); // Retorna a extensão do arquivo.

    // Verificando se o arquivo existe
    fs.access(absolutePath, fs.constants.F_OK)
      .then(() => {
        // Verificando se a extensão é válida para um arquivo Markdown
        if (!validExtensions.includes(fileExtension)) {
          throw new Error('Arquivo não é Markdown'); // Rejeita a promessa se a extensão não for válida
        }

        // Lendo o conteúdo do arquivo
        return fs.readFile(absolutePath, 'utf-8');
      })
      .then(markdownContent => {
        // Expressão regular para encontrar links no formato Markdown
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g; // Padrões de links em formato Markdown
        // Lista para armazenar os links extraídos do conteúdo Markdown.
        const links = [];

        // Loop para encontrar todos os links no conteúdo Markdown
        let match;
        while ((match = linkRegex.exec(markdownContent)) !== null) {
          // Obtendo informações do link
          const [, text, href] = match;
          // Adicionando as informações do link à lista de links
          links.push({ href, text, file: absolutePath });
        }

        // Resolvendo a promessa com a lista de links encontrados
        resolve(links);
      })
      .catch(error => {
        // Rejeitando a promessa com a mensagem de erro
        reject(error); // Rejeita com a mensagem de erro, independente da origem
      });
  });
}

// Exportando a função mdLinks para uso em outros arquivos
module.exports = mdLinks;
