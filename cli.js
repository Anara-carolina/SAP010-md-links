// Importando a função mdLinks do arquivo index.js
const mdLinks = require('./index.js');
const chalk = require('chalk');


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

  const path = process.argv[2]; // Obtém o caminho a partir dos argumentos da linha de comando

// Verifica se a opção --validate foi fornecida
const validateOptionIndex = process.argv.indexOf('--validate');
const validate = validateOptionIndex !== -1;

// Verifica se a opção --stats foi fornecida
const statsOptionIndex = process.argv.indexOf('--stats');
const stats = statsOptionIndex !== -1;

// Chama a função mdLinks com o caminho do arquivo e as opções
mdLinks(path, { validate, stats })
  .then((links) => {
    if (validate) {
      links.forEach((link) => {
        if (link.ok) {
          console.log(chalk.green(`✔ ${link.href} - ${link.text}`));
        } else {
          console.log(chalk.red(`✘ ${link.href} - ${link.text}`));
        }
      });
    } else if (stats) {
      const totalLinks = links.length;
      const uniqueLinks = [...new Set(links.map((link) => link.href))].length;
      console.log(chalk.blue(`Total: ${totalLinks}`));
      console.log(chalk.blue(`Unique: ${uniqueLinks}`));
    } else {
      links.forEach((link) => {
        console.log(`${link.href} - ${link.text}`);
      });
    }
  })
  .catch((error) => {
    console.error(chalk.red('Erro:', error.message));
  });
// Exportando o mdLinks para ser utilizado em outros arquivos (opcional)
module.exports = mdLinks;

