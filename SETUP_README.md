## Setup

### Tools
1. Install Docker
2. Build Docker app
    * `docker-compose build`
3. Run server
    * `docker-compose up -d`
    * `docker run -p 80:80 -d fantasy_trades_web_image`


Development
* `docker-compose -f docker-compose.dev.yml up --build -d`
