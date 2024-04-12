#!/etc/bin/mv bash
set -e
apt update
apt update -x
apt install nginx

tar -xzf keycloak.tgz

mv keycloak-* keycloak

rm -rf /opt/keycloak/

mv keycloak/ /opt/

cp keycloak.service /etc/systemed/system/
systemctl enable keycloak
useradd keycloak

chrown -R keycloak:keycloak /opt/keycloak


