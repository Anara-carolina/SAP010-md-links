# Markdown Links
Bem-vindo ao projeto md-links-anara! Este módulo foi  desenvolvido para analisar e extrair links de arquivos Markdown. Ele é útil para verificar a integridade dos links em documentos Markdown e identificar links quebrados.


## 1- introdução

O Markdown Links é uma  biblioteca criada para simplificar a leitura e validação de links encontrados em arquivos no formato Markdown (extensão .md). Com uma interface de linha de comando (CLI) intuitiva, essa biblioteca é flexível o suficiente para ser usada em projetos Node.js e em aplicações de terminal.

A capacidade central do Markdown Links reside em sua habilidade de processar arquivos .md, identificando os links contidos dentro deles. Para aprimorar ainda mais essa funcionalidade, a biblioteca também oferece a opção de realizar a validação de cada link por meio de requisições HTTP, permitindo verificar se os links estão ativos ou quebrados.

Não apenas limitada à identificação e validação, o Markdown Links permite que você obtenha estatísticas valiosas sobre os links encontrados. Você pode obter informações como o total de links, a quantidade de links únicos e a quantidade de links quebrados. Essas estatísticas podem fornecer insights preciosos sobre a qualidade e a integridade dos seus documentos Markdown.

Seja para otimizar a gestão de links em projetos Node.js ou para aprimorar a experiência de interação com documentos Markdown, o Markdown Links é uma ferramenta versátil que simplifica tarefas complexas com facilidade."

## 2- Funcionalidades 
*Extração de Links em Arquivos Markdown

O Markdown Links é capaz de analisar arquivos Markdown (.md) e extrair todos os links presentes neles. Isso facilita a identificação de quaisquer links contidos nos documentos Markdown.

*Verificação do Status HTTP dos Links

Utilizando a opção --validate, o Markdown Links pode verificar o status HTTP de cada link extraído. Isso permite descobrir quais links estão ativos e quais estão quebrados, tornando mais fácil manter a integridade dos* seus documentos e recursos online.

*Estatísticas Detalhadas sobre os Links

Ao usar a opção --stats, o Markdown Links fornece estatísticas úteis sobre os links presentes nos arquivos. Essas estatísticas incluem o número total de links encontrados, quantos deles são únicos e quantos estão quebrados.

*Combinação de Opções para Estatísticas Detalhadas

Ao combinar as opções --stats e --validate, você obtém estatísticas detalhadas que incluem não apenas o número total de links e links únicos, mas também a quantidade de links que estão quebrados. Essa combinação de opções é especialmente útil para obter insights abrangentes sobre a qualidade dos links nos seus documentos.

Com o Markdown Links, você pode extrair, verificar e obter informações valiosas sobre os links presentes nos seus arquivos Markdown, facilitando a manutenção e aprimoramento dos seus documentos e projetos.

### 2.1- Instalação

Para usar essa ferramenta, você pode instalá-lo globalmente usando o npm. Abra o seu terminal e execute o seguinte comando:

```sh
npm install -g md-links-anara
```

### 2.2- Utilização


