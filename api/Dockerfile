FROM node:22-bookworm-slim AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources ./resources
COPY vite.config.js ./
RUN npm run build


FROM composer:2 AS composer


FROM php:8.3-cli-bookworm AS app

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        unzip \
        libzip-dev \
        sqlite3 \
        libsqlite3-dev \
    && docker-php-ext-install \
        bcmath \
        pcntl \
        pdo_mysql \
        pdo_sqlite \
        zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-autoloader \
    --no-scripts

COPY . .
COPY --from=frontend /app/public/build ./public/build
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint

RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database \
    && sed -i 's/\r$//' /usr/local/bin/docker-entrypoint \
    && chown -R www-data:www-data /var/www/html \
    && chmod +x /usr/local/bin/docker-entrypoint

USER www-data

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint"]
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
