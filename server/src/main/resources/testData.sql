/*
SQLyog Professional v12.09 (64 bit)
MySQL - 5.6.24 : Database - chocolate
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`chocolate` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chocolate`;

/*Table structure for table `classincourse` */

DROP TABLE IF EXISTS `classincourse`;

CREATE TABLE `classincourse` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` int(11) DEFAULT NULL,
  `studentClassId` int(11) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `classincourse` */

/*Table structure for table `courseinfo` */

DROP TABLE IF EXISTS `courseinfo`;

CREATE TABLE `courseinfo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subjectId` int(11) DEFAULT NULL,
  `staffId` int(11) DEFAULT NULL,
  `classRoomId` int(11) DEFAULT NULL,
  `courseNumber` varchar(10) DEFAULT NULL,
  `courseName` varchar(30) DEFAULT NULL,
  `courseInfo` varchar(500) DEFAULT NULL,
  `referenceHours` int(11) DEFAULT NULL,
  `courseParameter` decimal(10,0) DEFAULT NULL,
  `startDateTimeInPlan` datetime DEFAULT NULL,
  `endDateTimeInPlan` datetime DEFAULT NULL,
  `startDateTimeInFact` datetime DEFAULT NULL,
  `endDateTimeInFact` datetime DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `courseinfo` */

/*Table structure for table `datetimeofcourse` */

DROP TABLE IF EXISTS `datetimeofcourse`;

CREATE TABLE `datetimeofcourse` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` int(11) DEFAULT NULL,
  `WEEKDAY` smallint(6) DEFAULT NULL COMMENT '1:星期一 ... 7:星期天',
  `workTime` smallint(6) DEFAULT NULL COMMENT '1:第一节课 ... 3:第二节课 ...',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `datetimeofcourse` */

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `departmentNumber` varchar(10) DEFAULT NULL,
  `departmentName` varchar(20) DEFAULT NULL,
  `holderStaffId` int(11) DEFAULT NULL,
  `departmentInfo` varchar(300) DEFAULT NULL,
  `currentStatus` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `department` */

/*Table structure for table `jobidentity` */

DROP TABLE IF EXISTS `jobidentity`;

CREATE TABLE `jobidentity` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `jobIdentityNumber` varchar(10) DEFAULT NULL,
  `jobIdentityName` varchar(20) DEFAULT NULL,
  `jobIdentityInfo` varchar(200) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `jobidentity` */

/*Table structure for table `jobidentityforstaff` */

DROP TABLE IF EXISTS `jobidentityforstaff`;

CREATE TABLE `jobidentityforstaff` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `staffId` int(11) DEFAULT NULL,
  `jobIdentityId` int(11) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `jobidentityforstaff` */

/*Table structure for table `specialty` */

DROP TABLE IF EXISTS `specialty`;

CREATE TABLE `specialty` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `specialtyNumber` varchar(10) DEFAULT NULL,
  `specialtyName` varchar(20) DEFAULT NULL,
  `specialtyInfo` varchar(1000) DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `specialty` */

insert  into `specialty`(`id`,`specialtyNumber`,`specialtyName`,`specialtyInfo`,`createDateTime`,`updateDateTime`) values (1,'zy2001001','软件开发专业','IT热门专业，高薪资专业!','2021-05-16 15:20:40','2021-05-16 15:20:40'),(2,'zy2001002','云电商专业','在线电商专业','2021-05-16 15:35:38','2021-05-16 15:35:38');

/*Table structure for table `specialtyplan` */

DROP TABLE IF EXISTS `specialtyplan`;

CREATE TABLE `specialtyplan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `specialtyId` int(11) NOT NULL,
  `planName` varchar(30) DEFAULT NULL,
  `planInfo` varchar(200) DEFAULT NULL,
  `planParameters` smallint(6) DEFAULT NULL COMMENT '计划优先级',
  `startDatetime` datetime DEFAULT NULL,
  `endDatetime` datetime DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `specialtyplan` */

/*Table structure for table `specialtyplandetail` */

DROP TABLE IF EXISTS `specialtyplandetail`;

CREATE TABLE `specialtyplandetail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `specialtyPlanId` int(11) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `referenceHours` int(11) DEFAULT NULL,
  `sortParament` smallint(6) DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

/*Data for the table `specialtyplandetail` */

