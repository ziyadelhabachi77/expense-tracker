#!/bin/sh
set -e

if [ ! -f .env ]; then
    cp .env.example .env
fi

if ! grep -q '^APP_KEY=base64:' .env; then
    php artisan key:generate --force --no-interaction
fi

if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    DB_PATH="${DB_DATABASE:-database/database.sqlite}"
    mkdir -p "$(dirname "$DB_PATH")"
    touch "$DB_PATH"
fi

if [ "${WAIT_FOR_DB:-true}" = "true" ] && { [ "${DB_CONNECTION}" = "mysql" ] || [ "${DB_CONNECTION}" = "mariadb" ]; }; then
    php -r '
        $host = getenv("DB_HOST") ?: (getenv("MYSQLHOST") ?: "127.0.0.1");
        $port = getenv("DB_PORT") ?: (getenv("MYSQLPORT") ?: "3306");
        $db = getenv("DB_DATABASE") ?: (getenv("MYSQLDATABASE") ?: "laravel");
        $user = getenv("DB_USERNAME") ?: (getenv("MYSQLUSER") ?: "root");
        $pass = getenv("DB_PASSWORD") ?: (getenv("MYSQLPASSWORD") ?: "");
        $dsn = "mysql:host={$host};port={$port};dbname={$db}";

        for ($i = 0; $i < 60; $i++) {
            try {
                new PDO($dsn, $user, $pass);
                exit(0);
            } catch (Throwable $e) {
                sleep(1);
            }
        }

        fwrite(STDERR, "Database connection timed out.\n");
        exit(1);
    '
fi

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    php artisan migrate --force --no-interaction
fi

php artisan config:clear --no-interaction >/dev/null 2>&1 || true

exec "$@"
