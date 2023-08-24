const fs = require('fs').promises;
const axios = require('axios');
const mdLinks = require('../index.js'); // Ajuste o caminho para o módulo mdLinks

// Configurar mocks
jest.mock('fs/promises', () => ({
  access: jest.fn(),
  readFile: jest.fn(),
}));

jest.mock('axios'); // Mock do módulo axios

describe('mdLinks', () => {
  it('deve extrair os links do arquivo Markdown', async () => {
    // Configurar mock para fs.promises.readFile
    fs.readFile.mockResolvedValue('Conteúdo do Markdown com links');

    // Configurar mock para axios.head
    axios.head.mockResolvedValue({ status: 200 }); // Simulando resposta bem-sucedida

    const links = await mdLinks('path-to-markdown-file.md');

    // Realizar asserções nos links aqui
  });

  it('deve lidar com links inválidos', async () => {
    // Configurar mock para fs.promises.readFile
    fs.readFile.mockResolvedValue('Conteúdo do Markdown com links inválidos');

    // Configurar mock para axios.head
    axios.head.mockRejectedValue(new Error('Erro de rede')); // Simulando falha de rede

    const links = await mdLinks('path-to-markdown-file.md');

    // Realizar asserções nos links aqui
  });

  // ... Adicione mais testes conforme necessário
});
