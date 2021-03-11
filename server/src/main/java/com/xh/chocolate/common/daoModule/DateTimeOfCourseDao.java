package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface DateTimeOfCourseDao {

    void insertDateTimeOfCourse(Map param);

    void deleteDateTimeOfCourse(@Param("courseId")Integer courseId);

    // void updateDateTimeOfCourse(Map param);

    Map selectDateTimeOfCourse(@Param("courseId")Integer courseId);

}
