import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  pseudo: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// 🔥 Ajout de la méthode pre-save pour hasher le mot de passe avant enregistrement
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si le mot de passe n'est pas modifié, on ne fait rien

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
