
# Streamoid Project

A backend service for managing product catalogs with CSV upload, validation, and advanced search capabilities. Built with Node.js, Express, MongoDB, and Docker.


## Features

- **CSV File Upload** with comprehensive validation
- **Product Management** with pagination support
- **Advanced Search** with brand, color, and price range filters
- **Data Validation** (price ≤ MRP, quantity ≥ 0)
- **Docker Containerization** for easy deployment
- **Unit Testing** — 17/17 tests passing
- **RESTful API Design** with proper error handling



## Tech Stack

### Backend
- Node.js – Runtime environment
- Express.js – Web framework
- MongoDB – Database 

### File Processing
- Multer – File upload middleware
- CSV Parser – CSV file processing

### Validation & Testing
- Jest – Testing framework

### Deployment & Containerization
- Docker – Containerization
- Docker Compose – Multi-container orchestration
- MongoDB in Docker – Local development database

## Installation

### Prerequisites
- Docker and Docker Compose
- (Optional) Node.js 16+ and MongoDB for local development

## One-Command Setup with Docker
### 1. Clone and run
```bash
  git clone https://github.com/Mayank233444/streamoid-project.git
  cd streamoid-project
```
### 2. Start everything (includes database)
```bash
  docker-compose up --build
```


## API Documentation
- Recommended to use command prompt  for testing api response.
- Can also use Postman to send requests and view responses better.
### Base URL

```bash
  http://localhost:8000/api
```
### 1. Upload CSV File
- Upload a CSV file containing product data with automatic validation.
#### Endpoint:
```bash
 POST /api/upload
```
#### Request:
```bash
curl -X POST -F "file=@test-products.csv" http://localhost:8000/api/upload

```
##### For Powershell use this command :
```bash
curl.exe -X POST -F "file=@test-products.csv" http://localhost:8000/api/upload
```

### 2. List Products
- Get all products with pagination.
#### Endpoint:
```bash
 GET /api/products
```
#### Query Parameters:

| Parameter | Description     | Default        |
| :-------- | :------- | :------------------------- |
| `page` | `Page number` | 1 |
| `limit` | `Products per page` | 10 |

#### Example Request:
```bash
curl "http://localhost:8000/api/products?page=1&limit=5"

```

### 3. Search Products
- Search and filter products by brand, color, and price range.
#### Endpoint:
```bash
 GET /api/products/search
```
#### Query Parameters:

| Parameter | Description  
| :-------- | :------- | 
| `brand` | `Filter by brand (case-insensitive)` 
| `color` | `Filter by color (case-insensitive)` 
| `minPrice` | `Minimum price filter` 
| `maxPrice` | `Maximum price filter` 

#### Example Request:
#### Search by brand
```bash
curl "http://localhost:8000/api/products/search?brand=StreamThreads"

```

#### Search by color
```bash
curl "http://localhost:8000/api/products/search?color=Red"

```
#### Search by price range
```bash
curl "http://localhost:8000/api/products/search?minPrice=500&maxPrice=1000"

```
#### Combined search
```bash
curl "http://localhost:8000/api/products/search?brand=StreamThreads&maxPrice=1000"

```



## Running Unit Tests


```bash
  docker-compose exec app npm test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `MONGODB_URI=mongodb://mongodb:27017/product_catalog`
- `PORT=8000`


## Authors

- [Mayank Bindal](https://github.com/Mayank233444)