insert  into `specialtyplandetail`(`id`,`specialtyPlanId`,`subjectId`,`referenceHours`,`sortParament`,`createDateTime`,`updateDateTime`) values (11,1,4,80,1,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(12,1,3,80,2,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(13,1,5,120,3,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(14,1,6,100,4,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(15,1,1,120,5,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(16,1,2,120,6,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(17,1,10,120,7,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(18,1,12,100,8,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(19,1,11,120,9,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(20,1,13,200,10,'2021-05-16 15:35:01','2021-05-16 15:35:01'),(27,2,4,80,1,'2021-05-16 15:36:51','2021-05-16 15:36:51'),(28,2,3,80,2,'2021-05-16 15:36:51','2021-05-16 15:36:51'),(29,2,6,100,3,'2021-05-16 15:36:51','2021-05-16 15:36:51'),(30,2,5,120,4,'2021-05-16 15:36:51','2021-05-16 15:36:51'),(31,2,7,100,5,'2021-05-16 15:36:51','2021-05-16 15:36:51'),(32,2,8,100,6,'2021-05-16 15:36:51','2021-05-16 15:36:51'),(33,2,9,100,7,'2021-05-16 15:36:51','2021-05-16 15:36:51');

/*Table structure for table `staffaccount` */

DROP TABLE IF EXISTS `staffaccount`;

CREATE TABLE `staffaccount` (
  `id` int(11) NOT NULL COMMENT '与staffInfo表中的Id相关联',
  `accountName` varchar(10) NOT NULL,
  `accountPassword` varchar(6) NOT NULL,
  `accountRank` smallint(6) NOT NULL COMMENT '账号等级，数值越小权限越高',
  `accountStatus` smallint(6) DEFAULT NULL COMMENT '0:弃用、1:正常',
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accountName` (`accountName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `staffaccount` */

/*Table structure for table `staffinfo` */

DROP TABLE IF EXISTS `staffinfo`;

CREATE TABLE `staffinfo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `staffName` varchar(20) DEFAULT NULL,
  `staffSex` smallint(6) DEFAULT NULL COMMENT '0代表女、1代表男、2代表其它',
  `staffBirthday` date DEFAULT NULL,
  `staffNation` varchar(10) DEFAULT NULL COMMENT '国籍',
  `staffRace` varchar(15) DEFAULT NULL COMMENT '民族',
  `staffEmail` varchar(30) DEFAULT NULL,
  `staffPhoneNumber` varchar(20) DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `staffinfo` */

insert  into `staffinfo`(`id`,`staffName`,`staffSex`,`staffBirthday`,`staffNation`,`staffRace`,`staffEmail`,`staffPhoneNumber`,`createDateTime`,`updateDateTime`) values (1,'老王',1,NULL,'','',NULL,'1517979****','2021-05-16 15:37:54','2021-05-16 15:37:54'),(2,'陈龙庆',1,NULL,'','',NULL,'1517979****','2021-05-16 15:39:07','2021-05-16 15:39:07'),(3,'刘三石',1,NULL,'','',NULL,'1517979****','2021-05-16 15:40:02','2021-05-16 15:40:02'),(4,'谢老师',1,NULL,'','',NULL,'1517979****','2021-05-16 15:41:17','2021-05-16 15:41:17'),(5,'肖青争',1,NULL,'','',NULL,'1517979****','2021-05-16 15:41:48','2021-05-16 15:41:48'),(6,'张马',1,NULL,'','',NULL,'1517979****','2021-05-16 15:42:47','2021-05-16 15:42:47');

/*Table structure for table `staffinfoincompany` */

DROP TABLE IF EXISTS `staffinfoincompany`;

CREATE TABLE `staffinfoincompany` (
  `id` int(11) NOT NULL COMMENT '与staffInfo表中的Id相关联',
  `staffNumber` varchar(8) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `staffGrade` varchar(4) DEFAULT NULL COMMENT '员工等级',
  `workType` smallint(6) DEFAULT NULL COMMENT '工作类别：教师、班主任',
  `hiredate` datetime DEFAULT NULL,
  `currentWorkStatus` smallint(6) DEFAULT NULL COMMENT '0:已离职、1:在职',
  `currentWorkstatusUpdateTime` datetime DEFAULT NULL COMMENT '最新工作状态变更时间',
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `staffinfoincompany` */

/*Table structure for table `studentclass` */

DROP TABLE IF EXISTS `studentclass`;

CREATE TABLE `studentclass` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `specialtyId` int(11) DEFAULT NULL,
  `classNumber` varchar(10) DEFAULT NULL,
  `className` varchar(30) DEFAULT NULL,
  `holderStaffId` int(11) DEFAULT NULL,
  `classBirthday` datetime DEFAULT NULL COMMENT '建班时间',
  `initStudentAmount` int(11) DEFAULT NULL COMMENT '初始人数',
  `currentStudentAmount` int(11) DEFAULT NULL COMMENT '当前人数',
  `currentStatus` smallint(6) DEFAULT NULL COMMENT '当前状态  1:正常',
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `studentclass` */

insert  into `studentclass`(`id`,`specialtyId`,`classNumber`,`className`,`holderStaffId`,`classBirthday`,`initStudentAmount`,`currentStudentAmount`,`currentStatus`,`createDateTime`,`updateDateTime`) values (1,1,NULL,'APP2001',1,NULL,39,39,NULL,'2021-05-16 15:43:05','2021-05-16 15:43:05'),(2,1,NULL,'APP2002',2,NULL,39,39,NULL,'2021-05-16 15:43:27','2021-05-16 15:43:27'),(3,1,NULL,'APP2003',3,NULL,37,37,NULL,'2021-05-16 15:43:41','2021-05-16 15:43:41'),(4,2,NULL,'电商1902',5,NULL,37,37,NULL,'2021-05-16 15:44:02','2021-05-16 15:44:02'),(5,2,NULL,'电商1901',6,NULL,31,37,NULL,'2021-05-16 15:44:13','2021-05-16 15:44:13');

/*Table structure for table `studentclassroom` */

DROP TABLE IF EXISTS `studentclassroom`;

CREATE TABLE `studentclassroom` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `classRoomNumber` varchar(8) DEFAULT NULL,
  `classRoomName` varchar(30) DEFAULT NULL,
  `classRoomInfo` varchar(500) DEFAULT NULL,
  `standardPeopleAmount` int(11) DEFAULT NULL,
  `typeFlag` smallint(6) DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `studentclassroom` */

insert  into `studentclassroom`(`id`,`classRoomNumber`,`classRoomName`,`classRoomInfo`,`standardPeopleAmount`,`typeFlag`,`createDateTime`,`updateDateTime`) values (1,'js001','教学楼301','',40,1,'2021-05-16 15:29:58','2021-05-16 15:29:58'),(2,'js002','教学楼302','投影仪教室',40,1,'2021-05-16 15:30:38','2021-05-16 15:30:38'),(3,'js003','教学楼303','投影仪教室',50,1,'2021-05-16 15:30:56','2021-05-16 15:30:56'),(4,'js004','教学楼304','触控板教室',30,0,'2021-05-16 15:31:23','2021-05-16 15:31:23'),(5,'js005','教学楼305','投影仪教室',40,1,'2021-05-16 15:31:43','2021-05-16 15:31:43'),(6,'js006','教学楼306','投影仪教室',40,1,'2021-05-16 15:32:02','2021-05-16 15:32:02'),(7,'js007','教学楼307','投影仪教室',40,1,'2021-05-16 15:32:15','2021-05-16 15:32:15'),(8,'js008','教学楼308','触控板教室',50,0,'2021-05-16 15:32:31','2021-05-16 15:32:31');

/*Table structure for table `studentclasssubjectinhistory` */

DROP TABLE IF EXISTS `studentclasssubjectinhistory`;

CREATE TABLE `studentclasssubjectinhistory` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `studentClassId` int(11) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `subjectName` varchar(15) DEFAULT NULL,
  `subjectNumber` varchar(6) DEFAULT NULL,
  `standardHours` int(11) DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `studentclasssubjectinhistory` */

/*Table structure for table `subject` */

DROP TABLE IF EXISTS `subject`;

CREATE TABLE `subject` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subjectNumber` varchar(6) DEFAULT NULL,
  `subjectName` varchar(15) DEFAULT NULL,
  `standardHours` int(11) DEFAULT NULL COMMENT '标准学时',
  `standardCoefficient` decimal(10,2) DEFAULT NULL COMMENT '课时系数',
  `typeFlag` smallint(6) DEFAULT '0' COMMENT '类型标识：无限制0、需要电脑1',
  `subjectInfo` varchar(500) DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `subject` */

insert  into `subject`(`id`,`subjectNumber`,`subjectName`,`standardHours`,`standardCoefficient`,`typeFlag`,`subjectInfo`,`createDateTime`,`updateDateTime`) values (1,'000001','HTML5+CSS3',120,'1.50',NULL,'软件专业必修课','2021-05-16 15:22:30','2021-05-16 15:22:30'),(2,'000002','JavaScript',120,'1.50',NULL,'软件专业必修课程，前端开发必学！','2021-05-16 15:23:09','2021-05-16 15:23:09'),(3,'000003','计算机基础课程',80,'1.30',NULL,'所有专业的通识必修课！','2021-05-16 15:23:42','2021-05-16 15:23:42'),(4,'000004','计算机打字训练',80,'1.30',NULL,'所有专业的通识必修课程。','2021-05-16 15:24:18','2021-05-16 15:24:18'),(5,'000005','office办公基础',120,'1.30',NULL,'所有专业的通识必修课程。','2021-05-16 15:24:50','2021-05-16 15:24:50'),(6,'000006','计算机组成原理',100,'1.50',NULL,'软件专业必修课程，其他专业选修课程。','2021-05-16 15:25:32','2021-05-16 15:25:32'),(7,'000007','电子商务基础',100,'1.30',NULL,'电商相关专业的必修课，其他专业选修通识课程。','2021-05-16 15:26:17','2021-05-16 15:26:17'),(8,'000008','天猫开店基础',100,'1.30',NULL,'天猫开店基础，是学习天猫开店的基础课程。','2021-05-16 15:26:50','2021-05-16 15:26:50'),(9,'000009','淘宝开店基础',100,'1.30',NULL,'淘宝开店呗','2021-05-16 15:27:09','2021-05-16 15:27:09'),(10,'000010','JQuery',120,'1.50',NULL,'前端开发必修课，软件专业选修专业课。','2021-05-16 15:27:49','2021-05-16 15:27:49'),(11,'000011','Java程序设计',120,'1.50',NULL,'软件专业必修课','2021-05-16 15:28:10','2021-05-16 15:28:10'),(12,'000012','数据库基础',100,'1.30',NULL,'数据库基础是软件专业必修课，其他专业选修课程。','2021-05-16 15:28:47','2021-05-16 15:28:47'),(13,'000013','JavaEE企业级开发',200,'1.50',NULL,'软件专业必修课。','2021-05-16 15:29:17','2021-05-16 15:29:17');

/*Table structure for table `teachercompetency` */

DROP TABLE IF EXISTS `teachercompetency`;

CREATE TABLE `teachercompetency` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `staffId` int(11) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `score` smallint(6) DEFAULT NULL,
  `createDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `teachercompetency` */

insert  into `teachercompetency`(`id`,`staffId`,`subjectId`,`score`,`createDateTime`,`updateDateTime`) values (1,1,3,NULL,'2021-05-16 15:37:54','2021-05-16 15:37:54'),(2,1,4,NULL,'2021-05-16 15:37:54','2021-05-16 15:37:54'),(3,1,5,NULL,'2021-05-16 15:37:54','2021-05-16 15:37:54'),(4,1,7,NULL,'2021-05-16 15:37:54','2021-05-16 15:37:54'),(5,1,8,NULL,'2021-05-16 15:37:54','2021-05-16 15:37:54'),(6,1,9,NULL,'2021-05-16 15:37:54','2021-05-16 15:37:54'),(7,2,4,NULL,'2021-05-16 15:39:07','2021-05-16 15:39:07'),(8,2,5,NULL,'2021-05-16 15:39:07','2021-05-16 15:39:07'),(9,2,7,NULL,'2021-05-16 15:39:07','2021-05-16 15:39:07'),(10,2,8,NULL,'2021-05-16 15:39:07','2021-05-16 15:39:07'),(11,2,9,NULL,'2021-05-16 15:39:07','2021-05-16 15:39:07'),(12,3,1,NULL,'2021-05-16 15:40:02','2021-05-16 15:40:02'),(13,3,2,NULL,'2021-05-16 15:40:02','2021-05-16 15:40:02'),(14,3,10,NULL,'2021-05-16 15:40:02','2021-05-16 15:40:02'),(15,3,3,NULL,'2021-05-16 15:40:02','2021-05-16 15:40:02'),(16,3,6,NULL,'2021-05-16 15:40:02','2021-05-16 15:40:02'),(17,4,1,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(18,4,2,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(19,4,4,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(20,4,3,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(21,4,5,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(22,4,6,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(23,4,6,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(24,4,10,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(25,4,11,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(26,4,12,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(27,4,13,NULL,'2021-05-16 15:41:17','2021-05-16 15:41:17'),(28,5,1,NULL,'2021-05-16 15:41:48','2021-05-16 15:41:48'),(29,5,2,NULL,'2021-05-16 15:41:48','2021-05-16 15:41:48'),(30,5,9,NULL,'2021-05-16 15:41:48','2021-05-16 15:41:48'),(31,6,1,NULL,'2021-05-16 15:42:47','2021-05-16 15:42:47'),(32,6,2,NULL,'2021-05-16 15:42:47','2021-05-16 15:42:47'),(33,6,4,NULL,'2021-05-16 15:42:47','2021-05-16 15:42:47'),(34,6,3,NULL,'2021-05-16 15:42:47','2021-05-16 15:42:47'),(35,6,12,NULL,'2021-05-16 15:42:47','2021-05-16 15:42:47');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
