import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
// This decorator extracts the hydrated current user from the request.
    (data: never, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        console.log(req,"---req in current user decorator");
     
        return req.currentUser;
    }
)
