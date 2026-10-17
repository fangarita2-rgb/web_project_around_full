import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => urlRegex.test(v),
      message: 'Formato de URL para el avatar inválido',
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string,
): Promise<IUser> {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw Object.assign(new Error('Correo o contraseña incorrectos'), { statusCode: 401 });
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw Object.assign(new Error('Correo o contraseña incorrectos'), { statusCode: 401 });
  }
  return user;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;