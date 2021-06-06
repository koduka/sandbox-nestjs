variable "aws_regin" {
    default = "ap-northeast-1"
}

variable "app_name" {
    default = "sandbox-nestjs"
}

variable "app_tag" {
    default = "latest"
}

locals {
    app_name = "${terraform.workspace}-${var.app_name}"
    app_tag = local.env[terraform.workspace].app_tag
    env = {
        default = {
            app_tag = var.app_tag
        }
        dev = {
            app_tag = var.app_tag
        }
        itg = {
            app_tag = var.app_tag
        }
        prod = {
            app_tag = var.app_tag
        }
    }
}