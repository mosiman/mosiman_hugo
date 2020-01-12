rm -rf public/
HUGO_ENV=production hugo && rsync -avz --delete public/ d49chan@hfcs.csclub.uwaterloo.ca:~/www --exclude .htaccess
