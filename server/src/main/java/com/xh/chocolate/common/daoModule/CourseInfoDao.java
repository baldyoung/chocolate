package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface CourseInfoDao {

    void insertCourseInfo(Map param);

    void deleteCourseInfo(@Param("id")Integer id);

    void updateCourseInfo(Map param);

    Map selectCourseInfo(@Param("id")Integer id);


}
