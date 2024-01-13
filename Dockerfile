FROM node:14
WORKDIR C:\Users\civbf\Downloads\personal-page\personal-page
COPY package*.json ./
RUN npm install

COPY . . 
EXPOSE 3000
CMD ["node", "./src/server/apps.tsx"]