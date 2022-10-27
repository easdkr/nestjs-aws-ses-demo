import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  awsRegion: process.env.AWS_REGION,
  awsCredentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
}));
