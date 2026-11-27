<<<<<<< HEAD
import mongoose, { Schema, Document, Model } from 'mongoose';
=======
import mongoose, { Schema, Document } from 'mongoose';
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
import bcrypt from 'bcryptjs';

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

<<<<<<< HEAD
interface IUserModel extends Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

=======
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
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
<<<<<<< HEAD
    default: 'Explorador',
=======
    default: 'Explorer',
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => urlRegex.test(v),
      message: 'Formato de URL para el avatar inválido',
    },
<<<<<<< HEAD
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg',
=======
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058
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

<<<<<<< HEAD
const User = mongoose.model<IUser, IUserModel>('User', userSchema);
=======
const User = mongoose.model<IUser>('User', userSchema);
>>>>>>> 5fe04eeee1f3df24f677725ba1044fc66282c058

export default User;