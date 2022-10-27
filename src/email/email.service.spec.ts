import { SESClient } from '@aws-sdk/client-ses';
import { Test, TestingModule } from '@nestjs/testing';
import emailConfig from 'src/config/email.config';
import { EmailService } from './email.service';
import { mockClient } from 'aws-sdk-client-mock';

describe('EmailService', () => {
  let emailService: EmailService;
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
    emailService = app.get<EmailService>(EmailService);
  });

  it('define', () => {
    expect(emailService).toBeDefined();
  });

  it('sendEmail', async () => {
    const createSesClientSpy = jest
      .spyOn(emailService as unknown as { createSesClient: () => void }, 'createSesClient')
      .mockImplementation(() => mockClient(SESClient));

    await emailService.sendEmail('alphacircle-service@alphacircle.co.kr', '알파서클', 'choie0423@alphacircle.co.kr');

    expect(createSesClientSpy).toBeCalledTimes(1);
  });
});
