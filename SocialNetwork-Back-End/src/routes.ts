
/**
 * All application routes.
 */

import UserController from "./controllers/UserController";

 export const UnprotectedRoutes = [
    {
        path: "/users/register",
        method: "post",
        action: new UserController().register
    },
    {
        path: "/users/login",
        method: "get",
        action: new UserController().login
    }
];

export const AppRoutes = [
    //Users
    {
        path: "/users/changePassword",
        method: "post",
        action: new UserController().changePassword
    },
    {
        path: "/users/edit",
        method: "post",
        action: new UserController().edit
    }
];