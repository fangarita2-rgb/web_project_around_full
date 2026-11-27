import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, minlength: 2, maxlength: 30, default: 'Jacques Cousteau' },
  about: { type: String, required: true, minlength: 2, maxlength: 30, default: 'Explorador' },
  avatar: {
    type: String, required: true,
    validate: { validator: (v: string) => urlRegex.test(v), message: 'Formato de URL para el avatar inválido' },
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg',
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

userSchema.statics.findUserByCredentials = async function (email: string, password: string): Promise<IUser> {
  const user = await this.findOne({ email }).select('+password');
  if (!user) throw Object.assign(new Error('Correo o contraseña incorrectos'), { statusCode: 401 });
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw Object.assign(new Error('Correo o contraseña incorrectos'), { statusCode: 401 });
  return user;
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;