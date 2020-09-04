show databases;

create database geolocation;

use geolocation;

show tables;

CREATE TABLE `users` (
 `email` varchar(100)  Primary key,
 `password` varchar(255) NOT NULL,
 `firstname` varchar(100) NOT NULL, 
 `lastname` varchar(100) NOT NULL,
 `mobile` varchar(100) NOT NULL,
 `securityquestion` varchar (100) NOT NULL,
 `answer` varchar(100) NOT NULL,
 CONSTRAINT FK_securityquestion FOREIGN KEY (`securityquestion`)
    REFERENCES `securityQs`(`securityquestion`)
);

CREATE TABLE `securityQs` (
 `securityquestion` varchar (100) not null,
 Primary key(`securityquestion`)
);

show tables;

Insert into users (email, `password`, firstname, lastname, mobile, securityquestion, answer)
	values ("test@test.com", "Qwerty@12", "Name", "Surname", "9832231346", "What is your favourite color?", "yellow");
    
select * from users;
select * from securityQs;

insert into securityQs(securityquestion)
values('What is your favourite color?'),
('Where is your birthplace?'),
('Who is your favourite teacher?');


commit;
drop table securityquestion;


update users set password = "Qwerty@123" where email="ysp551996@gmail.com" ;
commit;

delete from users where email = "test@test.com";

-- What is your favourite color?</option>
--             <option>Where is your birthplace?</option>
--             <option>Who is your favourite teacher?


