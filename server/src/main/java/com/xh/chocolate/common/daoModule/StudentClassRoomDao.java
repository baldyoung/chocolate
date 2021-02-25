package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

public interface StudentClassRoomDao {

    void insertStudentClassRoom(Map param);

    void deleteStudentClassRoom(@Param("id")Integer id);

    // void updateStudentClassRoom(Map param);

    Map selectStudentClassRoom(@Param("id")Integer id);


}
