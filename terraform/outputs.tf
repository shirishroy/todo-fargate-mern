output "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  value       = aws_ecs_cluster.todo_cluster.name
}

output "frontend_service_name" {
  description = "The name of the ECS frontend service"
  value       = aws_ecs_service.frontend_service.name
}

output "backend_service_name" {
  description = "The name of the ECS backend service"
  value       = aws_ecs_service.backend_service.name
}

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = aws_lb.todo_alb.dns_name
}
