import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class TicketsService {
  private tickets = [
    {
      id: 'INC000001',
      title: 'VPN Not Working',
      description: 'User is unable to connect to the company VPN.',
      priority: 'High',
      category: 'Network',
      status: 'Open',
    },
    {
      id: 'INC000002',
      title: 'Outlook Issue',
      description: 'Outlook is not opening for the user.',
      priority: 'Medium',
      category: 'Software',
      status: 'In Progress',
    },
  ];

  constructor(
    private readonly aiService: AiService,
  ) {}

  getAllTickets() {
    return this.tickets;
  }

  getTicketById(ticketId: string) {
    return this.tickets.find(
      (ticket) => ticket.id === ticketId,
    );
  }

  async getResolutionRecommendation(
    ticketId: string,
    ticket: any,
  ) {
    const recommendation =
      await this.aiService.generateResolutionRecommendation(
        ticket,
      );

    return {
      ticketId,
      recommendation,
    };
  }
}