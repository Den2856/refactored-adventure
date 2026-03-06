# API Server

Бэкенд-сервер на **NestJS + Prisma + PostgreSQL**.

## Требования

Перед запуском убедись, что установлены:

- Node.js версии 24 и выше
- npm
- PostgreSQL

## Установка

Перейдите в папку `api`:

```bash cd api```

Установите зависимости 

```bash npm i``` 

Запустите генерацию призмы

```bash npx prisma generate``` 

В файле .env в папке /api замените строку подключения к БД PostgreSQL на свою

DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"

Применение схемы к базе

```bash npx prisma db push``` 

Запустите сервер

```bash npm run start:dev``` 

Также в другой консоли параллельно перейдите в папку `api`

```bash cd api```

Запустите Prisma Studio

```npx prisma studio```


Далее в третьей консоле из корня проекта перейдите в `client`

```bash cd client```

Установите зависимости 

```bash npm i``` 

Запустите Клиент часть 

```bash npm run dev```
