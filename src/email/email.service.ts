import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as ejs from 'ejs';
import emailConfig from 'src/config/email.config';

@Injectable()
export class EmailService {
  constructor(@Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>) {}

  async sendEmail(sender: string, senderName: string, receiver: string) {
    const result = await this.createSesClient().send(
      new SendEmailCommand({
        Destination: { ToAddresses: [receiver] },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: await ejs.renderFile('src/views/view.ejs', { senderName: senderName }),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'AWS SES with Nest.js Hello World!',
          },
        },
        Source: `${this.#encodeBase64SenderName(senderName)} <${sender}>`,
      }),
    );
    return result;
  }

  #encodeBase64SenderName = (data: string) => `=?UTF-8?B?${Buffer.from(data).toString('base64')}?=`;

  createSesClient() {
    console.log(this.config);

    return new SESClient({
      // credentials: {
      //   accessKeyId: this.config.awsCredentials.accessKeyId,
      //   secretAccessKey: this.config.awsCredentials.secretAccessKey,
      // },
      // region: this.config.awsRegion,
    });
  }
}
