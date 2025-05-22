import jwt from 'jsonwebtoken';
import { prismaClient } from "../applications/database";
import { ResponseError } from "../error/response-error";
import { LoginUserRequest, RegisterUserRequest, toUserResponse, UserResponse } from "../models/User";
import { userValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export class authService {

    private static generateJWTToken(userId: number): string {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new ResponseError(500, "JWT secret not configured");
        }

        return jwt.sign(
            { userId: userId },
            jwtSecret,
            { expiresIn: '24h' }
        );
    }

    static async register(req: RegisterUserRequest): Promise<UserResponse> {
        // validate request
        const registerReq = Validation.validate(
            userValidation.REGISTER,
            req
        )

        const email = await prismaClient.user.findFirst({
            where: {
                email: registerReq.email
            }
        })

        if (email) {
            throw new ResponseError(400, "Email already exist")
        }

        registerReq.password = await bcrypt.hash(registerReq.password, 10)

        const user = await prismaClient.user.create({
            data: {
                username: registerReq.username,
                email: registerReq.email,
                password: registerReq.password
            }
        })

        // Generate JWT token
        const token = this.generateJWTToken(user.id);

        const response = toUserResponse(user);
        response.token = token;

        return response;
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {

        const loginRequest = Validation.validate(userValidation.LOGIN, request)

        const user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email
            }
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        // Generate JWT token
        const token = this.generateJWTToken(user.id);

        const updatedUser = await prismaClient.user.update({
            where: { id: user.id },
            data: { token },
        });

        const response = toUserResponse(updatedUser);
        response.token = token;

        return response;
    }

    static async logout(user: User): Promise<string> {
        if (!user || !user.id) {
            throw new ResponseError(401, "Unauthorized - invalid user");
        }

        await prismaClient.user.update({
            where: { id: user.id },
            data: { token: null }
        });

        return "Logout successful!";
    }


    static verifyJWTToken(token: string): { userId: number } {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new ResponseError(500, "JWT secret not configured");
        }

        try {
            const decoded = jwt.verify(token, jwtSecret) as { userId: number };
            return decoded;
        } catch (error) {
            throw new ResponseError(401, "Invalid or expired token");
        }
    }

}