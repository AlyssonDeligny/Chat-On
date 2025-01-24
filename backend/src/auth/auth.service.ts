import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // ✅ Correction de l'import
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: RegisterDto): Promise<User> {
    // Vérifier que le mot de passe n'est pas vide
    if (!dto.password) {
      throw new BadRequestException('Le mot de passe ne peut pas être vide');
    }

    // ✅ Pas besoin de hasher ici, `user.schema.ts` s'en occupe via `pre('save')`
    const user = new this.userModel({
      pseudo: dto.pseudo,
      email: dto.email,
      password: dto.password, // 🔥 Laisser tel quel, il sera hashé avant d'être stocké
    });

    return user.save();
  }

  async loginUser(dto: LoginDto): Promise<{ access_token: string }> {
    // Vérifier si l'utilisateur existe
    const user = await this.userModel.findOne({ email: dto.email }).exec();
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    // Vérifier si le mot de passe correspond
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    // Générer un token JWT
    const payload = { userId: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
