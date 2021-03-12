package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 学生班级信息
 */
@Repository
public interface StudentClassDao {

    void insertStudentClass(Map param);

    void insertStudentClassList(@Param("studentClassList")List<Map> studentClassList);

    void deleteStudentClass(@Param("id")Integer id);

    void updateStudentClass(Map param);

    Map selectStudentClass(@Param("id")Integer id);

    List<Map> queryAllStudentClass();
}
