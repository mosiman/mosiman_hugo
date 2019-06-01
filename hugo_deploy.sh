rm -rf public/
hugo && rsync -avz --delete public/ d49chan@hfcs.csclub.uwaterloo.ca:~/www
cp ~/.htaccess ~/www
