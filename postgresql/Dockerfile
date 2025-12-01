FROM postgres:16.10

##Set tables inside. 
## This can instead be included in dockercompose for dynamically
## taking in the init script for new containers  or Be baked in the image like 
## iam doing right now 
COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432


# Don't need CMD as it's defined in the base image itself. Don't need to override
# CMD[]
