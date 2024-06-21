FROM python:3.11.6
RUN pip install poetry
RUN apt-get update && apt-get install libgomp1
RUN mkdir -p /app
COPY . /app
EXPOSE 8080:8080
WORKDIR /app

RUN poetry install
CMD ["poetry", "run", "python", "app.py"]
