up:
	mkdir ./server/vendor && docker-compose up --detach

start:
	docker-compose start

restart:
	docker-compose restart

stop:
	docker-compose stop

logs:
	docker-compose logs

down:
	rm -rf ./server/vendor && docker-compose down --rmi local --volumes --remove-orphans

build:
	docker-compose build

go-client:
	docker container exec -it ecommerce_ecommerce_client_1 sh