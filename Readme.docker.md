Tutorial: https://www.youtube.com/watch?v=RBpDLP9ZoCk 
Connection issue: https://stackoverflow.com/questions/46749817/cloud-sql-instance-connection-working-locally-but-not-on-app-engine 

GCP official guide: https://cloud.google.com/sql/docs/mysql/connect-run
```
docker buildx build --platform linux/amd64 -t mybooks-backend -f Dockerfile.prod . 
```

```
docker tag mybooks-backend asia-south1-docker.pkg.dev/achiev-backend-prod/mybooks-backend/mybooks-backend
```