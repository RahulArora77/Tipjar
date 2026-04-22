import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  profilepicture?:string;
  displayName?: string;
  bio?: string;
  customMessage?: string;
  upiId?: string;

  socialLinks: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

const SocialLinksSchema = new Schema(
  {
    twitter: { type: String },
    github: { type: String },
    website: { type: String },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilepicture:{
      type: String,

    },

    displayName: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      maxlength: 200,
    },

    customMessage: {
      type: String,
      maxlength: 200,
    },

    upiId: {
      type: String,
    },

    socialLinks: {
      type: SocialLinksSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model<IUser>("User", UserSchema);