FROM php:8.5-cli
LABEL authors="Coraline Girr"

RUN apt-get update && \
    apt-get install -y libpq-dev gnupg

RUN docker-php-ext-install pdo pdo_pgsql
