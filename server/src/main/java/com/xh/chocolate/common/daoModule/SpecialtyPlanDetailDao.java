package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface SpecialtyPlanDetailDao {

    void insertSpecialtyPlanDetail(Map param);

    void deleteSpecialtyPlanDetail(@Param("specialtyPlanId")Integer specialtyPlanId);

    // void updateSpecialtyPlanDetail(Map param);

    Map selectSpecialtyPlanDetail(@Param("id")Integer id);
}
