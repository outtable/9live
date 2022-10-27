cd docs
sed 's#http://localhost:4000/#https://www.crab-ios-mj.xyz/#g' _site/sitemap.xml > _site/sitemap.xml
cd _site
git add .
git commit -m 'change'
git push