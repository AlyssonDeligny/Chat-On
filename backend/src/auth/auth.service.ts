import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(dto: RegisterDto): Promise<User> {
    // Vérifier que le mot de passe n'est pas vide
    if (!dto.password) {
      throw new Error('Le mot de passe ne peut pas être vide');
    }

    // Hash du mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    console.log('Mot de passe hashé :', hashedPassword); // Debugging

    // Création de l'utilisateur avec le mot de passe hashé
    const user = new this.userModel({
      pseudo: dto.pseudo,
      email: dto.email,
      password: hashedPassword, // Assurer que le mot de passe hashé est bien stocké
    });

    console.log(
      'Mot de passe hashé juste avant la sauvegarde :',
      hashedPassword,
    );

    return user.save();
  }
}
