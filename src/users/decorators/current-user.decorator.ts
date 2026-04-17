import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { create } from "domain";

export const CurrentUser = createParamDecorator(
// This decorator extracts the current user's ID from the request session.
// ExecutionContext provides access to the HTTP request object.
// 'data' is an optional parameter passed when using the decorator.
    (data: never, context:ExecutionContext) => {
        //this gives us he underlying request object from the context, which is an instance of the HTTP request.
        const req = context.switchToHttp().getRequest();
        console.log(req?.session,"---req in current user decorator");
        // console.log(req.session.userId);
        return req.session.userId;
        // return 'hi there!!'
    }
)