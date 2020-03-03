eval "virtualenv flask"
eval ". flask/bin/activate"
eval "pip3 install -r requirements"
cd react
eval "npm install"
eval "npm run build"
