package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

public interface CourseInfoDao {

    void insertCourseInfo(Map param);

    void deleteCourseInfo(@Param("id")Integer id);

    void updateCourseInfo(Map param);

    Map selectCourseInfo(@Param("id")Integer id);


}
