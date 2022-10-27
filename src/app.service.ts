import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService, private readonly emailService: EmailService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(sender: string, senderName: string, receiver: string) {
    const result = await this.emailService.sendEmail(sender, senderName, receiver);
    return result;
  }
}
