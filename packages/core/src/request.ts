import type { IncomingMessage } from "node:http";

export interface APEiRequest extends IncomingMessage {
  query: URLSearchParams;
  params: Record<string, string>;

  get(name: string): string | string[] | undefined;
}

export function makeAPEiRequest(req: IncomingMessage, url: URL): APEiRequest {
  const apei = req as APEiRequest;
  apei.query = url.searchParams;
  apei.params = {}; //TODO: implement this logic

  apei.get = (name: string) => req.headers[name.toLowerCase()];
  return apei;
}
