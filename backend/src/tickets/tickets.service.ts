import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsService {
  getAllTickets() {
    return [
      {
        id: 'INC000001',
        title: 'VPN Not Working',
        priority: 'High',
        status: 'Open',
      },
      {
        id: 'INC000002',
        title: 'Outlook Issue',
        priority: 'Medium',
        status: 'In Progress',
      },
    ];
  }
}