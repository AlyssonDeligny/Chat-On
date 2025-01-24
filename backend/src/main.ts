import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // await app.listen(process.env.PORT ?? 3000);
    const PORT = 3000;

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Supprime les champs non définis dans les DTOs
        forbidNonWhitelisted: true, // Rejette les champs non définis
        transform: true, // Transforme les données en objets DTO
      }),
    );

    app.enableCors({
      origin: 'http://localhost:5173', // Autorise les requêtes du front (Vite)
      credentials: true,
    });

    await app.listen(PORT);
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error starting NestJS:', error);
  }
}
bootstrap();
