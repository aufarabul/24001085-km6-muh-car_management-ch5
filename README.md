## account untuk login sebagai superadmin

# email : superadmin

# password : 1234

Entity Relationship Diagram (ERD) Car Management

![image](https://github.com/aufarabul/aufarabul-aufarabul-24001085-km6-muh-car_management-ch4/assets/136091204/4b1122c4-4fe8-4ec4-aaa9-3986a8d354c6)

Entitas:

- Cars
- Car Details
- Car Availabilities

Relasi:

- One Car can have One Car Details (One-to-One)
- One Car can have Many Car Availability options (One-to-Many)

Attributes:

- Cars:
  - id (Primary Key)
  - plate
  - manufacture
  - model
  - year
  - image
- Car Details:
  - id (Primary Key)
  - car_id (Foreign Key references Cars.id)
  - description
  - transmission
  - capacity
  - type
- Car Availability:
  - id (Primary Key)
  - car_id (Foreign Key references Cars.id)
  - available
  - availableAt
  - rentPerDay
