import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { WorkerService } from './worker.service';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const workerService: WorkerService = await app.resolve(WorkerService);
  workerService.start();
}
bootstrap();
