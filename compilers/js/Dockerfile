FROM node:24.12.0-trixie-slim
WORKDIR /usr/src/code/js

COPY ./runJs.sh .
RUN chmod +x runJs.sh

# adduser creates non root user & group - give permission to read & write inside js directory only
RUN adduser --disabled-password --gecos '' --no-create-home rasc \
&& chown -R rasc:rasc /usr/src/code/js

USER rasc

CMD ["./runJs.sh"]
