package com.xh.chocolate.common.commonService;

import com.xh.chocolate.common.jpaModule.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CourseService {
    @Autowired
    private CourseInfoDao courseInfoDao;

    @Autowired
    private DateTimeOfCourseDao dateTimeOfCourseDao;

    @Autowired
    private StaffInfoDao staffInfoDao;

    @Autowired
    private StudentClassDao studentClassDao;

    @Autowired
    private StudentClassRoomDao studentClassRoomDao;
    //
    public void getDisengagedStaff(Date date) {
        
    }


}
