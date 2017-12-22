FROM node:boron

#create the app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080
CMD [ "npm", "start"]

LABEL org.label-schema.name = "Stackle" \
      org.label-schema.description = "Stackle is an web communication portal aimed at providing Open Source organizations a platform to have discussions on their GitHub projects and their issues." \
      org.label-schema.url = "https://github.com/scorelab/Stackle/blob/master/README.md" \
      org.label-schema.vendor = "Sustainable Computing and Research Group" \
      org.label-schema.vcs-ref = "279FA63"\
      org.label-schema.vcs-url = "https://github.com/scorelab/Stackle"
      org.label-schema.schema-version = "1.0"
