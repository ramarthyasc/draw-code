FROM gcc:15.2.0-trixie
WORKDIR /usr/src/code/c

COPY ./runC.sh .
RUN chmod +x runC.sh

RUN adduser --disabled-password --gecos '' --no-create-home rasc \
&& chown -R rasc:rasc /usr/src/code/c

USER rasc

CMD ["./runC.sh"]
