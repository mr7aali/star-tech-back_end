"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("../modules/product/product.route");
const specification_route_1 = require("../modules/specification/specification.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/product',
        route: product_route_1.ProductRoutes
    },
    {
        path: '/specification',
        route: specification_route_1.specificationRoutes
    },
    {
        path: '/user',
        route: user_route_1.UserRoute
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
