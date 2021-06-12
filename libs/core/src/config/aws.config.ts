import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  queueName: process.env.AWS_SQS_QUEUE_NAME || 'default-sandbox-nestjs-queue',
  receiveWaitTimeSeconds: 20,
}));
