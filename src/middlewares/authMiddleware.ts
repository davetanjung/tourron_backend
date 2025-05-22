import { prismaClient } from "../applications/database";
import { ResponseError } from "../error/response-error";
import { UserRequest } from "../types/user-request";
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";

export const authMiddleware = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let token = req.get("Authorization");

        if (token && token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove "Bearer " prefix
        } else {
            token = req.get("x-API-TOKEN");
        }

        if (!token && req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(new ResponseError(401, "Access token is required"));
        }

        const decoded = authService.verifyJWTToken(token);
        if (!decoded || !decoded.userId) {
            return next(new ResponseError(401, "Invalid token payload"));
        }

        console.log("Token:", token);
        console.log("Decoded userId:", decoded.userId);


        const user = await prismaClient.user.findUnique({
            where: {
                id: decoded.userId
            }
        });

        if (!user) {
            return next(new ResponseError(401, "User not found"));
        }

        req.user = user;
        next();

    } catch (error) {
        if (error instanceof ResponseError) {
            next(error);
        } else {
            next(new ResponseError(401, "Invalid or expired token"));
        }
    }
}