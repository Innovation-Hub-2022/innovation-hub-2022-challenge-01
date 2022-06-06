echo off
helm delete aws-load-balancer-controller -n kube-system

rem kubectl delete -f v2_4_1_full.yaml
kubectl delete -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"
rem kubectl delete -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml

aws iam delete-policy --policy-arn "arn:aws:iam::439223726434:policy/AWSLoadBalancerControllerIAMPolicy

eksctl delete iamserviceaccount --cluster t3small-cluster --name aws-load-balancer-controller --namespace kube-system --region eu-west-2


aws iam list-policies --query "Policies[?PolicyName==`AWSLoadBalancerControllerIAMPolicy`].Arn" --output text > tmp.txt
set /P iampolicy=<tmp.txt
aws iam delete-policy --policy-arn %iampolicy%


echo on