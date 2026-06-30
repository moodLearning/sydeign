import { flatRoutes } from '@react-router/fs-routes';
import { type RouteConfig, route } from '@react-router/dev/routes';
import { hydrogenRoutes } from '@shopify/hydrogen';

export default hydrogenRoutes([
  ...(await flatRoutes()),
]);
