/*
chocolate
# 版本号:Version 1.0.00 --- 2021-02-20
 初始化创建
# specialtyPlan 表修改 --- 2021-03-24
 specialtyName => planName
 add : planInfo
# 新增studentClassSubjectInHistory表，用于记录班级已授学科，但是非必要！ --- 2020-03-29
# subject表，新增一个typeflag字段，用于标识学科类型   --- 2020-04-09
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
DROP TABLE IF EXISTS staffInfo;
CREATE TABLE staffInfo (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	staffName VARCHAR(20),
	staffSex SMALLINT COMMENT'0代表女、1代表男、2代表其它',
	staffBirthday DATE,
	staffNation VARCHAR(10) COMMENT'国籍',
	staffRace VARCHAR(15) COMMENT'民族',
	staffEmail VARCHAR(30),
	staffPhoneNumber VARCHAR(20),
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
-- 员工就职信息
DROP TABLE IF EXISTS staffInfoInCompany;
CREATE TABLE staffInfoInCompany (
	id INT NOT NULL COMMENT'与staffInfo表中的Id相关联',
	staffNumber VARCHAR(8),
	departmentId INT,
	staffGrade VARCHAR(4) COMMENT'员工等级',
	workType SMALLINT COMMENT'工作类别：教师、班主任',
	hiredate DATETIME,
	currentWorkStatus SMALLINT COMMENT'0:已离职、1:在职',
	currentWorkstatusUpdateTime DATETIME COMMENT'最新工作状态变更时间',
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
-- 员工职位关联表
DROP TABLE IF EXISTS jobIdentityForStaff;
CREATE TABLE jobIdentityForStaff (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	staffId INT,
	jobIdentityId INT
);
	
-- 员工账号表
DROP TABLE IF EXISTS staffAccount;
CREATE TABLE staffAccount (
	id INT NOT NULL COMMENT'与staffInfo表中的Id相关联',
	accountName VARCHAR(10) UNIQUE NOT NULL,
	accountPassword VARCHAR(6) NOT NULL,
	accountRank SMALLINT NOT NULL COMMENT'账号等级，数值越小权限越高',
	accountStatus SMALLINT COMMENT'0:弃用、1:正常',
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
-- 部门表
DROP TABLE IF EXISTS department;
CREATE TABLE department (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	departmentNumber VARCHAR(10),
	departmentName VARCHAR(20),
	holderStaffId INT,
	departmentInfo VARCHAR(300),
	currentStatus SMALLINT,
	PRIMARY KEY (id)
);
-- 职位表
DROP TABLE IF EXISTS jobIdentity;
CREATE TABLE jobIdentity (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	jobIdentityNumber VARCHAR(10),
	jobIdentityName VARCHAR(20),
	jobIdentityInfo VARCHAR(200)
);
-- 专业表
DROP TABLE IF EXISTS specialty;
CREATE TABLE specialty (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	specialtyNumber VARCHAR(10),
	specialtyName VARCHAR(20),
	specialtyInfo VARCHAR(1000),
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 专业计划表
DROP TABLE IF EXISTS specialtyPlan;
CREATE TABLE specialtyPlan (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	specialtyId INT NOT NULL,
	planName VARCHAR(30),
	planInfo varchar(200),
	planParameters SMALLINT COMMENT'计划优先级',
	startDatetime DATETIME,
	endDatetime DATETIME,
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 学科表
DROP TABLE IF EXISTS SUBJECT;
CREATE TABLE SUBJECT (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	subjectNumber VARCHAR(6),
	subjectName VARCHAR(15),
	standardHours INT COMMENT '标准学时',
	standardCoefficient DECIMAL(10,2) COMMENT '课时系数',
	typeFlag SMALLINT DEFAULT 0 COMMENT '类型标识：无限制0、需要电脑1',
	subjectInfo VARCHAR(500),
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 专业学科计划表
DROP TABLE IF EXISTS specialtyPlanDetail;
CREATE TABLE specialtyPlanDetail (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	specialtyPlanId INT,
	subjectId INT,
	referenceHours INT,
	sortParament SMALLINT,
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 教师授课表
DROP TABLE IF EXISTS teacherCompetency;
CREATE TABLE teacherCompetency (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	staffId INT,
	subjectId INT,
	score SMALLINT,
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 班级表
DROP TABLE IF EXISTS studentClass;
CREATE TABLE studentClass (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	specialtyId INT,
	classNumber VARCHAR(10),
	className VARCHAR(30),
	holderStaffId INT,
	classBirthday DATETIME COMMENT'建班时间',
	initStudentAmount INT COMMENT'初始人数',
	currentStudentAmount INT COMMENT'当前人数',
	currentStatus SMALLINT COMMENT'当前状态  1:正常',
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 班级已授学科  (暂废）
DROP TABLE IF EXISTS studentClassSubjectInHistory;
CREATE TABLE studentClassSubjectInHistory (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	studentClassId INT,
	subjectId INT,
	subjectName VARCHAR(15),
	subjectNumber VARCHAR(6),
	standardHours INT,
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- 教室表
DROP TABLE IF EXISTS studentClassRoom;
CREATE TABLE studentClassRoom (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	classRoomNumber VARCHAR(8),
	classRoomName VARCHAR(30),
	classRoomInfo VARCHAR(500),
	standardPeopleAmount INT,
	typeFlag SMALLINT,
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 课程信息表
DROP TABLE IF EXISTS courseInfo;
CREATE TABLE courseInfo (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	subjectId INT,
	staffId INT,
	classRoomId INT,
	courseNumber VARCHAR(10),
	courseName VARCHAR(30),
	courseInfo VARCHAR(500),
	referenceHours INT,
	courseParameter DECIMAL,
	startDateTimeInPlan DATETIME,
	endDateTimeInPlan DATETIME,
	startDateTimeInFact DATETIME,
	endDateTimeInFact DATETIME,
	createDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 课程班级关联表
DROP TABLE IF EXISTS classInCourse;
CREATE TABLE classInCourse (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	courseId INT,
	studentClassId INT
);
-- 课程时间安排表
DROP TABLE IF EXISTS datetimeOfCourse;
CREATE TABLE datetimeOfCourse (
	id INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
	courseId INT,
	WEEKDAY SMALLINT COMMENT'1:星期一 ... 7:星期天',
	workTime SMALLINT COMMENT'1:第一节课 ... 3:第二节课 ...'
);
	
	



