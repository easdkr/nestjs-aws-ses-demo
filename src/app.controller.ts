import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { AppService } from './app.service';

class SendEmailDTO {
  @IsEmail()
  sender: string;

  @IsString()
  senderName: string;

  @IsEmail()
  receiver: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/email')
  async sendEmail(@Body() body: SendEmailDTO) {
    const { sender, senderName, receiver } = body;
    return this.appService.sendEmail(sender, senderName, receiver);
  }

  @Get('/confirm')
  @Render('confirm.ejs')
  async confirmEmail() {
    return null;
  }
}
