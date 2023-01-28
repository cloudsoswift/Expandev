FROM dreamjh/morehae:2.0.0

WORKDIR /root/

COPY ./backend/ .

CMD cd /root/dev_accounts && gunicorn --bind 0.0.0.0:8000 backend.wsgi:application

EXPOSE 8000/tcp
