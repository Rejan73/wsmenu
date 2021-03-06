# wsmenu

## Fonctionnalités
wsmenu permet de gérer les menus de la semaine et de creer la liste de course
- ajout/suppression de plat
- ajout/suppression d'ingredients composant un plat
- ajout d'un plat dans le calendrier et possibilité d'envoi d'un rdv gmail
- consultation de la liste de plats et de course à faire possibilité d'envoi de rdv gmail de course à faire

## Installation

- récupérer le tag et compiler les sources : 
```
git checkout tags/1.0.2
mvn clean install
```
- créer le fichier application.yml
```
server:
    port: 8080
spring:
    jpa:
        show-sql: true
        generate-ddl: true
        hibernate:
            ddl-auto: create
    datasource:
        name: datasourceSAPS
        url: jdbc:h2:file:/workspace/wsmenu/data/wsMenu
        username: admin
        password:
        driver-class-name: org.h2.Driver
swagger:
    enabled: true
```

- créer un fichier wsmenu.sh
```
  #! /bin/sh
  # /etc/init.d/wsmenu
  echo "Script Launched"
  sudo java -jar /workspace/wsmenu/target/ws-menu-1.0.2.jar --spring.config.location=file:/workspace/wsmenu/conf/application.yml &
```
- lancer le script ./wsmenu.sh  une fois pour qu'il crée la base dans /workspace/wsmenu/data/wsMenu.mv.db
- arrêter le script et changer l'application.yml create -> update
- relancer le script ./wsmenu.sh &

## Utilisation
Pour le site : http://127.0.0.1:8080
Pour swagger : http://192.168.7.45:8080/swagger-ui.html
