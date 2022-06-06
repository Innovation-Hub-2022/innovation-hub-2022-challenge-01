call cluster-up.cmd
call 0-ClusterAutoscaler.cmd
call externalDNS-up.cmd
call loadBalancer-up.cmd
call 1-StartApps.cmd