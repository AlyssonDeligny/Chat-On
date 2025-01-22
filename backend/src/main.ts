import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // await app.listen(process.env.PORT ?? 3000);
    const PORT = 3000;
    await app.listen(PORT);
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error starting NestJS:', error);
  }
}
bootstrap();
