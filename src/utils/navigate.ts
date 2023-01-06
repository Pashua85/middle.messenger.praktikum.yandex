import { ERoute } from '../enums';
import router from '../core/router/router';

export const navigate = (route: ERoute) => {
  router.go(route);
};
