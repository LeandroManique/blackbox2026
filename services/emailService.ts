import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private fromEmail = "noreply@ojogodoalgoritmo.com";
  private appName = "BLACK BOX do Jogo do Algoritmo";

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">Bem-vindo ao ${this.appName}!</h1>
        
        <p>Olá ${name},</p>
        
        <p>Você acaba de se juntar a uma comunidade de criadores que estão transformando suas vidas através de estratégia.</p>
        
        <h2 style="color: #EC4899;">Próximos Passos:</h2>
        <ol>
          <li>Faça login no sistema</li>
          <li>Escolha seu objetivo (UGC, Influenciador, Viralizar ou Vendedor)</li>
          <li>Comece seu primeiro protocolo</li>
          <li>Transforme sua vida</li>
        </ol>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <strong>Arthur AI está esperando por você.</strong><br>
          Ele vai guiar você através de cada passo.
        </p>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          © 2026 ${this.appName}. Todos os direitos reservados.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: `Bem-vindo ao ${this.appName}!`,
      html,
    });
  }

  async sendCheckpointEmail(email: string, name: string, checkpoint: string, nextStep: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">🎉 Parabéns, ${name}!</h1>
        
        <p>Você acaba de completar um checkpoint importante:</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #8B5CF6; margin-top: 0;">${checkpoint}</h2>
        </div>
        
        <h2 style="color: #EC4899;">Próximo Passo:</h2>
        <p>${nextStep}</p>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <strong>Você está no caminho certo.</strong><br>
          Continue assim e você vai transformar sua vida.
        </p>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          © 2026 ${this.appName}. Todos os direitos reservados.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: `Checkpoint Completo: ${checkpoint}`,
      html,
    });
  }

  async sendDailyTip(email: string, name: string, tip: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #F59E0B;">💡 Dica do Dia</h1>
        
        <p>Olá ${name},</p>
        
        <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B;">
          <p style="margin: 0; font-size: 16px; line-height: 1.6;">${tip}</p>
        </div>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <strong>Aplique essa dica hoje e veja a diferença.</strong>
        </p>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          © 2026 ${this.appName}. Todos os direitos reservados.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: "Dica do Dia - BLACK BOX OS",
      html,
    });
  }

  async sendConsistencyReminder(email: string, name: string, daysCompleted: number, daysRemaining: number): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B5CF6;">🔥 Você Está Indo Bem!</h1>
        
        <p>Olá ${name},</p>
        
        <p>Você completou <strong>${daysCompleted} dias</strong> do seu desafio de consistência!</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px;">
            Progresso: <strong>${Math.round((daysCompleted / 30) * 100)}%</strong>
          </p>
          <p style="margin: 10px 0 0 0; color: #666;">
            ${daysRemaining} dias para completar o desafio
          </p>
        </div>
        
        <p><strong>Não pare agora!</strong> Você está muito perto de transformar sua vida.</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          © 2026 ${this.appName}. Todos os direitos reservados.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: email,
      subject: `Você Completou ${daysCompleted} Dias! Continue!`,
      html,
    });
  }

  private async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const response = await resend.emails.send({
        from: this.fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      if (response.error) {
        console.error("Erro ao enviar email:", response.error);
        return false;
      }

      console.log("Email enviado com sucesso:", response.data);
      return true;
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
