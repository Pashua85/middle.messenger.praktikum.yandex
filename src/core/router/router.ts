import { Block, Route } from '..';
import { SimpleObject } from '../../types';

class Router {
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history: History;

  constructor(private readonly rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
  }

  public use(pathname: string, block: typeof Block, blockProps = {}) {
    const route = new Route(pathname, block, blockProps, this.rootQuery);

    console.log({ pathname, route });
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname)) || null;
  }
}

export default new Router('.app');
