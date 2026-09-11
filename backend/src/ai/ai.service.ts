import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey =
      this.configService.getOrThrow<string>('OPENAI_API_KEY');

    this.model =
      this.configService.get<string>('OPENAI_MODEL') ??
      'gpt-5-mini';

    this.openai = new OpenAI({
      apiKey,
    });
  }

  async generateResolutionRecommendation(ticket: {
    id: string;
    title: string;
    description: string;
    priority: string;
    category: string;
    status: string;
  }) {
    const response = await this.openai.responses.create({
      model: this.model,

      instructions: `
You are an IT Service Desk resolution assistant.

Analyze the incident provided by the support agent.

Give a practical and concise resolution recommendation.

Your response must contain:

1. Possible Cause
2. Troubleshooting Steps
3. Recommended Resolution
4. Escalation Recommendation

Do not claim that you performed any action on the user's system.
Only provide recommendations.
`,

      input: `
Incident ID: ${ticket.id}
Title: ${ticket.title}
Description: ${ticket.description}
Priority: ${ticket.priority}
Category: ${ticket.category}
Status: ${ticket.status}
`,
    });

    return response.output_text;
  }
}