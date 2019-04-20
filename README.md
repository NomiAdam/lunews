# LuNews

![LuNews logo](https://github.com/NomiAdam/lunews/master/client/public/logo.png)

> Usenet reader project for my bachelor work

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

> Note that commands must go in given order and .env file must be present in working directory

```bash
// Using Node.js

1.	npm run install:server
2.	npm run install:client
3.	npm run build
4.	npm run start

// Using Docker

1.	docker pull nomiadam/lunews
2.	docker build -t nomiadam/lunews
3.	docker run --name lunews -p 443:<port defined in .env file> -d nomiadam/lunewsa –env-file <path to .env file>
```

## .env file

```..env
PORT = 3333

AUTH_TYPE = google
CLIENT_ID = googleAppClientId
CLIENT_SECRET = googleAppClientSecret

COOKIE_KEY = cookieKey
HASK_KEY = hashKey

NNTP_IP = x.x.x.x
NNTP_PORT = 119
```

## License

MIT © [NomiAdam](https://github.com/NomiAdam)
