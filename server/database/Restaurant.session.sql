CREATE database restaurant;

use restaurant;

create table Customer(
    cID int not null AUTO_INCREMENT,
    photo VARCHAR(100),
    fname varchar(30) not null,
    lname varchar(30) not null,
    username varchar(30) not null,
    password varchar(30) not null,
    contact varchar(50) not null,
    address varchar(50) not null,
    primary key(cID)
);

insert into Customer values(4,"none","Usama","Ishfaq","Usama123","Usama123","030000","Jahaniya");

select * from Customer;

create table Admin(
    adminID int not null AUTO_INCREMENT,
    photo VARCHAR(100),
    fname varchar(30) not null,
    lname varchar(30) not null,
    username varchar(30) not null,
    password varchar(30) not null,
    contact varchar(50) not null,
    address varchar(50) not null,
    primary key(cID)
);

create table Manager(
    managerID int not null AUTO_INCREMENT,
    photo VARCHAR(100),
    fname varchar(30) not null,
    lname varchar(30) not null,
    username varchar(30) not null,
    password varchar(30) not null,
    contact varchar(50) not null,
    address varchar(50) not null,
    primary key(cID)
);

create table Orders(
    oID int not null AUTO_INCREMENT,
    cID int not null,
    createAt DATETIME,
    diliveredAT Datetime,
    status varchar(30),
    totalAmount int, 
    primary key(oID),
    FOREIGN KEY(cID) REFERENCES Customer(cID)
);

drop table Orders;

insert into Orders(oID,cID,createAt,diliveredAT,status,totalAmount)
values(1,1,now(),null,"pending",null);

update Orders
set totalAmount = 1900
where oID = 1;

update Orders
set diliveredAt = now()
where oID = 1;

select * from Orders;


create table FoodItem(
    itemID int not null,
    oID int not null,
    itemPrice int,
    quantity int, 
    primary key(oID,itemID),
    FOREIGN KEY(oID) REFERENCES Orders(oID),
    FOREIGN KEY(itemID) REFERENCES MenuItems(mItemID)
);

insert into FoodItem(itemID,oID,itemPrice,quantity)
values(1,1,300,1),(2,1,1600,2);

drop table FoodItem;

select * from FoodItem;


create table MenuItems(
    mItemID int not null AUTO_INCREMENT,
    itemCat int not null,
    itemPhoto VARCHAR(100),
    itemName varchar(30) not null,
    unit_price int not null,
    primary key(mItemID),
    FOREIGN KEY (itemCat) REFERENCES Category(catID)
);

drop table MenuItems;

insert into MenuItems(mItemID,itemCat,itemPhoto,itemName,unit_price)
values(1,1,null,"star burger",300),(2,2,null,"Lazania",800),(3,3,null,"Coke",80);



select mItemID as itemID,itemName,catName as itemCategory,unit_price as itemPrice from MenuItems join Category on mItemID=catID;



create table Category(
    catID int not null AUTO_INCREMENT,
    catName varchar(30) not null,
    primary key(catID)
);

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

