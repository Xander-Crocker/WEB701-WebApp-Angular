import mongoose, { Schema, Document } from 'mongoose';

export interface User {
    id: number,
    username: string,
    password: string,
    admin: boolean
}
interface IUser extends Document {
    id: number;
    username: string;
    password: string;
    admin: boolean;
}

const UserSchema: Schema = new Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;