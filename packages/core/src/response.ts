import type { ServerResponse } from "node:http";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue;
};

export interface APEiResponse extends ServerResponse {
  status(code: number): this;
  json(data: JsonValue): this;
  send(data?: JsonValue): this;
  redirect(url: string, status?: number): this;
}

export function makeAPEiResponse(res: ServerResponse): APEiResponse {
  const apei = res as APEiResponse;

  apei.status = function (code: number) {
    res.statusCode = code;
    return apei;
  };

  apei.json = function (data: JsonValue) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
    return apei;
  };

  apei.send = function (data?: JsonValue) {
    if (typeof data === "object") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } else if (typeof data === "string") {
      res.setHeader("Content-Type", "text/plain");
      res.end(data);
    } else {
      res.end();
    }

    return apei;
  };

  apei.redirect = function (url: string, status = 302) {
    res.statusCode = status;
    res.setHeader("Location", url);
    res.end();
    return apei;
  };

  return apei;
}
