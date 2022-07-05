docker build -t deall-rest-api:0.0.1 .

docker network create deall-rest-api-network
docker volume create deall-rest-api-volume

docker run -p 27017:27017 --network deall-rest-api-network -v deall-rest-api-volume:/data/db -d --name mongo -t mongo:latest
docker run -p 3000:3000 -d deall-rest-api:0.0.1

kubectl create -f pod.yaml
kubectl port-forward deall-rest-api 3001:3000
