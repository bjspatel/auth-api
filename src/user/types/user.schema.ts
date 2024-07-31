import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({
    required: false,
  })
  name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  passwordHash: string;
  @Prop({
    required: false,
  })
  country: string;

  @Prop({
    required: false,
  })
  phone: string;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    required: false,
  })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
