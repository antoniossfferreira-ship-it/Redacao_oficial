
import { Chapter } from './types';

export const DEFAULT_CHAPTERS: Chapter[] = [
  {
    id: 'fundamentos',
    title: '1. Fundamentos',
    description: 'Definição, importância e princípios fundamentais da Redação Oficial.',
    sections: [
      {
        id: 'definicao',
        title: 'O que é Redação Oficial?',
        content: `De acordo com o Manual da Presidência da República, Redação Oficial é:

        "A forma como o poder público redige comunicações e atos normativos, garantindo clareza, objetividade e uniformidade. Utiliza a norma culta, e segue princípios como impessoalidade, formalidade e padronização."`
      },
      {
        id: 'importancia',
        title: 'Importância da Redação Oficial',
        content: `A correta aplicação das normas é vital para a administração pública pois:

        • Facilita o acesso à informação pelo cidadão.
        • Garante clareza e precisão nas comunicações administrativas.
        • Padroniza procedimentos e documentos.
        • Fortalece a imagem institucional.
        • Melhora a eficiência comunicacional do serviço público.`
      },
      {
        id: 'principios',
        title: 'Princípios Fundamentais',
        content: `Todo texto oficial deve obedecer a estes cinco pilares:

        1. **Clareza**: Frases simples e diretas, sem ambiguidades.
        2. **Concisão**: Eliminar redundâncias e palavras desnecessárias.
        3. **Impessoalidade**: Foco no interesse público, não no servidor.
        4. **Coesão e coerência**: Ideias organizadas logicamente, com conexões claras.
        5. **Formalidade e civilidade**: Tom respeitoso e estritamente técnico.`
      }
    ]
  },
  {
    id: 'normas',
    title: '2. Normas Gerais e Siglas',
    description: 'Formatação, pronomes de tratamento e uso correto de siglas.',
    sections: [
      {
        id: 'normas-gerais',
        title: 'Normas Gerais',
        content: `Atenção aos detalhes de formatação e tratamento:

        • **Pronomes**: Uso correto de pronomes de tratamento, vocativos e endereçamentos.
        • **Fonte**: Recomendada Times New Roman 12 (citações longas tamanho 11 / notas de rodapé tamanho 10).
        • **Paginação**: Obrigatória a partir da segunda página.
        • **Evitar**: Superlativos ultrapassados como "Ilustríssimo" ou "Digníssimo".
        • **Doutor(a)**: Apenas para quem possui título acadêmico de doutorado.
        • **Cargo**: Em comunicação interna, identificar o destinatário pelo cargo.
        • **Assunto**: No início do texto, apresentar o assunto principal logo no 1º parágrafo.`
      },
      {
        id: 'siglas',
        title: 'Siglas e Acrônimos',
        content: `Regras para simplificar nomes de órgãos e entidades:

        • **Siglas de até 3 letras**: Todas maiúsculas.
        Ex: PM, SSP, ANP.

        • **Siglas longas ou acrônimos (4+ letras)**: Apenas a inicial maiúscula (se formarem palavra pronunciável).
        Ex: Denatran, Otan, Anvisa.

        • **Primeira ocorrência**: Deve vir acompanhada do nome por extenso e travessão.
        Ex: Secretaria de Segurança Pública – SSP.

        • **Sequência**: A partir da segunda citação no texto, usar apenas a sigla.`
      }
    ]
  },
  {
    id: 'hifen',
    title: '3. Uso do Hífen',
    description: 'Regras rápidas para não errar mais na ortografia.',
    sections: [
      {
        id: 'regras-hifen',
        title: '4 Regras Rápidas',
        content: `Memorize estas regras simples para o Novo Acordo Ortográfico:

        **1. Letras diferentes → JUNTA**
        Vogais ou consoantes diferentes se atraem.
        Exemplos: semicírculo, neoliberalismo, extraoficial, superintendente.

        **2. Letras iguais → SEPARA**
        Iguais se repelem.
        Exemplos: anti-inflamatório, sub-bibliotecário, arqui-inimigo, micro-ondas.

        **3. Prefixo + H → USA HÍFEN**
        O "H" pede separação.
        Exemplos: pré-história, anti-higiênico, sub-hepático.

        **4. Prefixo termina em vogal + R ou S → DOBRA**
        Se o prefixo termina em vogal e a palavra começa com R ou S, dobre a consoante e junte.
        Exemplos: antissocial, ultrassom, minissaia.`
      }
    ]
  },
  {
    id: 'documentos',
    title: '4. Estrutura de Documentos',
    description: 'Memorando, Ofício, Circular e E-mail Oficial.',
    sections: [
      {
        id: 'memorando',
        title: 'Memorando',
        content: `**Finalidade**: Comunicação interna entre unidades ou setores de um mesmo órgão.

        **Estrutura**:
        • Título (Memorando nº ___/ano/sigla)
        • Local e data
        • Destinatário
        • Assunto
        • Vocativo
        • Texto (parágrafos numerados)
        • Fecho (Atenciosamente ou Respeitosamente)`
      },
      {
        id: 'oficio',
        title: 'Ofício',
        content: `**Finalidade**: Comunicação externa com outros órgãos ou com particulares.

        **Estrutura**:
        • Título (Ofício nº ___/ano/sigla)
        • Local e data
        • Destinatário (tratamento + nome + cargo)
        • Assunto
        • Vocativo
        • Texto (parágrafos numerados)
        • Fecho
        • Assinatura e cargo`
      },
      {
        id: 'circular-email',
        title: 'Circular e E-mail',
        content: `**Circular**:
        Documento enviado a vários destinatários simultaneamente com texto idêntico. Segue estrutura similar ao ofício/memorando, identificando destinatários genéricos (Ex: Aos Chefes de Departamento).

        **E-mail Oficial**:
        • Assunto deve ser claro e objetivo.
        • Pode ter valor documental se possuir certificação digital.
        • Evitar informalidades, emojis e abreviações (vc, tbm).
        • Solicitar confirmação de leitura quando necessário.
        • Se houver anexo, descrever o conteúdo no corpo do e-mail.`
      }
    ]
  },
  {
    id: 'qualidade',
    title: '5. Guia de Qualidade',
    description: 'Erros comuns, reescrita e checklist final.',
    sections: [
      {
        id: 'erros',
        title: 'Erros Mais Comuns',
        content: `Evite estes vícios de linguagem:

        ❌ Uso de expressões ultrapassadas (“Venho por meio deste…”)
        ❌ Uso incorreto de “o mesmo” para retomar pessoas (Ex: Chamei o diretor e o mesmo disse... → Errado).
        ❌ Frases longas, emocionais ou vagas.
        ❌ Falta de objetividade.
        ❌ Informações implícitas ou pouco claras.`
      },
      {
        id: 'reescrita',
        title: 'Exemplos de Reescrita',
        content: `**Exemplo 1**
        ❌ “Venho comunicar que o servidor não entregou o relatório porque está de licença.”
        ✅ “Comunica-se que o relatório não foi entregue em razão do afastamento temporário do responsável.”

        **Exemplo 2**
        ❌ “Aproveito o ensejo para solicitar a entrega do material para este setor.”
        ✅ “Solicita-se o envio do material para este setor.”

        **Exemplo 3**
        ❌ “O mesmo encaminhou o documento solicitado.”
        ✅ “O servidor encaminhou o documento solicitado.”`
      },
      {
        id: 'checklist',
        title: 'Checklist Final',
        content: `Antes de enviar, verifique:

        □ O texto está claro e impessoal?
        □ Há redundâncias ou frases longas?
        □ O vocativo está correto?
        □ O assunto está direto e objetivo?
        □ As siglas foram explicadas na primeira ocorrência?
        □ A estrutura do documento está completa?
        □ Há coerência entre os parágrafos?
        □ O documento segue as normas do Manual da Presidência?`
      }
    ]
  }
];
