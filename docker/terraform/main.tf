# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/custom-service-endpoints#localstack
provider "aws" {
  region = "ap-northeast-1"
  access_key = "local"
  secret_key = "sandbox-nestjs"
  s3_force_path_style = true
  skip_credentials_validation = true
  skip_metadata_api_check = true
  skip_requesting_account_id  = true
  endpoints {
    s3 = "http://localstack:4566"
    sqs = "http://localstack:4566"
  }
}