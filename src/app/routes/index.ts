import express from 'express';
import { ProductRoutes } from '../modules/product/product.route';
import { specificationRoutes } from '../modules/specification/specification.route';
import { UserRoute } from '../modules/user/user.route';


const router = express.Router();
const moduleRoutes = [
    {
        path: '/product',
        route: ProductRoutes
    },
    {
        path: '/specification',
        route: specificationRoutes
    },
    {
        path: '/user',
        route: UserRoute
    }
];




moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;