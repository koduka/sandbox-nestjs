FROM hashicorp/terraform:0.15.5

RUN apk add bash
WORKDIR /terraform
VOLUME [ "/terraform/.terraform", "/terraform/terraform.tfstate.d" ]
COPY main.tf main.tf
ENTRYPOINT [ "" ]