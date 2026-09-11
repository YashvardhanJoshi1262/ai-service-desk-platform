import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
  ) {}

  @Get()
  getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  getTicketById(@Param('id') id: string) {
    return this.ticketsService.getTicketById(id);
  }

  @Post(':id/recommendation')
  getResolutionRecommendation(
    @Param('id') id: string,
    @Body() ticket: any,
  ) {
    return this.ticketsService.getResolutionRecommendation(
      id,
      ticket,
    );
  }
}