kubectl delete -f external-dns-cognito.yaml
eksctl delete iamserviceaccount --cluster t3small-cluster --name external-dns --region eu-west-2

aws iam list-policies --query "Policies[?PolicyName==`AWSR53HZIAMPolicy`].Arn" --output text > tmp.txt
set /P iampolicy=<tmp.txt
aws iam delete-policy --policy-arn %iampolicy%



