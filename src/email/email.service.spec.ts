import { SESClient } from '@aws-sdk/client-ses';
import { ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import emailConfig from 'src/config/email.config';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let emailService: EmailService;
  let config: ConfigType<typeof emailConfig>;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: emailConfig.KEY,
          useValue: {
            awsRegion: null,
            awsCredentials: {
              accessKeyId: null,
              secretAccessKey: null,
            },
          },
        },
      ],
    }).compile();
    config = app.get(emailConfig.KEY);
    emailService = app.get<EmailService>(EmailService);
  });

  it('define', () => {
    expect(emailService).toBeDefined();
  });

  it('sendEmail', async () => {
    // const sendEmailSpy = jest.spyOn(emailService, 'createSesClient').mockImplementationOnce(() => new SESClient({}));
    emailService.createSesClient = jest.fn().mockImplementationOnce(() => new SESClient({}));

    await emailService.sendEmail('alphacircle-service@alphacircle.co.kr', '알파서클', 'choie0423@alphacircle.co.kr');
    expect(emailService.createSesClient).toBeCalledTimes(1);
  });
});
