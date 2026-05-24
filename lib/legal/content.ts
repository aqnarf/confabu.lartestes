export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const siteName = "confabu.lab biblioteca";

export const termsDocument: LegalDocument = {
  title: "Termos e condicoes de uso",
  intro:
    "Este termo regula o acesso e uso da biblioteca virtual, em conformidade com a legislacao vigente, especialmente a Lei 9.610/1998, a Lei 12.965/2014 e o Codigo Civil Brasileiro.",
  sections: [
    {
      title: "Aceitacao dos termos",
      paragraphs: ["Ao acessar o site, o usuario declara ter lido, compreendido e aceitado integralmente as disposicoes deste termo."],
    },
    {
      title: "Objeto",
      paragraphs: [
        "O site disponibiliza obras intelectuais de terceiros, mediante autorizacao expressa de seus respectivos autores, exclusivamente para leitura online e sem finalidade lucrativa.",
      ],
    },
    {
      title: "Direitos autorais",
      paragraphs: [
        "Todo o conteudo disponibilizado encontra-se protegido pela legislacao de direitos autorais, sendo vedada qualquer utilizacao nao autorizada, nos termos da Lei 9.610/1998.",
      ],
    },
    {
      title: "Limitacoes de uso",
      paragraphs: ["E expressamente proibido ao usuario:"],
      items: [
        "reproduzir, copiar, distribuir ou divulgar o conteudo sem autorizacao;",
        "realizar armazenamento ou compartilhamento externo nao autorizado;",
        "utilizar o conteudo para fins comerciais ou publicos sem permissao;",
        "violar direitos autorais ou de propriedade intelectual.",
      ],
    },
    {
      title: "Responsabilidade do usuario",
      paragraphs: [
        "O usuario compromete-se a utilizar o site de forma etica e legal, responsabilizando-se por qualquer violacao a legislacao vigente.",
      ],
    },
    {
      title: "Remocao de conteudo",
      paragraphs: [
        "Nos termos do Marco Civil da Internet, o site podera remover conteudos mediante notificacao de violacao de direitos autorais, garantindo o contraditorio quando aplicavel.",
      ],
    },
    {
      title: "Limitacao de responsabilidade",
      paragraphs: [
        "O site atua como disponibilizador de conteudo autorizado e nao se responsabiliza por usos indevidos realizados por usuarios.",
      ],
    },
    {
      title: "Disposicoes gerais",
      paragraphs: ["Este termo podera ser alterado a qualquer tempo, mediante publicacao atualizada no site."],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  title: "Politica de privacidade",
  intro:
    "Este documento informa como dados pessoais dos usuarios podem ser coletados, utilizados e protegidos no ambito da biblioteca virtual, em conformidade com a Lei 13.709/2018.",
  sections: [
    {
      title: "Coleta de dados",
      paragraphs: ["O site podera coletar dados fornecidos pelo usuario e dados de navegacao necessarios ao funcionamento da plataforma."],
      items: ["nome e e-mail, quando fornecidos pelo usuario;", "IP, cookies e informacoes tecnicas de navegacao."],
    },
    {
      title: "Finalidade do tratamento",
      paragraphs: ["Os dados coletados destinam-se a:"],
      items: [
        "garantir o funcionamento do site;",
        "melhorar a experiencia do usuario;",
        "atender obrigacoes legais e regulatorias.",
      ],
    },
    {
      title: "Base legal",
      paragraphs: ["O tratamento de dados e realizado com fundamento no consentimento do usuario e no legitimo interesse, conforme a LGPD."],
    },
    {
      title: "Compartilhamento de dados",
      paragraphs: ["Os dados nao serao comercializados e poderao ser compartilhados apenas quando necessario para cumprimento legal ou ordem judicial."],
    },
    {
      title: "Direitos do titular",
      paragraphs: ["Nos termos da LGPD, o usuario podera solicitar acesso, correcao ou exclusao de seus dados, revogar consentimento e obter informacoes sobre o tratamento."],
    },
    {
      title: "Seguranca da informacao",
      paragraphs: ["O site adota medidas tecnicas e administrativas para protecao dos dados pessoais."],
    },
    {
      title: "Contato",
      paragraphs: ["Para exercer seus direitos, o usuario podera entrar em contato pelo canal indicado pelo projeto."],
    },
  ],
};

export const legalNoticeDocument: LegalDocument = {
  title: "Aviso legal",
  intro:
    "A biblioteca virtual atua exclusivamente como plataforma de disponibilizacao de conteudo literario mediante autorizacao de seus respectivos autores.",
  sections: [
    {
      title: "Protecao das obras",
      paragraphs: [
        "Todo o conteudo disponibilizado e protegido pela Lei 9.610/1998, sendo vedada sua reproducao, distribuicao ou qualquer forma de utilizacao nao autorizada.",
      ],
    },
    {
      title: "Finalidade nao comercial",
      paragraphs: [
        "O site nao realiza exploracao comercial das obras e nao se responsabiliza por eventuais usos indevidos praticados por usuarios.",
      ],
    },
    {
      title: "Solicitacao de remocao",
      paragraphs: [
        "Caso algum titular de direitos entenda que seu conteudo foi disponibilizado de forma indevida, podera solicitar a remocao por meio do canal de contato do projeto.",
      ],
    },
  ],
};

export const legalAcceptanceText =
  "Li e concordo com os Termos de Uso, a Politica de Privacidade e o Aviso Legal da biblioteca.";
