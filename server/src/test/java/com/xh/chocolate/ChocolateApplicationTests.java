package com.xh.chocolate;

import com.xh.chocolate.common.jpaModule.*;
import com.xh.chocolate.common.jpaModule.StudentClassDao;
import com.xh.chocolate.common.jpaModule.SubjectDao;
import com.xh.chocolate.pojo.entity.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.Table;

import static java.lang.System.*;
@SpringBootTest
class ChocolateApplicationTests {
    @Autowired
    private SubjectDao subjectDao;
    @Autowired
    private StudentClassDao studentClassDao;
    @Autowired
    private ClassInCourseDao classInCourseDao;
    @Autowired
    private CourseInfoDao courseInfoDao;
    @Autowired
    private DateTimeOfCourseDao dateTimeOfCourseDao;
    @Autowired
    private SpecialtyDao specialtyDao;
    @Autowired
    private SpecialtyPlanDao specialtyPlanDao;
    @Autowired
    private SpecialtyPlanDetailDao specialtyPlanDetailDao;
    @Autowired
    private StaffInfoDao staffInfoDao;
    @Autowired
    private StaffInfoInCompanyDao staffInfoInCompanyDao;
    @Autowired
    private StudentClassRoomDao studentClassRoomDao;
    @Autowired
    private TeacherCompetencyDao teacherCompetencyDao;


    @Test
    void contextLoads() {

    }



    @Test
    void classInCourseTest() {
        ClassInCourseEntity entity = new ClassInCourseEntity();
        entity.setId(1);
        entity.setCourseId(10010);
        entity.setStudentClassId(303254);
        classInCourseDao.save(entity);
        System.out.println(classInCourseDao.findAll());
    }

    @Test
    void CourseInfoTest() {
        CourseInfoEntity entity = new CourseInfoEntity();
        entity.setCourseName("Java程序设计");
        out.println("CourseInfo 表数据 增");
        courseInfoDao.save(entity);
        out.println("CourseInfo 表数据 查");
        System.out.println(courseInfoDao.findAll());
        out.println("CourseInfo 表数据 删");
        courseInfoDao.delete(courseInfoDao.findAll().get(0));
    }

    @Test
    void DateTimeOfCourseTest() {
        DateTimeOfCourseEntity entity = new DateTimeOfCourseEntity();
        entity.setCourseId(1001);
        entity.setWeekDay(3);
        entity.setWorkTime(3);
        dateTimeOfCourseDao.save(entity);
        out.println(dateTimeOfCourseDao.findAll());
    }

    @Test
    void SpecialtyTest() {
        SpecialtyEntity entity = new SpecialtyEntity();
        entity.setSpecialtyName("软件开发专业");
        specialtyDao.save(entity);
        out.println(specialtyDao.findAll());
    }

    @Test
    void SpecialtyPlanTest() {
        SpecialtyPlanEntity entity = new SpecialtyPlanEntity();
        entity.setSpecialtyId(3333);
        entity.setSpecialtyName("HTML5+CSS3");
        specialtyPlanDao.save(entity);
        out.println(specialtyPlanDao.findAll());
    }

    @Test
    void SpecialtyPlanDetailTest() {
        SpecialtyPlanDetailEntity entity = new SpecialtyPlanDetailEntity();
        entity.setSubjectId(666);
        specialtyPlanDetailDao.save(entity);
        out.println(specialtyPlanDetailDao.findAll());
    }

    @Test
    void StaffInfoTest() {
        StaffInfoEntity entity = new StaffInfoEntity();
        entity.setStaffName("胖胖的磊磊");
        staffInfoDao.save(entity);
        out.println(staffInfoDao.findAll());
    }

    @Test
    void StaffInfoInCompanyTest() {
        StaffInfoInCompanyEntity entity = new StaffInfoInCompanyEntity();
        entity.setId(3303);
        staffInfoInCompanyDao.save(entity);
        out.println(staffInfoInCompanyDao.findAll());
    }

    @Test
    void StudentClassTest() {
        StudentClassEntity entity = new StudentClassEntity();
        entity.setSpecialtyId(3366);
        studentClassDao.save(entity);
        out.println(studentClassDao.findAll());
    }

    @Test
    void StudentClassRoomTest() {
        StudentClassRoomEntity entity = new StudentClassRoomEntity();
        entity.setClassRoomName("教学楼404");
        studentClassRoomDao.save(entity);
        out.println(studentClassRoomDao.findAll());
    }

    @Test
    void SubjectTest() {
        SubjectEntity entity = new SubjectEntity();
        entity.setSubjectName("Java 程序设计");
        subjectDao.save(entity);
        out.println(subjectDao.findAll());
    }

    @Test
    void TeacherCompetencyTest() {
        TeacherCompetencyEntity entity = new TeacherCompetencyEntity();
        entity.setStaffId(1033);
        teacherCompetencyDao.save(entity);
        out.println(teacherCompetencyDao.findAll());
    }
}
