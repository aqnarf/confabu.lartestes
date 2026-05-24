# Fluxo legal - etapa 5

Esta etapa adiciona paginas legais publicas e aceite simples antes de leitura ou download.

## Fontes

Os textos foram adaptados dos documentos DOCX fornecidos:

- `TERMOS E CONDICOES DE USO.docx`

## Paginas criadas

- `/termos`
- `/privacidade`
- `/aviso-legal`

Tambem foram adicionados links no rodape do site publico.

## Aceite

Quando `book.rights.requireTermsAcceptance` esta ativo:

- a pagina da obra exige aceite antes de habilitar "Abrir leitor" e "Baixar PDF";
- o leitor direto em `/read/[slug]` tambem exige aceite antes de mostrar o conteudo;
- o aceite e salvo no navegador com `localStorage`.

Chave usada:

```text
confabulab:legal-acceptance:[slug]
```

## Limites conhecidos

- O aceite ainda nao e registrado em banco.
- Nao ha historico por usuario, IP ou versao do termo.
- Os textos ainda devem passar por revisao juridica antes de publicacao definitiva.
- O termo de autorizacao de imagem nao faz parte do site publico nesta etapa.
