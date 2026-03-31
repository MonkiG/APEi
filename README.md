# 🦍 APEi

---

## ¿Qué es APEi?

Framework HTTP para Node.js escrito en TypeScript, inspirado en **Laravel** y **NestJS**.  
Construido desde cero sobre `node:http` — sin dependencias externas en el core.

**APE** — I like Apes
**API** — The thing you make with this
**A-PE-I** — The sound of the spanish letters of API

---

## TODO 1: 

- [x] `createServer` wrapper
- [ ] Parseo de request:
  - [x] Method, path, headers (ya los da Node)
  - [x] Query params (`URL` + `URLSearchParams`)
  - [ ] Body JSON (`application/json`)
  - [ ] Body urlencoded (`application/x-www-form-urlencoded`)
  - [ ] Body multipart — usar `busboy` (única dependencia externa permitida)
- [ ] Router con:
  - [ ] Path params (`:id`, `:slug`) via regex
  - [x] Métodos HTTP: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- [ ] Middleware chain con `next()` (igual que Express)
- [ ] Helpers en `res`:
  - [x] `res.json(data)`
  - [x] `res.status(code)`
  - [x] `res.send(text)`
- [ ] Error handling middleware

## TODO 2:
- [ ] Controllers como clases
- [ ] Router mounteable con prefijos

## TODO 3:
 - [ ] Registro de providers
  - [ ] Resolución automática de dependencias via reflection
  - [ ] Scopes: singleton, transient
- [ ] **Decorators**
  - [ ] `@Controller('prefix')`
  - [ ] `@Get()`, `@Post()`, `@Put()`, `@Delete()`
  - [ ] `@Injectable()`
  - [ ] `@Param()`, `@Query()`, `@Body()`
  - [ ] `@UseMiddleware()`

## TODO 4:
- [ ] CLI para generar controllers/services (`apei make:controller User`)
- [ ] Soporte para WebSockets básico
- [ ] Documentación con ejemplos