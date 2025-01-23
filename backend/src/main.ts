import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // await app.listen(process.env.PORT ?? 3000);
    app.enableCors({
      origin: 'http://localhost:5173', // Autorise les requêtes du front (Vite)
      credentials: true
    });

    const PORT = 3000;
    await app.listen(PORT);
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error starting NestJS:', error);
  }
}
bootstrap();
