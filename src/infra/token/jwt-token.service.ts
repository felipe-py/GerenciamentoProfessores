import { TokenService } from "../../core/token/token-service.interface";
import jwt from "jsonwebtoken";

export class JwtTokenService 
    implements TokenService {

        private readonly secret = process.env.JWT_SECRET || "default_secrect";
        private readonly expiresIn = "2h";

        generateToken(payload: any): string {
            return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
        }
    }