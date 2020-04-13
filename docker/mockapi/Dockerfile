FROM python:3.7-alpine3.9
LABEL maintainer="TerraBrasilis Research Data"

EXPOSE 8090

COPY . /mockapi
WORKDIR /mockapi

ENTRYPOINT [ "python3" ]
CMD [ "server_json.py" ]
