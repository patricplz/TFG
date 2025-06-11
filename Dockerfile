FROM php:8.2-fpm-alpine 


RUN apk update && apk add --no-cache \
    nginx \
    supervisor \
    mysql-client \
    php82-mysqlnd \
    php82-pdo_mysql \
    php82-tokenizer \
    php82-json \
    php82-xml \
    php82-mbstring \
    php82-zip \
    php82-xmlwriter \
    php82-xmlreader \
    php82-gd \
    php82-curl \
    php82-fileinfo

RUN apk add --no-cache nodejs npm

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ffce031862d29b8d88e7afad34d05 رؤية
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    php -r "unlink('composer-setup.php');"

WORKDIR /var/www/html


COPY . .


RUN composer install --no-dev --optimize-autoloader


COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de configuración de Supervisor (para ejecutar PHP-FPM y Nginx)
COPY docker/supervisor.conf /etc/supervisor.d/supervisord.conf

# Crea el enlace simbólico para el almacenamiento público
RUN php artisan storage:link

# Compila los assets de React para producción
RUN npm install
RUN npm run build

# Expon el puerto 80 (para Nginx)
EXPOSE 80

# Inicia Supervisor (que a su vez inicia Nginx y PHP-FPM)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor.conf"]
