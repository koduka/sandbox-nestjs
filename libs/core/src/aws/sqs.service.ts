import { Injectable } from '@nestjs/common';
import {
  GetQueueUrlCommand,
  GetQueueUrlCommandInput,
  GetQueueUrlCommandOutput,
  Message,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  SendMessageCommand,
  SendMessageCommandInput,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsService {
  private sqsClient: SQSClient;
  private isPollStopped = true;

  constructor(private readonly configService: ConfigService) {
    const awsConfig = configService.get('aws');
    console.log(awsConfig);
    const sqsClientConfig: SQSClientConfig = {
      endpoint: awsConfig.endpoint,
      region: awsConfig.region,
      disableHostPrefix: true,
    };
    console.log(sqsClientConfig);
    this.sqsClient = new SQSClient(sqsClientConfig);
  }

  async dispach(body: any) {
    let messageBody = '';
    if (typeof body === 'string') {
      messageBody = body;
    } else {
      messageBody = JSON.stringify(body);
    }
    const params: SendMessageCommandInput = {
      QueueUrl: await this.getQueueUrl(),
      MessageBody: messageBody,
    };
    console.log(params.MessageBody);
    const command = new SendMessageCommand(params);
    this.sqsClient.send(command);
  }

  async receive(handler: (messages: Message[]) => void) {
    const awsConfig = this.configService.get('aws');
    const params: ReceiveMessageCommandInput = {
      QueueUrl: await this.getQueueUrl(),
      WaitTimeSeconds: awsConfig.receiveWaitTimeSeconds,
    };
    const command = new ReceiveMessageCommand(params);
    const data = await this.sqsClient.send(command);
    if (data.Messages) {
      try {
        handler(data.Messages);
      } catch (error) {
        console.error(error);
      }
    }
  }

  startPoll(handler: (messages: Message[]) => void) {
    this.isPollStopped = false;
    const awsConfig = this.configService.get('aws');
    this.poll(handler, awsConfig.receiveWaitTimeSeconds);
  }

  stopPoll() {
    this.isPollStopped = true;
  }

  private poll(
    handler: (messages: Message[]) => void,
    waitPollTimeSeconds: number,
  ) {
    this.receive(handler);
    if (!this.isPollStopped) {
      setTimeout(
        () => this.poll(handler, waitPollTimeSeconds),
        waitPollTimeSeconds * 1000,
      );
    }
  }

  private async getQueueUrl() {
    const awsConfig = this.configService.get('aws');
    const param: GetQueueUrlCommandInput = {
      QueueName: awsConfig.queueName,
    };
    const command = new GetQueueUrlCommand(param);
    return await this.sqsClient
      .send(command)
      .then((result: GetQueueUrlCommandOutput) => {
        console.log(result);
        return result.QueueUrl;
      });
  }
}
