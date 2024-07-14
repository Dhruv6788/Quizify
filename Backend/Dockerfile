# Dockerfile
FROM python:3.10.13-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /Quizify

COPY requirements.txt /Quizify/
RUN pip install -r requirements.txt

COPY . /Quizify/