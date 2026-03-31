import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    const { password: _, ...result } = user.toObject();
    return result;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password');
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: string, attrs: Partial<User>): Promise<UserDocument> {
    if (attrs.password) {
      attrs.password = await bcrypt.hash(attrs.password, 10);
    }
    const user = await this.userModel
      .findByIdAndUpdate(id, attrs, { new: true })
      .select('-password');
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return { message: 'Usuario eliminado correctamente' };
  }
}