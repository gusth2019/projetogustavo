Create database sprint;

use sprint;

create table Acesso (
login varchar (80) primary key,
senha varchar (45)
);

create table Cadastro (
cpf varchar (80) primary key,
nome varchar (80),
rg varchar (80),
fkLogin varchar (80),
foreign key (fkLogin) references Acesso(login)
);


select * from Acesso, Cadastro;


