#!/bin/bash

for f in `ls star/*.fits`; do
   name=`basename $f`
   base="${name%.*}"
   if [ ! -f starx/${base}_solved.fits ]; then
      echo "---------------------------------------------"
      echo "Résolution astrométrique de $name"
      echo "---------------------------------------------"
      docker run -v ./star:/data -v ./starx:/solved melix/astrometry:latest $name
   fi
done

echo "Calcul des images starless"

PixInsight -r="automate.js,starx" --force-exit


