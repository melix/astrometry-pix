#!/bin/bash
filename=$1
base="${filename%.*}"
solve-field /data/$1 --dir /tmp
cp /tmp/$base.new /solved/${base}_solved.fits
chmod a+rw /solved/${base}_solved.fits

