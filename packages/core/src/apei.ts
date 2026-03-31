import http from "node:http";
import type { RouterMethod, Route } from "./types.js";
import { makeAPEiResponse } from "./response.js";
import { makeAPEiRequest } from "./request.js";

export interface APEi {
  get: RouterMethod;
  post: RouterMethod;
  put: RouterMethod;
  patch: RouterMethod;
  delete: RouterMethod;
  headers: RouterMethod;

  listen: (port: number, cb: () => void) => void;
  router: Map<string, Route>;
}

export default function APEi(): APEi {
  const router = new Map<string, Route>();

  const server = http.createServer((req, res) => {
    const url = new URL(req.url || "/", `http://${req.headers.host}`); //TODO: Handle in a better way this

    const route = router.get(`${req.method}:${url.pathname}`);

    if (route) {
      return route.handler(makeAPEiRequest(req, url), makeAPEiResponse(res));
    }

    res.statusCode = 404;
    res.end(http.STATUS_CODES[404]);
  });

  return {
    router,

    get: (url, handler) => {
      router.set(`GET:${url}`, {
        route: url,
        method: "GET",
        handler,
      });
    },
    post: (url, handler) => {
      router.set(`POST:${url}`, {
        route: url,
        method: "POST",
        handler,
      });
    },
    put: (url, handler) => {
      router.set(`PUT:${url}`, {
        route: url,
        method: "PUT",
        handler,
      });
    },
    patch: (url, handler) => {
      router.set(`PATCH:${url}`, {
        route: url,
        method: "PATCH",
        handler,
      });
    },
    delete: (url, handler) => {
      router.set(`DELETE:${url}`, {
        route: url,
        method: "DELETE",
        handler,
      });
    },
    headers: (url, handler) => {
      router.set(`HEADERS:${url}`, {
        route: url,
        method: "HEADERS",
        handler,
      });
    },

    listen: (port: number, cb: () => void) => server.listen(port, cb),
  };
}
