touch deploy.tar
tar --exclude deploy.tar -czf deploy.tar .
npm i -g caprover
caprover deploy -h $HOST -p $HOST_PASSWORD -a area -t ./deploy.tar