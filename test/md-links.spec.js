const fs = require('fs').promises;
const axios = require('axios');
const mdLinks = require('../index.js'); // Ajuste o caminho para o módulo mdLinks

jest.mock('axios');  // Criando um mock para o Axios

describe('mdLinks', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks entre os testes
  });

  test('deveria retornar uma promise', () => {
    const result = mdLinks('./exemplos/exemplo1.md');
    expect(result).toBeInstanceOf(Promise);
  });

  test('deveria funcionar com um arquivo Markdown válido', () => {
    // Simulando a resposta do fs.access
    fs.access = jest.fn().mockResolvedValue();
    // Simulando a resposta do fs.readFile
    fs.readFile = jest.fn().mockResolvedValue('[Google](https://www.google.com)\n');
    // Simulando a resposta do axios.head
    axios.head.mockResolvedValue({ status: 200 });

    return mdLinks('./caminho/para/seu/arquivo.md').then(links => {
      expect(links).toHaveLength(1);
      expect(links[0]).toEqual({
        href: 'https://www.google.com',
        text: 'Google',
        file: '/caminho/para/seu/arquivo.md',
        ok: true
      });
    });
  });

  test('deveria rejeitar com erro para um arquivo que não é Markdown', () => {
    // Simulando a resposta do fs.access para um arquivo inválido
    fs.access = jest.fn().mockRejectedValue(new Error('Arquivo não é Markdown'));

    return expect(mdLinks('./caminho/para/arquivo.txt')).rejects.toThrow('Arquivo não é Markdown');
  });
});
