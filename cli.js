const fs = require('fs');
const path = require('path');
const mdLinks = require('./index.js');
const chalk = require('chalk');

const directoryPath = './';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Erro ao ler o diretório:', err);
    return;
  }

  const markdownFiles = files.filter((file) => path.extname(file) === '.md');

  markdownFiles.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    mdLinks(filePath)
      .then((links) => {
        console.log(`Links no arquivo ${file}:`);
        links.forEach((link) => {
          console.log(`${link.href} - ${link.text}`);
        });
      })
      .catch((error) => {
        console.error(`Erro no arquivo ${file}: ${error.message}`);
      });
  });
});

const filePath = process.argv[2]; 

const validateOptionIndex = process.argv.indexOf('--validate');
const validate = validateOptionIndex !== -1;

const statsOptionIndex = process.argv.indexOf('--stats');
const stats = statsOptionIndex !== -1;

mdLinks(filePath, { validate, stats })
  .then((links) => {
    let totalValidated = 0;
    let totalBroken = 0;

    if (validate) {
      links.forEach((link) => {
        if (link.ok) {
          console.log(chalk.blue(`✔ ${link.href} - ${link.text}`));
          totalValidated++;
        } else {
          console.log(chalk.red(`✘ ${link.href} - ${link.text}`));
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
    }
  })
  .catch((error) => {
    console.error(chalk.red('Erro:', error.message));
  });


module.exports = mdLinks;

