# hackman
Password from song lyric, implemented as a PWA

## PWA Local Development Environment
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Secure_connection

Apache runs but I did not get the config permissions to work ... only a brief experiment before moving on.
As it says in the Mozilla page, "a difficult to remember server root location and configuration process".
```
sudo apachectl start
grep DocumentRoot /etc/apache2/httpd.conf 
sudo apachectl stop
```

Node's http-server worked, loading pages at http://localhost:8080/ or http://127.0.0.1:8080/
```
npx http-server /Users/joclarke/Code/hackman/CycleTracker
```


https://github.com/lwsjs/local-web-server/wiki/How-to-get-the-%22green-padlock%22-using-the-built-in-certificate
```
nvm which current # gave /Users/joclarke/.nvm/versions/node/v20.14.0/bin/node
ls -l /Users/joclarke/.nvm/versions/node/v20.14.0/lib/node_modules/ # lists folders but not lws/ssl
```

https://support.apple.com/en-gb/guide/keychain-access/kyca8916/mac got me to create a certificate

https://medium.com/@jonsamp/how-to-set-up-https-on-localhost-for-macos-b597bcf935ee ... the following executes, and I get https pages
served but with `Not Secure` warnings.
```
cd 
mkdir .localhost-ssl
cd .localhost-ssl/
sudo openssl genrsa -out ~/.localhost-ssl/localhost.key 2048
sudo openssl req -new -x509 -key ~/.localhost-ssl/localhost.key -out ~/.localhost-ssl/localhost.crt -days 3650 -subj /CN=localhost
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/.localhost-ssl/localhost.crt

cd ~/Code/hackman/CycleTracker
npm install -g http-server
http-server --ssl --cert ~/.localhost-ssl/localhost.crt --key ~/.localhost-ssl/localhost.key
```


```
npm install -g local-web-server
cd ~/user/yourName/CycleTracker/
ws --https
```
