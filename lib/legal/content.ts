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
  title: "Termos e condições de uso",
  intro:
    "Este termo regula o acesso e uso da biblioteca virtual, em conformidade com a legislação vigente, especialmente a Lei 9.610/1998, a Lei 12.965/2014 e o Código Civil Brasileiro.",
  sections: [
    {
      title: "Aceitação dos termos",
      paragraphs: ["Ao acessar o site, o usuário declara ter lido, compreendido e aceitado integralmente as disposições deste termo."],
    },
    {
      title: "Objeto",
      paragraphs: [
        "O site disponibiliza obras intelectuais de terceiros, mediante autorização expressa de seus respectivos autores, exclusivamente para leitura online e sem finalidade lucrativa.",
      ],
    },
    {
      title: "Direitos autorais",
      paragraphs: [
        "Todo o conteúdo disponibilizado encontra-se protegido pela legislação de direitos autorais, sendo vedada qualquer utilização não autorizada, nos termos da Lei 9.610/1998.",
      ],
    },
    {
      title: "Limitacoes de uso",
      paragraphs: ["É expressamente proibido ao usuário:"],
      items: [
        "reproduzir, copiar, distribuir ou divulgar o conteúdo sem autorização;",
        "realizar armazenamento ou compartilhamento externo não autorizado;",
        "utilizar o conteúdo para fins comerciais ou públicos sem permissão;",
        "violar direitos autorais ou de propriedade intelectual.",
      ],
    },
    {
      title: "Responsabilidade do usuário",
      paragraphs: [
        "O usuário compromete-se a utilizar o site de forma ética e legal, responsabilizando-se por qualquer violação à legislação vigente.",
      ],
    },
    {
      title: "Remoção de conteúdo",
      paragraphs: [
        "Nos termos do Marco Civil da Internet, o site poderá remover conteúdos mediante notificação de violação de direitos autorais, garantindo o contraditório quando aplicável.",
      ],
    },
    {
      title: "Limitação de responsabilidade",
      paragraphs: [
        "O site atua como disponibilizador de conteúdo autorizado e não se responsabiliza por usos indevidos realizados por usuários.",
      ],
    },
    {
      title: "Disposições gerais",
      paragraphs: ["Este termo poderá ser alterado a qualquer tempo, mediante publicação atualizada no site."],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  title: "Política de privacidade",
  intro:
    "Este documento informa como dados pessoais dos usuários podem ser coletados, utilizados e protegidos no âmbito da biblioteca virtual, em conformidade com a Lei 13.709/2018.",
  sections: [
    {
      title: "Coleta de dados",
      paragraphs: ["O site poderá coletar dados fornecidos pelo usuário e dados de navegação necessários ao funcionamento da plataforma."],
      items: ["nome e e-mail, quando fornecidos pelo usuário;", "IP, cookies e informações técnicas de navegação."],
    },
    {
      title: "Finalidade do tratamento",
      paragraphs: ["Os dados coletados destinam-se a:"],
      items: [
        "garantir o funcionamento do site;",
        "melhorar a experiência do usuário;",
        "atender obrigações legais e regulatórias.",
      ],
    },
    {
      title: "Base legal",
      paragraphs: ["O tratamento de dados é realizado com fundamento no consentimento do usuário e no legítimo interesse, conforme a LGPD."],
    },
    {
      title: "Compartilhamento de dados",
      paragraphs: ["Os dados não serão comercializados e poderão ser compartilhados apenas quando necessário para cumprimento legal ou ordem judicial."],
    },
    {
      title: "Direitos do titular",
      paragraphs: ["Nos termos da LGPD, o usuário poderá solicitar acesso, correção ou exclusão de seus dados, revogar consentimento e obter informações sobre o tratamento."],
    },
    {
      title: "Segurança da informação",
      paragraphs: ["O site adota medidas técnicas e administrativas para proteção dos dados pessoais."],
    },
    {
      title: "Contato",
      paragraphs: ["Para exercer seus direitos, o usuário poderá entrar em contato pelo canal indicado pelo projeto."],
    },
  ],
};

export const legalNoticeDocument: LegalDocument = {
  title: "Aviso legal",
  intro:
    "A biblioteca virtual atua exclusivamente como plataforma de disponibilização de conteúdo literário mediante autorização de seus respectivos autores.",
  sections: [
    {
      title: "Proteção das obras",
      paragraphs: [
        "Todo o conteúdo disponibilizado é protegido pela Lei 9.610/1998, sendo vedada sua reprodução, distribuição ou qualquer forma de utilização não autorizada.",
      ],
    },
    {
      title: "Finalidade não comercial",
      paragraphs: [
        "O site não realiza exploração comercial das obras e não se responsabiliza por eventuais usos indevidos praticados por usuários.",
      ],
    },
    {
      title: "Solicitação de remoção",
      paragraphs: [
        "Caso algum titular de direitos entenda que seu conteúdo foi disponibilizado de forma indevida, poderá solicitar a remoção por meio do canal de contato do projeto.",
      ],
    },
  ],
};

export const legalAcceptanceText =
  "Li e concordo com os Termos de Uso, a Política de Privacidade e o Aviso Legal da biblioteca.";
