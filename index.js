const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const fileExtension = path.extname(absolutePath);

    fs.access(absolutePath, fs.constants.F_OK)
      .then(() => {
        if (!validExtensions.includes(fileExtension)) {
          throw new Error('Arquivo não é Markdown');
        }

        return fs.readFile(absolutePath, 'utf-8');
      })
      .then(markdownContent => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];

        let match;
        while ((match = linkRegex.exec(markdownContent)) !== null) {
          const [, text, href] = match;
          links.push({ href, text, file: absolutePath });
        }

        const linkPromises = links.map(link => {
          return axios.head(link.href)
            .then(response => {
              link.ok = response.status >= 200 && response.status < 400;
              return link;
            })
            .catch(() => {
              link.ok = false;
              return link;
            });
        });

        Promise.all(linkPromises)
          .then(validatedLinks => {
            resolve(validatedLinks);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = mdLinks;