package com.xh.chocolate.common.mybatisModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface StudentClassRoomDao {

    void insertStudentClassRoom(Map param);

    void deleteStudentClassRoom(@Param("id")Integer id);

    // void updateStudentClassRoom(Map param);

    Map selectStudentClassRoom(@Param("id")Integer id);


}
