FROM node:4.3.1
MAINTAINER Dardan Selimi & Romain Albasini <dardan.selimi@heig-vd.ch & romain.albasini@heig-vd.ch>
COPY auditor.js /opt/app/
RUN npm install uuid
RUN npm install hashmap
ENTRYPOINT ["node", "/opt/app/auditor.js"]