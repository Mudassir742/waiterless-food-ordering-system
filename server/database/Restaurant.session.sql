CREATE database restaurant;

use restaurant;

create table Customer(
    customerID varchar(50) not null,
    name varchar(30) not null,
    username varchar(30) not null,
    employRole VARCHAR(20),
    password varchar(30) not null,
    contact varchar(50) not null,
    address varchar(50) not null,
    primary key(customerID)
);

drop table Customer;

insert into Customer values(3,"none","Ahmad","Ahmad123","Ahmad123","030000","Gujrawala");
select * from Customer;


create table Admin(
    adminID int not null,
    photo VARCHAR(100),
    name varchar(30) not null,
    username varchar(30) not null,
    employRole VARCHAR(20) not null,
    password varchar(30) not null,
    contact varchar(50) not null,
    address varchar(50) not null,
    primary key(adminID)
);


drop table Admin;

select * from Admin;

insert into Admin(adminID,photo,name,username,employRole,password,contact,address)
VALUES(123,null,"admin","admin123","admin","admin123","030000000","Lahore")

create table Employ(
    employID VARCHAR(50) not null,
    photo VARCHAR(100),
    name varchar(50) not null,
    employRole VARCHAR(20) not null,
    username varchar(30) not null,
    password varchar(30) not null,
    contact varchar(50) not null,
    address varchar(50) not null,
    primary key(employID)
);


DROP table Employ;



SELECT * from Employ;

create table Orders(
    orderID varchar(50) not null,
    customerID varchar(50) not null,
    createAt VARCHAR(50),
    diliveredAT VARCHAR(50),
    status varchar(30),
    totalAmount int, 
    primary key(orderID)
);

SELECT * from Orders;

create table FoodItem(
    itemID varchar(50) not null,
    orderID  varchar(50) not null,
    itemPrice int,
    itemQuantity int, 
    primary key(orderID,itemID)
);

insert into FoodItem(itemID,oID,itemPrice,quantity)
values(1,1,300,1),(2,1,1600,2);


select * from FoodItem;


create table MenuItems(
    mItemID VARCHAR(50)not null,
    itemCat int not null,
    itemPhoto VARCHAR(100),
    itemName varchar(30) not null,
    unit_price int not null,
    primary key(mItemID),
    FOREIGN KEY (itemCat) REFERENCES Category(catID)
);


select * from MenuItems;

drop table MenuItems;

insert into MenuItems(mItemID,itemCat,itemPhoto,itemName,unit_price)
values(1,1,null,"star burger",300),(2,2,null,"Lazania",800),(3,3,null,"Coke",80);



select mItemID as itemID,itemName,catName as itemCategory,unit_price as itemPrice from MenuItems join Category on itemCat=catID;



create table Category(
    catID int not null AUTO_INCREMENT,
    catName varchar(30) not null,
    primary key(catID)
);

drop table Category;

create procedure prog() 
BEGIN 
    select * FROM FoodItem where oID=1;
END;

Call yaiyai();
CREATE PROCEDURE demo()
BEGIN
	UPDATE Category
    set catName='haha'
    where catID=6;
END;



insert into Category(catID,catName)
values(1,"Burger"),(2,"Pizza"),(3,"Beverges");

SELECT * from Category;
Call demo();

