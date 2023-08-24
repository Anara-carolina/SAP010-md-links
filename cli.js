// Importando a função mdLinks do arquivo index.js
const mdLinks = require('./index.js');
const chalk = require('chalk');


// Caminho do arquivo Markdown que será analisado
const filePath = './README.md';

// Chamando a função mdLinks com o caminho do arquivo como argumento
mdLinks(filePath)
  .then(links => {
    console.log(links);
  })
  .catch(error => {
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
    let totalValidated = 0;
    let totalBroken = 0;

    if (validate) {
      links.forEach((link) => {
        if (link.ok) {
          console.log(chalk.blue(`✔ ${link.href} - ${link.text}`));
          totalValidated++;
           } else {
          console.log(chalk.red(` ${link.href} - ${link.text}`));
          totalBroken++;
        }
      });

      console.log(chalk.green(`✔ Total Validado: ${totalValidated}`));
      console.log(chalk.red(`✘ Total quebrado: ${totalBroken}`));

    } else if (stats) {
      const totalLinks = links.length;
      const uniqueLinks = [...new Set(links.map((link) => link.href))].length;
      console.log(chalk.blue(`Total: ${totalLinks}`));
      console.log(chalk.blue(`Unique: ${uniqueLinks}`));
    } else {
      links.forEach((link) => {
        console.log(`${link.href} - ${link.text}`);
      });
      console.log(chalk.blue(`Total: ${totalLinks}`));
      console.log(chalk.blue(`Unique: ${uniqueLinks}`));

      totalValidated = totalLinks; // Considerando todos os links como validados para fins de estatísticas

    }
  })
  .catch((error) => {
    console.error(chalk.red('Erro:', error.message));
  });
// Exportando o mdLinks para ser utilizado em outros arquivos (opcional)
module.exports = mdLinks;

