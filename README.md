# microservices-sample

Just run `docker-compose up` and wait for the following message to appear in a console:

`============================== UP AND RUNNING ==============================`

_Note: at first run it may take awhile due to packages installation and docker images deployment._


Then in case of successful start you should be able to open following URLs in your browser:
- [http://localhost:8080/](http://localhost:8080/)  - Angular based UI;
- [http://localhost:8081/](http://localhost:8081/) - API gateway host with Swagger documentation served under its root path; 

Specified ports, if by any reason can't be used, may be easily remapped in `docker-compose.yml` file. Please note, that abovementioned config is also mapping mongo's port `27017` to the host machine.
