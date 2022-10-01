# How to mount s3 bucket as a file system

## Create S3 Bucket

Default perms seem to be restrictive enough

## Grant EC2 instance access to S3

Quick summary
- create the role
- give perms
- modify security role for ec2 instance to add new role

https://aws.amazon.com/premiumsupport/knowledge-center/ec2-instance-access-s3-bucket/

For perms
- filter by `s3`
- select `AmazonS3FullAccess`

## Install Pre-Reqs

```
sudo apt install awscli
sudo apt-get install automake autotools-dev fuse g++ git libcurl4-gnutls-dev libfuse-dev libssl-dev libxml2-dev make pkg-config
```

## Get the code

```
git clone https://github.com/s3fs-fuse/s3fs-fuse.git

```


## Compile

```
cd s3fs-fuse/
./autogen.sh
./configure --prefix=/usr --with-openssl
make
sudo make install
```

Test install
```
which s3fs
```

## Mk Dir Mount Point

```
sudo mkdir -p /s3volume/enf-fe-devops
sudo chown fedevops:fedevops /s3volume/enf-fe-devops/
sudo chmod 777 /s3volume/enf-fe-devops/
```

## Run on Command line

Very important run as the user who needs to access the bucket. Do not run as root, or sadly you can't access the drive.

```
s3fs <bucket-name> /<folder-path>/<folder-name> -o iam_role="<Role-name>" -o url="https://s3.<region-name>.amazonaws.com" -o endpoint=<region-name> -o dbglevel=info -o curldbg
```

https://bucket-name.s3.region-code.amazonaws.com/
example
```
s3fs enf-fe-devops /s3volume/enf-fe-devops -o iam_role="full_S3_access_from_ec2_instance" -o url="https://s3.us-east-1.amazonaws.com" -o endpoint=us-east-1 -o dbglevel=info -o curldbg
```

## Put in FStab

```
<bucket-name> /<folder-path>/<folder-name> fuse.s3fs _netdev,allow_other,use_path_request_style,iam_role=auto 0 0
```
example
```
enf-fe-devops /s3volume/enf-fe-devops fuse.s3fs _netdev,allow_other,use_path_request_style,iam_role=auto 0 0
```

## Test with ASW cli

```
touch /s3volume/enf-fe-devops/first.txt
aws s3 ls s3://enf-fe-devops
```
