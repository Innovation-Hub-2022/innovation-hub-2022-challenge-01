cd AuthorizedBackend
dotnet restore
dotnet lambda package --configuration debug --framework netcoreapp3.1 --output-package ../output/AuthorizedBackend.zip
cd ..

cd ./output
sls deploy
cd ..
