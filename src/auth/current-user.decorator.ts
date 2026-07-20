import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {User} from "../users/entities/user.entity";

const getCurrentUser = (context: ExecutionContext): User => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator((data, req) => {
    (_data: unknown, context: ExecutionContext) => getCurrentUser(context),
})