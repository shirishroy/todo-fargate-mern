resource "aws_lb" "todo_alb" {
  name               = "todo-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.todo_sg.id]
  subnets            =  [aws_subnet.public_a.id, aws_subnet.public_b.id]


  tags = {
    Name = "todo-alb"
  }
}

resource "aws_lb_target_group" "todo_target_group" {
  name     = "todo-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
   target_type  = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name = "todo-tg"
  }
}

resource "aws_lb_listener" "todo_listener" {
  load_balancer_arn = aws_lb.todo_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.todo_target_group.arn
  }
}
