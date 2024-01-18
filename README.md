# Prérequis

- testé sous Linux
- Une installation de [Docker](https://docker.com)
- PixInsight installé avec le plugin StarXTerminator, disponible sur le `$PATH`

# Utilisation

Ce projet scanne le dossier `star`, y recherche des fichiers FITS pour lesquels il faut faire une résolution astrométrique et les dépose dans le dossier `starx`.
Pour se faire, lancer le script `./process.sh` qui:

- téléchargera une image docker [d'astrometry.net](https://astrometry.net) pour faire la résolution
- créera une image `_solved` pour chaque image d'entrée

Une fois les images résolues, lance un script PixInsight qui:

- crée une image starless en utilisant le process StarXterminator (suffixe `_starless`)
- génère 2 images non linéaires en utilisant le process GHS (`stretched` et `_streched_starless`)

A noter que le script ne générera que les images qui manquent.

# Détails

- L'image docker qui sert pour l'astrométrie est générée avec ce [Dockerfile](docker/Dockerfile).
- Le script PixInsight qui génère les images starless et les versions stretch est [ici](automate.js)
- Le script principal qui lance le traitement est [ici](process.sh)


# astrometry-pix
