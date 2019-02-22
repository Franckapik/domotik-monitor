#!/bin/bash

echo "Installation de la base de donnée InfluxDB pour la domotique"

sleep 2;
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install wget
wget -qO- https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/os-release
test $VERSION_ID = "7" && echo "deb https://repos.influxdata.com/debian wheezy stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
test $VERSION_ID = "8" && echo "deb https://repos.influxdata.com/debian jessie stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
test $VERSION_ID = "9" && echo "deb https://repos.influxdata.com/debian stretch stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt-get update && sudo apt-get install influxdb

echo "Lancement du service de base de donnée"

sleep 2;
sudo service influxdb start

echo "Création de la base de donnée : domotique "
sleep 2;
influx -execute 'CREATE DATABASE "domotique"'
influx -execute 'SHOW DATABASES'

echo "Création d'un utilisateur"

read -s -p "Choisissez un nom d'utilisateur:" user
echo
while true; do
    read -s -p "Choisissez un mot de passe: " password
    echo
    read -s -p "Retapez votre mot de passe (confirmation): " password2
    echo
    [ "$password" = "$password2" ] && break
    echo "Les mots de passe ne concordent pas. Veuillez recommencer."
done
echo "Mot de passe :" $password2

sleep 1;

influx -execute "create user \"$user\" with password '$password2' WITH ALL PRIVILEGES" -database 'domotique'
sleep 1;
influx -execute "SHOW USERS"

touch config2.js
echo "{'server':'localhost', 'database': 'domotique','port': '8086', 'user': '$user', 'password':'$password2'}" > config2.js
