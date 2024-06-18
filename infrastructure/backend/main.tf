provider "aws" {
  region = "us-east-1"  
}

# EC2 instance for backend server
resource "aws_instance" "backend_server" {
  ami                    = "ami-0c55b159cbfafe1f0"  # Ubuntu Server 20.04 LTS AMI, update with your preferred AMI
  instance_type          = "t2.micro"  # Update with your preferred instance type
  key_name               = "your-keypair-name"  # Update with your SSH keypair name

  # Security group configuration (open ports 22 for SSH and 80 for HTTP)
  security_groups        = ["backend_server_sg"]

  # User data script to install dependencies and start server
  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nodejs npm
              git clone https://github.com/your/backend-repo.git /home/ubuntu/backend
              cd /home/ubuntu/backend
              npm install
              npm start > app.log &
              EOF

  tags = {
    Name = "BackendServer"
  }
}

# Security group for backend server
resource "aws_security_group" "backend_server_sg" {
  name        = "backend_server_sg"
  description = "Security group for backend server"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "backend_server_sg"
  }
}

# Output the public IP address of the backend server
output "backend_server_public_ip" {
  value = aws_instance.backend_server.public_ip
}

