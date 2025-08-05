import { Schema, models, model } from "mongoose";
import { UserDetails } from "../types";

const UserSchema = new Schema<UserDetails>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional
    admin: { type: Boolean, default: false },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

const User = models.User || model<UserDetails>("User", UserSchema);

export default User;
