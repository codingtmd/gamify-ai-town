

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

ENV PORT 8080

RUN apt-get update && apt-get install -y nodejs


CMD exec npm install

CMD exec npm run build


CMD exec npm start -- --port ${PORT}