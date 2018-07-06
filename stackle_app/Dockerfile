FROM node:boron

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 9000
CMD [ "npm", "start"]

LABEL multi.org.label-schema.name = "Stackle" \
      multi.org.label-schema.description = "Stackle is an web communication portal aimed at providing Open Source organizations a platform to have discussions on their github projects and their issues." \
      multi.org.label-schema.url="https://github.com/scorelab/Stackle/wiki" \
      multi.org.label-schema.vcs-url = "https://github.com/scorelab/Stackle" \
      multi.org.label-schema.vcs-ref = "279FA63" \
      multi.org.label-schema.vendor = "Sustainable Computing Research Group" \
      multi.org.label-schema.version = "09-December-2017" \		
      multi.org.label-schema.schema-version = "1.0"

