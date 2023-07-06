#! /bin/bash

createlocalcertificateauthority() {
    ./minica --domains localhost
    certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n "minica root" -i minica.pem
}
getdependencies(){
    sudo apt update 
    sudo apt upgrade -y 
    sudo apt install libnss3-tools -y
    
    wget https://download.redis.io/redis-stable.tar.gz
    tar -xzvf redis-stable.tar.gz

    git clone https://github.com/jsha/minica.git
    cd minica 
    go build
    cd ../
    cd redis-stable
}
cleanup() {
rm redis-stable.tar.gz

}

sudo mkdir /etc/redis
sudo mkdir /var/redis


sudo cp utils/redis_init_script /etc/init.d/redis_6379

sudo vi /etc/init.d/redis_6379

sudo cp redis.conf /etc/redis/6379.conf

sudo mkdir /var/redis/6379
