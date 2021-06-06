# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue
resource "aws_sqs_queue" "dead_letter" {
  name = "${local.app_name}-dead-letter"
}

resource "aws_sqs_queue" "main" {
  name = "${local.app_name}-queue"
  redrive_policy = jsonencode(
      {
          "deadLetterTargetArn": aws_sqs_queue.dead_letter.arn,
          "maxReceiveCount": 2
      }
  )
}