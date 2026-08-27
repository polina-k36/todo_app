# Todo API

REST API для управления задачами, разработанное с использованием **NestJS** и **Prisma**. Проект предоставляет функционал для создания, редактирования, удаления и поиска задач, поддерживает аутентификацию пользователей, фильтрацию, сортировку и документирование API через Swagger.

## Возможности

* JWT-аутентификация пользователей.
* CRUD-операции для задач.
* Фильтрация задач по различным параметрам.
* Сортировка результатов.
* Пагинация
* Валидация входных данных с помощью `class-validator`.
* Централизованная обработка ошибок через глобальный `ExceptionFilter`.
* Документирование API с использованием Swagger.
* Работа с базой данных PostgreSQL через Prisma ORM.

## Технологии

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* Swagger (OpenAPI)
* class-validator
* class-transformer

## Установка

Клонируйте репозиторий:

```bash
git clone <repository-url>
```

Перейдите в папку проекта:

```bash
cd <project-folder>
```

Установите зависимости:

```bash
npm install
```

## Настройка

Создайте файл `.env` в корне проекта и укажите необходимые переменные окружения.

Пример:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/todo"
PORT=5000
PRIVATE_KEY=your_secret_key
```

После настройки выполните миграции Prisma:

```bash
npx prisma migrate deploy
```

Если проект запускается впервые в режиме разработки, можно использовать:

```bash
npx prisma migrate dev
```

## Запуск

Режим разработки:

```bash
npm run start:dev
```

## Документация API

После запуска приложения Swagger доступен по адресу:

```text
http://localhost:5000/api
```

Документация содержит описание всех доступных эндпоинтов, моделей данных и примеров запросов.

## Структура проекта

```text
src/
├── auth/
├── tasks/
├── categories/
├── prisma/
├── common/
│   ├── dto/
│   ├── enums/
│   ├── filters/
│   └── interfaces/
└── main.ts
```

## Обработка ошибок

Все ошибки проходят через глобальный `ExceptionFilter`, который формирует единый формат ответа.

Пример:

```json
{
  "success": false,
  "error": {
    "statusCode": 404,
    "timestamp": "2026-08-01T13:45:00.000Z",
    "path": "/tasks/100",
    "method": "GET",
    "message": "Task not found"
  }
}
```

## Планы по развитию

* Добавить refresh-токены.
* Добавить роли пользователей.
* Добавить автоматические тесты.
* Реализовать Docker-конфигурацию.
