#!/usr/bin/env python

import datetime
import os
import sys
import Image
from iptcinfo import IPTCInfo

def makeThumbnail(img, outfile):
    THUMB_SIZE = 170, 170
    width, height = img.size
    
    if width > height:
       delta = width - height
       left = int(delta/2)
       upper = 0
       right = height + left
       lower = height
    else:
       delta = height - width
       left = 0
       upper = int(delta/2)
       right = width
       lower = width + upper
    
    img = img.crop((left, upper, right, lower))
    img.thumbnail(THUMB_SIZE, Image.ANTIALIAS)
    img.save(outfile)

now = datetime.datetime.now()
setName = sys.argv[1]
imgDir = os.getcwd() + '/photography/' + setName + '/large'

images = os.listdir(imgDir)
jpgCount = 0
for test in images:
  if test[-4:] == '.jpg':
    jpgCount += 1 
#i = 0

#for image in images:
for i in range(jpgCount):
  image = setName + '-' + str(i + 1) + '.jpg'
  postPath = os.getcwd() + '/_posts/' + now.strftime("%Y-%m-%d-") + setName + '-' + format(i + 1, "03d") + '.html'
  im = Image.open(imgDir + '/' + image)
  info = IPTCInfo(imgDir + '/' + image)
  f = open(postPath, 'w')
  f.write('---' + '\n')
  f.write('layout: modalPhoto' + '\n')
  f.write('category: photo-' + setName + '\n')
  # title is reserved for future use
  f.write('title: no title' + '\n')
  f.write('name: ' + image[:-4] + '\n')
  print image
  #caption = raw_input("Enter a caption: ")
  caption = info.data['caption/abstract']
  f.write('caption: ' + caption + '\n')
  f.write('largeImage: /photography/' + setName + '/large/' + image + '\n')
  f.write('thumbImage: /photography/' + setName + '/thumb/' + setName + '-thumb-' + str(i + 1) + '.jpg' + '\n')
  if i > 0:
    f.write('previousPhoto: ' + setName + '-' + str(i) + '\n')
  else:
    f.write('previousPhoto: ' + setName + '-' + str(jpgCount) + '\n')
  if i < jpgCount - 1:
    f.write('nextPhoto: ' + setName + '-' + str(i + 2) + '\n')
  else:
    f.write('nextPhoto: ' + setName + '-1' + '\n')
  f.write('imageWidth: ' + str(im.size[0]) + '\n')
  f.write('imageHeight: ' + str(im.size[1]) + '\n')
  f.write('---' + '\n')
  f.close()
  #im.thumbnail((170,170))
  outfile = os.getcwd() + '/photography/' + setName + '/thumb/' + setName + '-thumb-' + str(i + 1) + '.jpg'
  makeThumbnail(im, outfile)