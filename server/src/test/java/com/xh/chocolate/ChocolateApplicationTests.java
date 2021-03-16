package com.xh.chocolate;

import com.xh.chocolate.common.jpaModule.*;
import com.xh.chocolate.common.mybatisModule.StudentClassDao;
import com.xh.chocolate.common.mybatisModule.SubjectDao;
import com.xh.chocolate.pojo.entity.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.Table;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
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

    @Test
    void contextLoads() {

        subjectDao.querySubjectList();
    }

    @Test
    void studentClassTest() {
        Map<String, String> map = new HashMap();
        map.put("specialtyId", "1");
        map.put("classNumber", "20200301");
        map.put("className", "APP软件开发02班");
        map.put("holderStaffId", "100101");
        map.put("classBirthday", "2020-03-06");
        map.put("initStudentAmount", "41");
        map.put("currentStudentAmount", "39");
        map.put("currentStatus", "1");
        //studentClassDao.insertStudentClass(map);
        List<Map> list = new LinkedList();
        list.add(map);
        studentClassDao.insertStudentClassList(list);

    }

    @Test
    void classInCourseTest() {
        studentClassTest();
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

}
