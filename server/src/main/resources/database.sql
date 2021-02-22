/*
chocolate
# 版本号:Version 1.0.00 --- 2021-02-20
 初始化创建

*/
/*
查看建数据库的语句
show create database MiniBlog;
查看建表的语句
SHOW CREATE TABLE MB_User;
修改数据库密码
update user set authentication_string=PASSWORD('bd3366x,') where User='root';
alter user 'root'@'localhost' identified by 'vita2019';
flush privileges;
*/
-- ------------------------------------------------------------------------------------------------
-- 创建数据库
/*
character 指定数据库存储字符串的默认字符集；
collate 指定数据库的默认校对规则，用来比较字符串的方式，解决排序和字符分组的问题；
*/
CREATE DATABASE IF NOT EXISTS chocolate
	DEFAULT CHARACTER SET utf8
	DEFAULT COLLATE utf8_general_ci;
-- 跳转到指定数据库下
USE chocolate;
-- 员工个人信息表
drop table if exists staffInfo;
create table staffInfo (
	id int UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	staffName varchar(20),
	staffSex smallint comment'0代表女、1代表男、2代表其它',
	staffBirthday date,
	staffNation varchar(10) comment'国籍',
	staffRace varchar(15) comment'民族',
	staffEmail varchar(30),
	staffPhoneNumber varchar(20),
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
-- 员工就职信息
drop table if exists staffInfoInCompany;
create table staffInfoInCompany (
	id int not null comment'与staffInfo表中的Id相关联',
	staffNumber varchar(8),
	departmentId int,
	jobIdentityId int,
	staffGrade varchar(4) comment'员工等级',
	hiredate datetime,
	currentWorkStatus smallint comment'0:已离职、1:在职',
	currentWorkstatusUpdateTime datetime comment'最新工作状态变更时间'
);
-- 员工账号表
drop table if exists staffAccount;
create table staffAccount (
	id int not null comment'与staffInfo表中的Id相关联',
	accountName varchar(10) unique not null,
	accountPassword varchar(6) not null,
	accountRank smallint not null comment'账号等级，数值越小权限越高',
	accountStatus smallint comment'0:弃用、1:正常',
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 部门表
-- 职位表
-- 专业表
drop table if exists specialty;
create table specialty (
	id int UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	specialtyNumber varchar(10),
	specialtyName varchar(20),
	specialtyInfo

	



