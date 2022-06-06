echo off
rem 			Create Ingress controller & LoadBalancer
rem https://aws.amazon.com/blogs/containers/how-to-use-application-load-balancer-and-amazon-cognito-to-authenticate-users-for-your-kubernetes-web-apps/
rem https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/tasks/cognito_authentication/

aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam-policy.json
eksctl create iamserviceaccount --cluster=t3small-cluster --region=eu-west-2 --namespace=kube-system --name=aws-load-balancer-controller --override-existing-serviceaccounts --attach-policy-arn=arn:aws:iam::439223726434:policy/AWSLoadBalancerControllerIAMPolicy --approve

rem kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml
rem kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller/crds?ref=master"
rem kubectl apply -f v2_4_1_full.yaml

echo on


rem Get EKS cluster VPC ID

helm repo add eks https://aws.github.io/eks-charts && helm repo update

kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller//crds?ref=master"

aws eks describe-cluster --name t3small-cluster --region eu-west-2 --query "cluster.resourcesVpcConfig.vpcId" --output text > tmp.txt
set /P COK_VPC_ID=<tmp.txt
echo %COK_VPC_ID%
helm install aws-load-balancer-controller eks/aws-load-balancer-controller --namespace kube-system --set clusterName=t3small-cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller --set vpcId=%COK_VPC_ID% --set region=eu-west-2  

