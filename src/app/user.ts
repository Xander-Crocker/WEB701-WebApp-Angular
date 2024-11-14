import mongoose, { Document } from 'mongoose';
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: string[];
    token: string;
}
interface IUser extends Document {
    id: number;
    username: string;
    password: string;
    admin: boolean;
}

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String }],
    token: { type: String, defaultValue: '' }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;