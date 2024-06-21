fix ur docker-compose, (remove db, if use self-hosted db)
fix ur env in docker-compose
commadn:

docker rm $(docker ps -aq) && docker rmi $(docker images -q) && docker volume rm $(docker volume ls -q)
docker compose up

check localhost:8181 