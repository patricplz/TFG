FROM php:8.2-fpm-alpine

RUN apk update && apk add --no-cache \
    nginx \
    supervisor \
    mysql-client \
    nodejs \
    npm \
    curl \
    git \
    unzip \
    libzip-dev \
    oniguruma-dev \
    zlib-dev \
    libpng-dev \
    gettext

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath

RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan storage:link

RUN npm install && npm run build

RUN rm -f /etc/nginx/conf.d/default.conf

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisor.conf /etc/supervisor.conf

RUN envsubst < /etc/nginx/http.d/default.conf > /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["sh", "-c", "/usr/bin/supervisord -c /etc/supervisor.conf || echo 'Supervisor failed to start' && sleep infinity"]
