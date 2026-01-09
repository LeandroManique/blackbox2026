import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Target, Zap } from 'lucide-react'; 
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface ChatTerminalProps {
  initialCommand: string;
  onComplete?: () => void;
  cardId?: string;
}

// --- SYSTEM CORE: A MENTE DE 16 CAMADAS DO ARTHUR ---
const generateResponse = (input: string, step: number, cardId?: string): { text: string, nextStep: number } => {
  const lowerInput = input.toLowerCase();
  // Tratamento de segurança para IDs (garante string limpa)
  const safeId = cardId ? cardId.toLowerCase() : '';

  // =================================================================================
  // TRILHA 1: O INÍCIO (SETUP) [z1-z4]
  // =================================================================================

  // Z1: VETOR (NICHO)
  if (safeId.includes('z1') || lowerInput.includes('vetor')) {
    if (step === 0) return {
        text: "PROTOCOL: VECTOR_TRIANGULATION\n\nVamos encontrar o seu lugar no mercado.\n\nFase 1: O TERRITÓRIO.\nSobre qual grande tema você quer falar? (Ex: Arquitetura, Doces, Inglês, Finanças).",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Território: "${input}".\n\nAgora vamos encontrar o OURO aí dentro. Para não ser "mais um", precisamos de um ângulo.\n\nPERGUNTA DE REFINAMENTO:\nQual é o público específico ou a dor que os concorrentes ignoram? (Ex: Em vez de 'Doces', diga 'Doces sem açúcar para diabéticos').\n\nDefina seu sub-nicho:`,
        nextStep: 2
    };
    return {
        text: `DIAGNÓSTICO FINAL:\n\nVocê não venderá conteúdo genérico de ${input}. Você venderá a SOLUÇÃO ESPECÍFICA para esse sub-nicho.\n\nPosicionamento: O Especialista.\nUse sua habilidade técnica para resolver a dor desse público de forma previsível.`,
        nextStep: 3
    };
  }

  // Z2: MARCA (NAMING)
  if (safeId.includes('z2') || lowerInput.includes('marca')) {
    if (step === 0) return {
        text: "PROTOCOL: SEO_INDEXING\n\nO nome serve para ser ENCONTRADO.\n\nPASSO 1: A BUSCA.\nQual é a palavra-chave principal que o cliente digita na busca? (A Keyword Mestra).",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Keyword: "${input}".\n\nPASSO 2: PERSONALIDADE.\nComo você quer ser percebido? (Sério, Acessível, Agressivo?). Me dê um adjetivo ou seu sobrenome.`,
        nextStep: 2
    };
    return {
        text: `GERANDO NOMES OTIMIZADOS:\n\n1. Autoridade: @[Sobrenome].${input}\n2. Busca Direta: @${input}.[Adjetivo]\n3. Institucional: @Protocolo.${input}\n\nRegra: Sem números aleatórios, sem pontos desnecessários.`,
        nextStep: 3
    };
  }

  // Z3: FOTO (SEMIÓTICA)
  if (safeId.includes('z3') || lowerInput.includes('foto')) {
    if (step === 0) return {
        text: "PROTOCOL: VISUAL_CONTRAST\n\nSua foto compete com mil outras.\n\nPASSO 1: O SUJEITO.\nQual a cor da roupa que você vai usar na foto? (Ideal: Cores sólidas).",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Roupa: "${input}".\n\nPara ativar o contraste semiótico, o fundo precisa ser o OPOSTO.\n\nPASSO 2: O FUNDO.\nSe a roupa é clara, o fundo deve ser escuro (e vice-versa). Qual cor você pensou para o fundo?`,
        nextStep: 2
    };
    return {
        text: "VALIDAÇÃO VISUAL:\n\nSe usou opostos (Ex: Amarelo no Preto, Branco no Azul Escuro), você terá destaque.\n\nInstrução: Corte a foto em Close-up. O rosto deve ocupar 60% da bolinha.",
        nextStep: 3
    };
  }

  // Z4: BIO (FUNIL)
  if (safeId.includes('z4') || lowerInput.includes('bio')) {
    if (step === 0) return {
        text: "PROTOCOL: 3_LINE_FUNNEL\n\nSua bio é uma Landing Page.\n\nLINHA 1 (PROVA):\nMe dê um número que imponha respeito imediato (Alunos, Anos, Faturamento).",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Prova recebida. Agora a conversão.\n\nLINHA 2 (PROMESSA):\nComplete: 'Eu ensino você a...' (Foque no RESULTADO FINAL. Ex: 'Perder 5kg', 'Investir do zero').`,
        nextStep: 2
    };
    return {
        text: `COMPILANDO BIO:\n\n📍 [PROVA SOCIAL]\n🚀 Ajudo você a ${input}\n👇 Comece por aqui (Link)\n\nInstale e não mude por 30 dias.`,
        nextStep: 3
    };
  }

  // =================================================================================
  // TRILHA 2: O CRIADOR (INFLUENCER) [i1-i4]
  // =================================================================================

  // I1: O GANCHO (3 SEGUNDOS)
  if (safeId.includes('i1') || lowerInput.includes('gancho')) {
    if (step === 0) return {
        text: "PROTOCOL: ATTENTION_ENGINEERING\n\nO vídeo morre nos primeiros 3 segundos.\n\nPASSO 1: O TEMA.\nSobre o que é o seu próximo vídeo? Seja breve.",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Tema: "${input}".\n\nAgora vamos quebrar o padrão. O erro é começar dizendo "Oi gente".\n\nPASSO 2: A QUEBRA.\nQual é a maior mentira ou erro que as pessoas cometem sobre esse tema?`,
        nextStep: 2
    };
    return {
        text: "ESTRUTURA DE GANCHO GERADA:\n\nVisual: Segure um objeto estranho ou faça um movimento rápido.\nFala: 'Pare de fazer [ERRO] se você quer [RESULTADO].'\n\nIsso gera o paradoxo cognitivo que prende a atenção.",
        nextStep: 3
    };
  }

  // I2: A EDIÇÃO (RETENÇÃO)
  if (safeId.includes('i2') || lowerInput.includes('edição')) {
    if (step === 0) return {
        text: "PROTOCOL: PACING_DYNAMICS\n\nEdição não é efeito, é ritmo.\n\nPASSO 1: O ESTILO.\nSeu vídeo é falado (Vlog/Talking Head) ou narrado (Voz off)?",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Estilo: "${input}".\n\nO cérebro busca novidade a cada 4 segundos.\n\nPASSO 2: A MUDANÇA.\nVocê tem B-Rolls (imagens de cobertura) ou vai usar zoom in/out?`,
        nextStep: 2
    };
    return {
        text: "PROTOCOL DE RETENÇÃO:\n\n1. Corte todo 'respiro' entre frases.\n2. A cada 4s, mude algo (Zoom, Texto na tela, B-Roll).\n3. Legendas dinâmicas (uma palavra por vez) aumentam a retenção em 20%.",
        nextStep: 3
    };
  }

  // I3: A TRIBO (ENGAJAMENTO)
  if (safeId.includes('i3') || lowerInput.includes('tribo')) {
    if (step === 0) return {
        text: "PROTOCOL: TRIBAL_ENGAGEMENT\n\nFãs não seguem conteúdo, seguem valores.\n\nPASSO 1: O INIMIGO COMUM.\nQuem ou o que a sua tribo odeia? (Ex: 'Gurus falsos', 'Burocracia', 'Dieta de fome').",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Inimigo: "${input}". Excelente.\n\nPASSO 2: A DEFESA.\nQual verdade dura você precisa falar para defender sua tribo desse inimigo?`,
        nextStep: 2
    };
    return {
        text: `ESTRATÉGIA DE POLARIZAÇÃO:\n\nFaça um vídeo batendo no Inimigo Comum (${input}).\nTermine perguntando: 'Você concorda ou prefere continuar sendo enganado?'\nIsso vai explodir os comentários.`,
        nextStep: 3
    };
  }

  // I4: O KIT (MÍDIA KIT)
  if (safeId.includes('i4') || lowerInput.includes('kit')) {
    if (step === 0) return {
        text: "PROTOCOL: COMMERCIAL_PRESENTATION\n\nMarcas querem números, não arte.\n\nPASSO 1: O ALCANCE.\nQual foi sua média de views nos últimos 30 dias? (Some os últimos 10 vídeos e divida por 10).",
        nextStep: 1
    };
    return {
        text: `ESTRUTURA ONE-PAGE:\n\nCrie um PDF de uma página com:\n1. Foto Profissional + Bio.\n2. Estatística Principal: ${input} média de views.\n3. Quem te segue (Homem/Mulher, Idade).\n4. 'Marcas que já trabalhei' (ou 'Espaço para sua marca').\n\nEnvie apenas isso.`,
        nextStep: 3 // Pula step 2 para ser direto
    };
  }

  // =================================================================================
  // TRILHA 3: O MESTRE (AUTORIDADE/INFO) [a1-a4]
  // =================================================================================

  // A1: AS IDEIAS (MATRIZ 4X4)
  if (safeId.includes('a1') || lowerInput.includes('ideias')) {
    if (step === 0) return {
        text: "PROTOCOL: CONTENT_MATRIX_4X4\n\nUma dor gera 4 vídeos.\n\nPASSO 1: A DOR.\nQual a dúvida nº 1 que te mandam no direct? (Ex: 'Como investir pouco').",
        nextStep: 1
    };
    return {
        text: `MATRIZ GERADA PARA '${input}':\n\n1. O MITO: 'Dizem que precisa ser rico, é mentira.'\n2. O ERRO: 'Você perde dinheiro na poupança.'\n3. A DICA: 'Comece com 30 reais nisso aqui...'\n4. A ANÁLISE: 'Reagindo à carteira de um seguidor.'\n\nGrave os 4.`,
        nextStep: 3
    };
  }

  // A2: O ROTEIRO (CAVALO DE TROIA)
  if (safeId.includes('a2') || lowerInput.includes('roteiro')) {
    if (step === 0) return {
        text: "PROTOCOL: TROJAN_HORSE\n\nEnsine para vender.\n\nPASSO 1: O DESEJO.\nO que seu aluno quer muito conseguir? (Ex: 'Tocar violão').",
        nextStep: 1
    };
    return {
        text: `ESTRUTURA DE VENDAS:\n\n1. Gancho: 'Como ${input} em tempo recorde.'\n2. Conteúdo: Ensine 1 técnica rápida (vitória imediata).\n3. O Gap: 'Isso é só 1% do método.'\n4. Pitch: 'Se quer o resto, clique no link.'`,
        nextStep: 3
    };
  }

  // A3: A ISCA (LEAD MAGNET)
  if (safeId.includes('a3') || lowerInput.includes('isca')) {
    if (step === 0) return {
        text: "PROTOCOL: PLATFORM_MIGRATION\n\nSeguidor não é dono. Lead é dono.\n\nPASSO 1: A FERRAMENTA.\nO que você pode entregar em PDF que resolve uma dor rápida? (Checklist, Planilha, Guia).",
        nextStep: 1
    };
    return {
        text: `ESTRATÉGIA DE CAPTURA:\n\nCrie o material '${input}'.\nNos stories, diga: 'Preparei o ${input}. Quem quiser, digite EU QUERO que te mando no direct.'\n\nUse automação (ManyChat) para pegar o email em troca do PDF.`,
        nextStep: 3
    };
  }

  // A4: O TRÁFEGO (ADS)
  if (safeId.includes('a4') || lowerInput.includes('tráfego')) {
    if (step === 0) return {
        text: "PROTOCOL: STRATEGIC_AMPLIFICATION\n\nSó impulsione o que já funcionou.\n\nPASSO 1: O CAMPEÃO.\nQual foi seu melhor vídeo orgânico este mês?",
        nextStep: 1
    };
    return {
        text: `CONFIGURAÇÃO DE ADS:\n\nPegue o vídeo '${input}'.\nObjetivo: Visitas no Perfil (para ganhar seguidor) ou Conversão (para vender).\nPúblico: Aberto (Deixe o algoritmo achar com base no vídeo).\nVerba: R$ 20/dia por 3 dias. Se der bom, dobre.`,
        nextStep: 3
    };
  }

  // =================================================================================
  // TRILHA 4: O VENDEDOR (LOJA) [s1-s4]
  // =================================================================================

  // S1: A LOJA (VITRINE)
  if (safeId.includes('s1') || lowerInput.includes('loja')) {
    if (step === 0) return {
        text: "PROTOCOL: CREDIBILITY_HEURISTICS\n\nCliente confuso não compra.\n\nPASSO 1: O DESTAQUE.\nVocê tem Destaques de 'Clientes' e 'Quem Sou'? (Sim/Não).",
        nextStep: 1
    };
    return {
        text: "AUDITORIA DE VITRINE:\n\nSe não tem, crie hoje.\n1. Destaque 'Entregas': Reposte stories de clientes recebendo.\n2. Bio: Link direto para o produto (sem árvore de links confusa).\n3. Foto: Logo nítido ou rosto do dono.",
        nextStep: 3
    };
  }

  // S2: A DOR (AGITAÇÃO)
  if (safeId.includes('s2') || lowerInput.includes('dor')) {
    if (step === 0) return {
        text: "PROTOCOL: NEURAL_AGITATION\n\nNão venda o produto, venda o alívio.\n\nPASSO 1: O PRODUTO.\nO que você vende? (Ex: Tênis, Consultoria, Ebook).",
        nextStep: 1
    };
    if (step === 1) return {
        text: `Produto: "${input}".\n\nPASSO 2: O INCÔMODO.\nO que acontece de ruim na vida da pessoa se ela NÃO tiver isso? (Ex: 'Dores nas costas', 'Dinheiro parado').`,
        nextStep: 2
    };
    return {
        text: `ROTEIRO DE AGITAÇÃO:\n\n'Você está cansado de [INCÔMODO]?\nEu sei como é. A culpa não é sua, é da ferramenta errada.\nConheça o ${input}: A única forma de resolver isso hoje.'`,
        nextStep: 3
    };
  }

  // S3: O REVIEW (UGC)
  if (safeId.includes('s3') || lowerInput.includes('review')) {
    if (step === 0) return {
        text: "PROTOCOL: UGC_AUTHENTICITY\n\nVídeo com cara de anúncio é ignorado.\n\nPASSO 1: O CENÁRIO.\nOnde seu produto é usado na vida real? (Ex: Cozinha, Academia, Escritório).",
        nextStep: 1
    };
    return {
        text: `ROTEIRO UGC (USER GENERATED):\n\nGrave usando o celular na mão, sem tripé, no cenário '${input}'.\nScript: 'Gente, eu precisava mostrar isso. Chegou hoje e mudou meu dia. Olha esse detalhe...'\n\nSem edição profissional. A imperfeição vende verdade.`,
        nextStep: 3
    };
  }

  // S4: O IMPULSO (SPARK ADS)
  if (safeId.includes('s4') || lowerInput.includes('impulso')) {
    if (step === 0) return {
        text: "PROTOCOL: SPARK_ADS_CONVERSION\n\nTransforme conteúdo em venda.\n\nPASSO 1: O ID.\nVocê tem o código do vídeo de review postado no TikTok?",
        nextStep: 1
    };
    return {
        text: "EXECUÇÃO SPARK:\n\n1. Vá no Gerenciador de Anúncios.\n2. Selecione 'Usar conta TikTok existente'.\n3. Escolha o post do Review.\n4. Botão: 'Comprar Agora'.\n\nIsso mantém os likes e comentários originais, aumentando a prova social do anúncio.",
        nextStep: 3
    };
  }

  // FALLBACK GENÉRICO (SEGURANÇA FINAL)
  return {
      text: "PROTOCOLO DE SEGURANÇA ATIVO.\n\nNão identifiquei o padrão exato para esta carta. \nPor favor, detalhe sua necessidade ou clique em reiniciar.",
      nextStep: step
  };
};

export default function ChatTerminal({ initialCommand, onComplete, cardId }: ChatTerminalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0); 
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inicialização
  useEffect(() => {
    if (initialCommand && messages.length === 0) {
      setMessages([{ role: 'user', text: initialCommand }]);
      setIsTyping(true);
      
      setTimeout(() => {
        // Passa o cardId para a função de resposta saber o contexto
        // Step 0 - Input is irrelevant (but used for generic check)
        const response = generateResponse(initialCommand, 0, cardId);
        setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
        setStep(response.nextStep); 
        setIsTyping(false);
      }, 1500);
    }
  }, [initialCommand, cardId]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const currentInput = inputText;
    const userMsg: Message = { role: 'user', text: currentInput };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      // Passa cardId e input atual
      // We pass `currentInput` to generateResponse, which calculates the NEXT step response.
      const response = generateResponse(currentInput, step, cardId); 
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
      setStep(response.nextStep);
      setIsTyping(false);
      
      // Se acabou (step 3), libera ação visual
      if (response.nextStep === 3 && onComplete) {
         // Lógica opcional de sucesso
      }
      
    }, 1500); 
  };

  return (
    <div className="flex flex-col h-[500px] bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden font-mono text-sm relative shadow-2xl">
      {/* HEADER TERMINAL */}
      <div className="bg-neutral-900/80 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-neutral-800 text-[10px] tracking-widest text-neutral-500 uppercase select-none">
        <div className="flex gap-2">
           <div className={`w-2 h-2 rounded-full animate-pulse ${step > 0 ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-emerald-500'}`}></div>
           <span>STRATEGIC MODE // {cardId ? cardId.toUpperCase() : 'ACTIVE'}</span>
        </div>
        <span>BLACKBOX_V2.5</span>
      </div>

      {/* CHAT AREA */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] p-4 rounded-sm text-sm leading-relaxed tracking-wide ${
              msg.role === 'user' 
                ? 'bg-neutral-900 text-neutral-300 border border-neutral-800' 
                : 'text-cyan-400 border-l-2 border-cyan-500 pl-4 bg-cyan-950/5 shadow-[0_0_20px_rgba(6,182,212,0.05)]'
            }`}>
              {/* Ícones de Feedback */}
              {msg.role === 'ai' && (msg.text.includes('Território') || msg.text.includes('Keyword') || msg.text.includes('Prova')) && <Target className="mb-2 text-cyan-500" size={20} />}
              {msg.role === 'ai' && (msg.text.includes('DIAGNÓSTICO') || msg.text.includes('ESTRUTURA') || msg.text.includes('ROTEIRO')) && <Zap className="mb-2 text-yellow-500" size={20} />}
              
              <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start pl-4">
            <span className="text-cyan-600/70 text-xs font-mono uppercase animate-pulse flex items-center gap-2">
              <Loader2 size={12} className="animate-spin"/> PROCESSING...
            </span>
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 bg-black border-t border-neutral-800 flex gap-3 items-center">
        <span className="text-cyan-600 font-bold">{'>'}</span>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={step === 0 ? "Inicie o protocolo..." : "Responda ao estrategista..."}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-700 font-mono focus:placeholder-neutral-500 transition-all"
          autoFocus
          disabled={isTyping || step >= 3} 
        />
        <button onClick={handleSend} className="text-neutral-500 hover:text-cyan-400 transition-colors disabled:opacity-50">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}