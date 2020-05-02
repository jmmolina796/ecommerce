up:
	docker-compose up --detach

start:
	docker-compose start

restart:
	docker-compose restart

stop:
	docker-compose stop

logs:
	docker-compose logs

down:
	docker-compose down --rmi local --volumes --remove-orphans

build:
	docker-compose build