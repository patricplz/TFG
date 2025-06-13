FROM php:8.2-fpm-alpine

# Instala dependencias del sistema y extensiones PHP
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
    libpng-dev

# Instala extensiones de PHP oficiales
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath

# Instala Composer de forma segura
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html

# Copia todo el proyecto
COPY . .

# Instala dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Crea el enlace simbólico de storage
RUN php artisan storage:link

# Construye assets de React
RUN npm install && npm run build

# Copia configuración de nginx y supervisor
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisor.conf /etc/supervisor.conf

# Expone el puerto 80
EXPOSE 80

# Inicia supervisord que arranca PHP-FPM + Nginx
CMD ["/bin/sh", "-c", "/usr/sbin/nginx -g 'daemon off;' && sleep infinity"]
