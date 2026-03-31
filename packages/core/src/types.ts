import type { METHODS } from "node:http";
import type { APEiRequest } from "./request.js";
import type { APEiResponse } from "./response.js";

export type Next = () => void;

export type Middleware = (
  req: APEiRequest,
  res: APEiResponse,
  next: Next,
) => void;

export type Handler = (req: APEiRequest, res: APEiResponse) => void;

export type HttpMethod = (typeof METHODS)[number];

export type RouterMethod = (
  url: string,
  handler: Handler,
) => void | Promise<void>;

export type Route = {
  method: HttpMethod;
  handler: Handler;
  route: string;
};
