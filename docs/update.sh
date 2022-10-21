#!/bin/bash

bundle update

rm -rf _sass/lib && mkdir -p _sass/lib

mkdir -p _sass/lib/@primer/css
mkdir -p _sass/lib/font-awesome
mkdir -p _sass/lib/rouge
mkdir -p _sass/lib/material-design-lite

# @primer/css
cp -r node_modules/@primer/css/support    _sass/lib/@primer/css
cp -r node_modules/@primer/css/base       _sass/lib/@primer/css
cp -r node_modules/@primer/css/breadcrumb _sass/lib/@primer/css
cp -r node_modules/@primer/css/buttons    _sass/lib/@primer/css
cp -r node_modules/@primer/css/forms      _sass/lib/@primer/css
cp -r node_modules/@primer/css/loaders    _sass/lib/@primer/css
cp -r node_modules/@primer/css/markdown   _sass/lib/@primer/css
cp -r node_modules/@primer/css/utilities  _sass/lib/@primer/css

# font-awesome
cp node_modules/font-awesome/scss/_variables.scss _sass/lib/font-awesome
cp node_modules/font-awesome/scss/_icons.scss     _sass/lib/font-awesome

# rouge
rougify style github | sass-convert --to scss > _sass/lib/rouge/github.scss

# material-design-lite
cp node_modules/material-design-lite/src/_color-definitions.scss  _sass/lib/material-design-lite
cp node_modules/material-design-lite/src/_functions.scss          _sass/lib/material-design-lite
cp node_modules/material-design-lite/src/_mixins.scss             _sass/lib/material-design-lite
cp node_modules/material-design-lite/src/_variables.scss          _sass/lib/material-design-lite


rm -rf assets/css/fonts && mkdir -p assets/css/fonts

# lato-font
cp -r node_modules/lato-font/fonts/lato-bold/*           assets/css/fonts
cp -r node_modules/lato-font/fonts/lato-bold-italic/*    assets/css/fonts
cp -r node_modules/lato-font/fonts/lato-normal/*         assets/css/fonts
cp -r node_modules/lato-font/fonts/lato-normal-italic/*  assets/css/fonts

# roboto-fontface
cp node_modules/roboto-fontface/fonts/roboto-slab/Roboto-Slab-Bold.woff      assets/css/fonts
cp node_modules/roboto-fontface/fonts/roboto-slab/Roboto-Slab-Bold.woff2     assets/css/fonts
cp node_modules/roboto-fontface/fonts/roboto-slab/Roboto-Slab-Regular.woff   assets/css/fonts
cp node_modules/roboto-fontface/fonts/roboto-slab/Roboto-Slab-Regular.woff2  assets/css/fonts

# font-awesome
cp -r node_modules/font-awesome/fonts/* assets/css/fonts && rm -f assets/css/fonts/FontAwesome.otf

# jquery
rm -f assets/js/jquery.min.js
cp node_modules/jquery/dist/jquery.min.js assets/js

# mermaid
rm -f assets/js/mermaid.min.js
cp node_modules/mermaid/dist/mermaid.min.js assets/js && sed -i '$d' assets/js/mermaid.min.js

# format
npm run format
