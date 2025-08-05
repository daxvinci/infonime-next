import { Schema, models, model } from "mongoose";
import { AdminDetails } from "../types";

// export interface IAdmin extends Document {
//   name: string;
//   password: string;
// }

const AdminSchema = new Schema<AdminDetails>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

AdminSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

AdminSchema.set("toJSON", {
  virtuals: true,
});

const Admin = models.Admin || model<AdminDetails>("Admin", AdminSchema);

export default Admin;
