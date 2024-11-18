import mongoose, { Document } from 'mongoose';

// Define the User interface for TypeScript type checking
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: string[];
    token: string;
}

// Define the IUser interface extending mongoose Document for MongoDB schema
interface IUser extends Document {
    id: number;
    username: string;
    password: string;
    admin: boolean;
}

// Define the User schema for MongoDB
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username field, required and unique
    email: { type: String, required: true, unique: true }, // Email field, required and unique
    password: { type: String, required: true }, // Password field, required
    roles: [{ type: String }], // Roles field, array of strings
    token: { type: String, default: '' } // Token field, default value is an empty string
});

// Create the User model from the schema
const User = mongoose.model<IUser>('User', UserSchema);

// Export the User model
export default User;

