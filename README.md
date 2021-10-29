# Cache Redis Node

<div>
  <img src=".github/assets/redis.png" width="200px" align="right"/>

  <img src=".github/assets/illustrationOpportunities.png" width="110px" align="right" style="margin: 0px 30px"/>
</div>

<p align="justify" >

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

</p>

## Run Project

Primeiro voce deve ter instalado na maquina o docker, docker-compose e o node.

- Envs exemple: <h6>Obs: arquivo .env já disponivel no repo</h6>

```
# APP
APP_PORT=3333

# GITHUB
GITHUB_URL=https://github.com

# REDIS
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASS=
```

- Agora basta realizar o build das imagens docker:

```sh
docker-compose build
```

- Depois do build das imagens basta da um start das imagens:

```sh
docker-compose up
```

- Agora é necessairo que voce rode as migrations:
  <h6>Obs: caso tenha o node instalado na maquina basta abrir outro terminal no diretorio do projeto e roda o comando npm run typeorm migration:run</h6>

```sh
npm run typeorm migration:run
```
