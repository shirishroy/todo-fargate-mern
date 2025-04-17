variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "cluster_name" {
  type    = string
  default = "todo-cluster"
}

variable "mongo_uri" {
  description = "MongoDB connection string used by the backend container"
  type        = string
}
