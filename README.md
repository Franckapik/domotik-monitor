# Moniteur Domotik

Moniteur pour visualiser toutes les informations provenant des capteurs (raspberry pi de la maison)


# Pour commencer

Le moniteur fonctionne sous Node.js (javascript) et réalise la lecture des informations contenues sur une basse de donnée InfluxDB (timeseries).

## Cloner ce dossier sur votre raspberry

Ecrire dans la console :
```
git clone https://github.com/Franckapik/domotik-monitor.git
```
## Entrer dans le dossier

```
cd domotique-monitor
```
## Installer les dépendances (via npm)
```
npm update
```
## Deployer l'application

```
npm run build
```

## Entrer dans le dossier et Lancer l'application

```
npm run monitor
```
L'application est ensuite disponible sur votre navigateur à l'adresse suivante : http://localhost:3001

# Installer la base de données InfluxDB

La base de données choisie pour enregistrer les différentes informations provenant des capteurs est **InfluxDB** (Open Source). Ce type de base de données (timeseries) est optimisé pour le stockage de données horodatées.

> L'installation de la base de donnée est indispensable au fonctionnement de l'application


## Installation automatisée à partir d'un script

Vous pouvez choisir d'executer un script qui réalisera l'installation de la base de donnée à partir de la **liste de dépot Debian**. Le script vous demandera un nom d'utilisateur et un mot de passe nécessaires ensuite pour la connexion à la base de donnée.

Dans la console, placer vous à la racine du dossier et inscrivez
```
bash influx_install.sh
```

## Installation manuelle

Si vous êtes confronté à des erreurs, choisissez l'installation manuelle.
Pour information, les instructions suivantes sont issues sur la documentation de InfluxDB

>https://docs.influxdata.com/influxdb/v1.5/introduction/installation/

1- Assurez-vous que votre Rpi est à jour :

```
sudo apt-get update && sudo apt-get upgrade
```
2- Mise à jour des dépots Debian

```
wget -qO- https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/os-release
test $VERSION_ID = "7" && echo "deb https://repos.influxdata.com/debian wheezy stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
test $VERSION_ID = "8" && echo "deb https://repos.influxdata.com/debian jessie stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
test $VERSION_ID = "9" && echo "deb https://repos.influxdata.com/debian stretch stable" | sudo tee /etc/apt/sources.list.d/influxdb.list

```

3- Installation de InfluxDB

```
sudo apt-get update && sudo apt-get install influxdb
```
4- Lancement du service de base de donnée

sudo service influxdb start

5- Création de la base de donnée
>L'application souhaite par défaut le nom de base de donnée suivant : domotique
```
influx -execute 'CREATE DATABASE "domotique"'
```
Vous pouvez vérifier que la base de donnée à bien été créée en lançant la commande suivante
```
influx -execute 'SHOW DATABASES'
```
6- Création d'un utilisateur
>La ligne suivante nécessite le remplacement des mots USER et PASSWORD par votre nom d'utilisateur et mot de passe personnel choisis.
```
influx -execute "create user "USER" with password 'PASSWORD' " -database 'domotique'
```
Vous pouvez vérifier que votre nom d'utilisateur à bien été enregistré en lançant la commande suivante
```
influx -execute "SHOW USERS"
```
