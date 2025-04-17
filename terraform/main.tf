provider "aws" {
  region = var.aws_region
}

resource "aws_ecs_cluster" "todo_cluster" {
  name = var.cluster_name
}