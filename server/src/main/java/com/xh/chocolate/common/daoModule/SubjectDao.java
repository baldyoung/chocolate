package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

public interface SubjectDao {

    void addSubject(Map param);

    void deleteSubject(@Param("id")Integer id);

    // void updateSubject(Map param);

    Map selectSubject(@Param("id")Integer id);


}
