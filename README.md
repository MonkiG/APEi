# APEi

APEi es un framework HTTP experimental para Node.js escrito en TypeScript.
Esta pensado como una base pequena, inspirada en ideas de Laravel, NestJS y Express,
pero construida directamente sobre `node:http`.

El objetivo del proyecto es aprender y construir poco a poco una API simple para crear
servidores, registrar rutas y responder JSON o texto sin depender de un framework externo
en el core.

## Requisitos

- Node.js 20 o superior recomendado
- npm

## Instalacion

Desde la raiz del repositorio:

```bash
npm install
```

El proyecto usa npm workspaces. Actualmente el paquete principal esta en:

```text
packages/core
```

## Ejecutar el ejemplo actual

El paquete `@apei/core` incluye un servidor de ejemplo en `packages/core/src/index.ts`.

Para levantarlo en modo desarrollo:

```bash
npm run dev -w @apei/core
```

Por defecto escucha en el puerto `6969`.

Puedes probarlo con:

```bash
curl http://localhost:6969/hello-world
```

Respuesta esperada:

```json
{
  "route": "/hello-world",
  "method": "GET"
}
```

Tambien puedes probar la ruta `POST`:

```bash
curl -X POST http://localhost:6969/hello-world
```

## Uso basico

```ts
import APEi from "@apei/core";

const app = APEi();

app.get("/hello", (req, res) => {
  return res.json({
    message: "Hello from APEi",
    search: req.query.get("q"),
  });
});

app.post("/users", (req, res) => {
  return res.status(201).json({
    created: true,
  });
});

app.listen(6969, () => {
  console.log("Listening on port 6969");
});
```

## API disponible

### Crear una aplicacion

```ts
const app = APEi();
```

`APEi()` devuelve una aplicacion con un router interno y metodos para registrar rutas.

### Registrar rutas

```ts
app.get("/path", handler);
app.post("/path", handler);
app.put("/path", handler);
app.patch("/path", handler);
app.delete("/path", handler);
```

Cada handler recibe:

```ts
(req, res) => void
```

Las rutas actuales se resuelven por coincidencia exacta de metodo y path.

### Leer query params

```ts
app.get("/search", (req, res) => {
  const term = req.query.get("q");

  return res.json({ term });
});
```

Ejemplo:

```bash
curl "http://localhost:6969/search?q=apei"
```

### Leer headers

```ts
app.get("/profile", (req, res) => {
  const authorization = req.get("authorization");

  return res.json({ authorization });
});
```

### Responder con JSON

```ts
res.json({
  ok: true,
});
```

### Cambiar status code

```ts
res.status(201).json({
  created: true,
});
```

### Enviar texto o datos simples

```ts
res.send("Hello world");
```

Si `send` recibe un objeto, responde como JSON.

### Redireccionar

```ts
res.redirect("/login");
```

Tambien puedes indicar el status:

```ts
res.redirect("/new-url", 301);
```

## Estructura del proyecto

```text
.
|-- package.json
|-- tsconfig.base.json
`-- packages
    `-- core
        |-- package.json
        |-- tsconfig.json
        `-- src
            |-- apei.ts
            |-- index.ts
            |-- request.ts
            |-- response.ts
            `-- types.ts
```

## Estado actual

APEi todavia esta en una etapa temprana. Ya incluye:

- Servidor HTTP usando `node:http`
- Registro de rutas `GET`, `POST`, `PUT`, `PATCH` y `DELETE`
- Query params mediante `URLSearchParams`
- Lectura de headers con `req.get(name)`
- Helpers de respuesta: `res.status`, `res.json`, `res.send` y `res.redirect`
- Respuesta `404` para rutas no encontradas

Pendiente o en progreso:

- Body parser para JSON y formularios
- Params dinamicos en rutas como `/users/:id`
- Middlewares con `next()`
- Manejo centralizado de errores
- Controllers como clases
- Router montable con prefijos
- Inyeccion de dependencias
- Decorators
- CLI para generar archivos
- WebSockets basicos
- Tests automatizados

## Scripts disponibles

En la raiz:

```bash
npm test
```

Actualmente este script no tiene tests configurados.

En `@apei/core`:

```bash
npm run dev -w @apei/core
```

Levanta el ejemplo con `tsx watch`.

## Licencia

ISC
