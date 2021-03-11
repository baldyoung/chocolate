package com.xh.chocolate;

import com.xh.chocolate.common.daoModule.CourseInfoDao;
import com.xh.chocolate.common.daoModule.SubjectDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ChocolateApplicationTests {
    @Autowired
    private SubjectDao subjectDao;
    @Test
    void contextLoads() {

        subjectDao.querySubjectList();
    }

}
