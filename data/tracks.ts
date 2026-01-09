import { TrackData } from '../types';

export const DATA: TrackData[] = [
  {
    id: 'setup',
    title: 'O INÍCIO',
    color: 'stone',
    description: 'Setup Obrigatório',
    cards: [
      {
        id: 'z1',
        cardTitle: 'SEU TEMA',
        cardSubtitle: 'O que você fala',
        status: 'unlocked', // Initial state in data, logic will override based on context
        techniqueTitle: 'VETOR DE POSICIONAMENTO',
        techniqueDescription: 'O algoritmo categoriza criadores por clusters. A técnica exige cruzar Habilidade Técnica com Demanda de Mercado.',
        activationCommand: 'Arthur, inicie o Diagnóstico de Vetor. Conduza a entrevista para extrair meus dados e encontrar a intersecção de mercado mais lucrativa para mim.'
      },
      {
        id: 'z2',
        cardTitle: 'SUA MARCA',
        cardSubtitle: 'Nome e Arroba',
        status: 'locked',
        techniqueTitle: 'SEO INDEXING',
        techniqueDescription: 'O Nome (Título) serve para busca e deve conter palavras-chave. O @ serve para branding e deve ser limpo.',
        activationCommand: 'Inicie o Protocolo de Naming. Me faça as perguntas necessárias para entender meu posicionamento e gere as opções de Nome e Arroba otimizadas.'
      },
      {
        id: 'z3',
        cardTitle: 'SUA FOTO',
        cardSubtitle: 'Imagem de Perfil',
        status: 'locked',
        techniqueTitle: 'SEMIÓTICA DE CONTRASTE',
        techniqueDescription: 'Utilize a separação Figura-Fundo. Fundo sólido oposto à cor da roupa destaca a silhueta e projeta autoridade em thumbnails pequenas.',
        activationCommand: 'Vamos validar minha Imagem de Perfil. Comece a análise fazendo as perguntas pertinentes para verificar se minha foto cumpre os requisitos de autoridade.'
      },
      {
        id: 'z4',
        cardTitle: 'SUA BIO',
        cardSubtitle: 'Resumo do Perfil',
        status: 'locked',
        techniqueTitle: 'FUNIL DE 3 LINHAS',
        techniqueDescription: 'Estrutura de conversão obrigatória: 1. Autoridade (Prova) + 2. Promessa (Benefício) + 3. CTA (Ordem).',
        activationCommand: 'Inicie a construção da Bio de Conversão. Conduza o interrogatório para extrair os elementos necessários e monte as opções seguindo o Funil.'
      }
    ]
  },
  {
    id: 'influencer',
    title: 'O CRIADOR',
    color: 'cyan',
    description: 'Viralização',
    cards: [
      { id: 'i1', cardTitle: 'O GANCHO', cardSubtitle: '3 Segundos', status: 'locked', techniqueTitle: 'ENGENHARIA DE ATENÇÃO', techniqueDescription: 'Interrupção visual ou paradoxo cognitivo no frame zero.', activationCommand: 'Arthur, vamos criar meus Ganchos. Analise meu nicho e conduza a criação de 3 opções de início de vídeo focadas em quebra de padrão.' },
      { id: 'i2', cardTitle: 'A EDIÇÃO', cardSubtitle: 'Retenção', status: 'locked', techniqueTitle: 'DINÂMICA DE PACING', techniqueDescription: 'Mudança de estímulo a cada 4 segundos para manter dopamina.', activationCommand: 'Inicie o Protocolo de Edição. Me dê instruções práticas de como editar meu próximo vídeo para garantir retenção.' },
      { id: 'i3', cardTitle: 'A TRIBO', cardSubtitle: 'Fãs Reais', status: 'locked', techniqueTitle: 'ENGAJAMENTO TRIBAL', techniqueDescription: 'Transformar comentários em palco secundário de conteúdo.', activationCommand: 'Vamos engajar minha base. Sugira qual polêmica plantar para gerar uma chuva de comentários.' },
      { id: 'i4', cardTitle: 'O KIT', cardSubtitle: 'Marcas', status: 'locked', techniqueTitle: 'APRESENTAÇÃO COMERCIAL', techniqueDescription: 'One-Page Mídia Kit provando demografia e engajamento.', activationCommand: 'Inicie a construção do meu Mídia Kit. Me faça as perguntas sobre meus números atuais.' }
    ]
  },
  {
    id: 'authority',
    title: 'O MESTRE',
    color: 'red',
    description: 'Vendas e Info',
    cards: [
      { id: 'a1', cardTitle: 'AS IDEIAS', cardSubtitle: 'Matriz 4x4', status: 'locked', techniqueTitle: 'SISTEMATIZAÇÃO DE PAUTAS', techniqueDescription: '1 Dor = 4 Vídeos (Mito, Erro, Dica, Análise).', activationCommand: 'Arthur, ative a Matriz 4x4. Me entreviste para extrair uma dor e gerar 4 roteiros baseados nela.' },
      { id: 'a2', cardTitle: 'O ROTEIRO', cardSubtitle: 'Ensinar e Vender', status: 'locked', techniqueTitle: 'ESTRUTURA CAVALO DE TROIA', techniqueDescription: 'Entregue o diagnóstico grátis e venda o método no final.', activationCommand: 'Vamos escrever um Vídeo de Vendas. Conduza o processo para criar um roteiro conversor.' },
      { id: 'a3', cardTitle: 'A ISCA', cardSubtitle: 'Sair do Insta', status: 'locked', techniqueTitle: 'MIGRAÇÃO DE PLATAFORMA', techniqueDescription: 'Oferecer micro-resultado (PDF) em troca de Email/Zap.', activationCommand: 'Inicie a estratégia de Funil. Sugira 3 ideias de Iscas Digitais irresistíveis.' },
      { id: 'a4', cardTitle: 'O TRÁFEGO', cardSubtitle: 'Escala', status: 'locked', techniqueTitle: 'AMPLIFICAÇÃO ESTRATÉGICA', techniqueDescription: 'Injetar verba apenas no vídeo orgânico campeão (Outlier).', activationCommand: 'Vamos escalar. Me ajude a definir o público-alvo no Ads para meu melhor vídeo.' }
    ]
  },
  {
    id: 'shop',
    title: 'O VENDEDOR',
    color: 'emerald',
    description: 'Produtos Físicos',
    cards: [
      { id: 's1', cardTitle: 'A LOJA', cardSubtitle: 'Confiança', status: 'locked', techniqueTitle: 'HEURÍSTICA DE CREDIBILIDADE', techniqueDescription: 'Sinais visuais que reduzem fricção de compra em perfil novo.', activationCommand: 'Faça uma auditoria de vitrine. Me peça os detalhes do meu perfil e aponte o que impede vendas.' },
      { id: 's2', cardTitle: 'A DOR', cardSubtitle: 'Vídeo de Venda', status: 'locked', techniqueTitle: 'AGITAÇÃO NEURAL', techniqueDescription: 'Agite a dor antes de mostrar o produto.', activationCommand: 'Vamos criar um roteiro de conversão. Me pergunte sobre o produto e crie um roteiro de Dor.' },
      { id: 's3', cardTitle: 'O REVIEW', cardSubtitle: 'Prova Social', status: 'locked', techniqueTitle: 'UGC (USER GENERATED)', techniqueDescription: 'Estética de cliente real quebra o filtro anti-anúncio.', activationCommand: 'Escreva um roteiro de UGC que pareça 100% espontâneo e sincero.' },
      { id: 's4', cardTitle: 'O IMPULSO', cardSubtitle: 'Ads', status: 'locked', techniqueTitle: 'SPARK ADS', techniqueDescription: 'Transformar review em anúncio nativo com botão de compra.', activationCommand: 'Prepare minha campanha de Spark Ads e Copy para maximizar cliques.' }
    ]
  }
];