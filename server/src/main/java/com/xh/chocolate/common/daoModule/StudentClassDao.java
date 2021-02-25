package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

/**
 * 学生班级信息
 */
public interface StudentClassDao {

    void insertStudentClass(Map param);

    void deleteStudentClass(@Param("id")Integer id);

    void updateStudentClass(Map param);

    Map selectStudentClass(@Param("id")Integer id);
}
