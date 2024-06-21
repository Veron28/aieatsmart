FROM python:3.11.6
WORKDIR /app
COPY requirements.txt /app
RUN python -m pip install -r requirements.txt
EXPOSE 8080:8080
COPY . /app

CMD ["python", "app.py"]