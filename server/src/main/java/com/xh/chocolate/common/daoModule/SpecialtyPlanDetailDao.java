package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

public interface SpecialtyPlanDetailDao {

    void insertSpecialtyPlanDetail(Map param);

    void deleteSpecialtyPlanDetail(@Param("specialtyPlanId")Integer specialtyPlanId);

    // void updateSpecialtyPlanDetail(Map param);

    Map selectSpecialtyPlanDetail(@Param("id")Integer id);
}
