import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verify(token);
            req['user'] = payload;
        }
        catch {
            throw new UnauthorizedException();
        }
        return true;        
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}