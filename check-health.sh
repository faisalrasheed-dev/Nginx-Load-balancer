echo "Backend-1 Health"
docker inspect backend-1 | grep -A 5 Health
echo "Backend-2 Health"
docker inspect backend-2 | grep -A 5 Health
