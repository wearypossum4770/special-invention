curl -s https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js \
  | openssl dgst -sha384 -binary \
  | openssl base64 -A
