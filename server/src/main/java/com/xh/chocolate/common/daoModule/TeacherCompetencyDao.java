package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface TeacherCompetencyDao {

    void insertTeacherCompetency(Map param);

    void deleteTeacherCompetency(@Param("id")Integer id);

    // void updateTeacherCompetency(Map param);

    Map selectTeacherCompetency(@Param("id")Integer id);
}
