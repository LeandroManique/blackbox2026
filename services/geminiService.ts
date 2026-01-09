import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface ArthurMessage {
  role: "user" | "assistant";
  content: string;
}

class ArthurAI {
  private model = genAI.getGenerativeModel({ model: "gemini-pro" });
  private conversationHistory: ArthurMessage[] = [];

  async startInterview(persona: "ugc" | "influencer" | "viral" | "seller", theme: string): Promise<string> {
    const systemPrompt = this.getSystemPrompt(persona);
    const initialPrompt = `${systemPrompt}\n\nO aluno escolheu o tema: "${theme}"\n\nFaça a primeira pergunta socrática para entender melhor a estratégia dele.`;

    try {
      const response = await this.model.generateContent(initialPrompt);
      const text = response.response.text();
      this.conversationHistory.push({
        role: "assistant",
        content: text,
      });
      return text;
    } catch (error) {
      console.error("Erro ao iniciar entrevista:", error);
      return "Desculpe, houve um erro ao iniciar a entrevista. Tente novamente.";
    }
  }

  async refineResponse(userInput: string): Promise<string> {
    if (!userInput.trim()) {
      return "Por favor, forneça uma resposta mais detalhada. Não consigo trabalhar com respostas vazias.";
    }

    this.conversationHistory.push({
      role: "user",
      content: userInput,
    });

    const conversationContext = this.conversationHistory
      .map((msg) => `${msg.role === "user" ? "Aluno" : "Arthur"}: ${msg.content}`)
      .join("\n\n");

    const prompt = `${conversationContext}\n\nArthur: Com base nessa resposta, faça a próxima pergunta socrática para refinar a estratégia. Se a resposta for vaga, peça mais detalhes. Se for boa, vá para o próximo passo.`;

    try {
      const response = await this.model.generateContent(prompt);
      const text = response.response.text();
      this.conversationHistory.push({
        role: "assistant",
        content: text,
      });
      return text;
    } catch (error) {
      console.error("Erro ao refinar resposta:", error);
      return "Desculpe, houve um erro ao processar sua resposta. Tente novamente.";
    }
  }

  async generateStrategy(): Promise<string> {
    const conversationContext = this.conversationHistory
      .map((msg) => `${msg.role === "user" ? "Aluno" : "Arthur"}: ${msg.content}`)
      .join("\n\n");

    const prompt = `${conversationContext}\n\nCom base em toda essa conversa, gere uma estratégia PRONTA PARA USAR. A estratégia deve ser:
1. Específica (não genérica)
2. Acionável (o aluno pode fazer hoje)
3. Mensurável (com métricas claras)
4. Motivadora (mostrando o resultado esperado)

Formate a resposta de forma clara e estruturada.`;

    try {
      const response = await this.model.generateContent(prompt);
      return response.response.text();
    } catch (error) {
      console.error("Erro ao gerar estratégia:", error);
      return "Desculpe, houve um erro ao gerar a estratégia. Tente novamente.";
    }
  }

  async analyzeVideo(videoDescription: string): Promise<string> {
    const prompt = `Você é um especialista em criação de conteúdo para TikTok/Instagram. 
    
Um criador compartilhou este vídeo com você:
"${videoDescription}"

Analise o vídeo e forneça:
1. O que está funcionando bem
2. O que pode melhorar
3. Sugestão específica para aumentar engajamento
4. Próximo passo recomendado

Seja direto, específico e acionável.`;

    try {
      const response = await this.model.generateContent(prompt);
      return response.response.text();
    } catch (error) {
      console.error("Erro ao analisar vídeo:", error);
      return "Desculpe, houve um erro ao analisar o vídeo. Tente novamente.";
    }
  }

  resetConversation(): void {
    this.conversationHistory = [];
  }

  private getSystemPrompt(persona: "ugc" | "influencer" | "viral" | "seller"): string {
    const basePrompt = `Você é Arthur, o Growth Director do BLACK BOX OS. Você é:
- Um gênio dos algoritmos de TikTok/Instagram
- Um professor excepcional que explica de forma clara
- Um engenheiro de crescimento que trata tudo com método
- Socrático: faz perguntas para que o aluno descubra as respostas
- Direto: não enrola, vai direto ao ponto
- Exigente: não aceita respostas vagas, pede refinamento

Seu objetivo é ajudar o aluno a descobrir SUA estratégia única, não dar uma estratégia pronta.`;

    const personaPrompts = {
      ugc: `${basePrompt}

CONTEXTO: O aluno é um criador de UGC (User Generated Content).
Sua dor: Não sabe qual é seu diferencial. Todas as UGCs parecem iguais.
Seu objetivo: Criar UGCs que marcas PEDEM (não rejeitam).

Faça perguntas para descobrir:
1. Qual tipo de marca ele quer trabalhar
2. Qual é seu diferencial (o que o torna diferente)
3. Como ele pode se destacar
4. Qual é seu público-alvo ideal

Resultado esperado: Uma estratégia de UGC que aumenta taxa de aceitação de 30% para 80%.`,

      influencer: `${basePrompt}

CONTEXTO: O aluno é um influenciador que quer viralizar.
Sua dor: Tem 500 seguidores, não cresce. Não sabe o que está errado.
Seu objetivo: Viralizar e ganhar dinheiro com TikTok/Instagram.

Faça perguntas para descobrir:
1. Qual é seu nicho (comédia, educação, lifestyle, etc)
2. Qual é seu diferencial
3. Qual é seu público-alvo
4. Qual é seu gancho (o que prende em 3 segundos)

Resultado esperado: Uma estratégia que aumenta visualizações em 10x em 7 dias.`,

      viral: `${basePrompt}

CONTEXTO: O aluno quer viralizar mas não sabe exatamente para quê.
Sua dor: Todos estão viralizando menos ele. Tira prints de trends, copia, não funciona.
Seu objetivo: Descobrir seu propósito e viralizar consistentemente.

Faça perguntas para descobrir:
1. Por que ele quer viralizar (ganhar dinheiro, fama, ajudar pessoas)
2. Qual é seu nicho ideal
3. Qual é seu diferencial
4. Qual é sua motivação real

Resultado esperado: Uma estratégia de 30 dias de consistência que leva a 10k seguidores.`,

      seller: `${basePrompt}

CONTEXTO: O aluno é um vendedor no TikTok Shop.
Sua dor: Tem 10k seguidores mas vende pouco. Não consegue converter.
Seu objetivo: Vender mais produtos no TikTok Shop.

Faça perguntas para descobrir:
1. Qual é o produto dele
2. Qual é o preço
3. Qual é seu público-alvo
4. Qual é seu diferencial (por que alguém compraria dele)

Resultado esperado: Uma estratégia de funil que aumenta conversão de 2% para 8%+.`,
    };

    return personaPrompts[persona];
  }
}

export const arthurAI = new ArthurAI();
