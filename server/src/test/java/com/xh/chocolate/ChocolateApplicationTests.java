package com.xh.chocolate;

import com.xh.chocolate.common.daoModule.CourseInfoDao;
import com.xh.chocolate.common.daoModule.StudentClassDao;
import com.xh.chocolate.common.daoModule.SubjectDao;
import net.bytebuddy.asm.Advice;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@SpringBootTest
class ChocolateApplicationTests {
    @Autowired
    private SubjectDao subjectDao;
    @Autowired
    private StudentClassDao studentClassDao;


    @Test
    void contextLoads() {

        subjectDao.querySubjectList();
    }

    @Test
    void studentClassTest() {
        Map<String, String> map = new HashMap();
        map.put("specialtyId", "1");
        map.put("classNumber", "20200301");
        map.put("className", "APP软件开发01班");
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

}
