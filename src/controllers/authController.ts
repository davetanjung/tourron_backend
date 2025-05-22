import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../models/User"
import { NextFunction, Request, Response } from "express";
import { authService } from "../services/authService";
import { UserRequest } from "../types/user-request";

export class authController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await authService.register(request)

            res.status(201).json({
                data: response,
                message: "User registered successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginUserRequest
            const response = await authService.login(request)

            // Optionally set JWT token as httpOnly cookie for enhanced security
            if (response.token) {
                res.cookie("jwt", response.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 24 * 60 * 60 * 1000, // 24 hours
                });
            }

            res.status(200).json({
                data: response,
                message: "Login successful"
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await authService.logout(req.user!)

            // Clear the JWT cookie
            res.clearCookie("jwt", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            res.status(200).json({
                data: response,
                message: "Logout successful"
            })
        } catch (error) {
            next(error)
        }
    }
}