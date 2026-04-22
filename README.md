# QuickCart

`QuickCart` is a full-stack e-commerce project with a clean `ASP.NET Core Web API` backend and an `Angular` frontend. It supports customer shopping flows (auth, products, cart, checkout, order history) and admin operations (product/inventory/order management).

## Key Features

### Customer
- User registration and login
- Product listing with search and filtering
- Cart add/remove/update with local persistence
- Checkout and order placement
- My Orders / order history

### Admin
- Product CRUD operations
- Inventory and stock updates
- Order overview and management

## Tech Stack

- **Backend:** `ASP.NET Core Web API`, `Entity Framework Core`, `SQL Server`, `JWT Authentication`, `AutoMapper`
- **Frontend:** `Angular` (standalone architecture), `RxJS`
- **Solution Structure:**
	- `QuickCart.Api` → API layer (controllers, services, repositories, DTOs)
	- `QuickCart.Domain` → entities and database context
	- `QuickCart.Client` → Angular client

## Architecture Highlights

- Repository + Service pattern for clean separation of concerns
- DTO mapping via AutoMapper
- Role-based authorization (`Admin` / `Customer`) using JWT
- Transaction-safe order placement for stock consistency

## Database (Core Entities)

- `Users`
- `Categories`
- `Products`
- `Orders`
- `OrderItems`

## Getting Started

## Prerequisites

- `.NET SDK` matching project target (`net10.0`)
- `SQL Server`
- `Node.js` and `npm`
- `Angular CLI` (optional, npm scripts are available)

## Run Backend API

```powershell
dotnet restore
dotnet run --project .\QuickCart.Api\QuickCart.Api.csproj
```

## Run Frontend

```powershell
Set-Location .\QuickCart.Client
npm install
npm start
```

## Typical API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products` (Admin)
- `POST /api/orders`
- `GET /api/orders/my-orders`
