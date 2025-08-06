import { userRepository } from "../repository/user.repo.js";

class UserService {
    constructor() {}

    createUser = async (data) => {
        const { name, email, password } = data;
        const user = await userRepository.createNewUser({
            name,
            email,
            password,
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    };

    findUserByEmail = async (email) => {
        const user = await userRepository.createNewUser({
            name,
            email,
            password,
        });
        findUserByEmail(email);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    };

    findUserById = async (id) => {
        const user = await userRepository.createNewUser({
            name,
            email,
            password,
        });
        findUserById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    };

    updateUser = async (id, data) => {
        const user = await userRepository.createNewUser({
            name,
            email,
            password,
        });
        findUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const updatedUser = await userRepository.createNewUser({
            name,
            email,
            password,
        });
        updateUser(id, data);
        if (!updatedUser) {
            throw new Error("Failed to update user");
        }
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        };
    };
}

export const userService = new UserService();
