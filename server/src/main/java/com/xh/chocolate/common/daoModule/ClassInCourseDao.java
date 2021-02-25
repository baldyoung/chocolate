package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface ClassInCourseDao {

    void insertClassInCourse(Map param);

    void deleteClassInCourse(@Param("courseId")Integer courseId);

    // void updateClassInCourse(Map param);

    List<Map> selectClassInCourse(Map param);
}
