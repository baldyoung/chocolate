package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.List;
import java.util.Map;

public interface SpecialtyPlanDao {

    void insertSpecialtyPlan(Map param);

    void deleteSpecialtyPlan(@Param("id")Integer id);

    // void updateSpecialtyPlan(Map param);

    List<Map> selectSpecialtyPlan(@Param("specialtyId")Integer specialtyId);
}
