provider "aws" {
  region = "us-east-1"  
}

# S3 bucket for frontend files
resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "my-frontend-bucket"  # Update with a unique bucket name
  acl    = "public-read"

  website {
    index_document = "index.html"
  }

  tags = {
    Name = "FrontendBucket"
  }
}

# Output the bucket URL
output "frontend_bucket_url" {
  value = aws_s3_bucket.frontend_bucket.website_endpoint
}

