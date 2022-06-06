kubectl apply -f 1-apiDotnet.yaml
rem Create an Ingress rule to proxy
kubectl apply -f ingress.yaml

rem kubectl logs -l app=api-dotnet 
