aws iam create-policy --policy-name AWSR53HZIAMPolicy --policy-document file://external_dns.json

eksctl create iamserviceaccount --cluster=t3small-cluster --name=external-dns --attach-policy-arn=arn:aws:iam::439223726434:policy/AWSR53HZIAMPolicy --region=eu-west-2 --approve --override-existing-serviceaccounts

kubectl apply -f external-dns-cognito.yaml
kubectl logs -l app=external-dns -f
