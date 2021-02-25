package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

public interface SpecialtyDao {

    void insertSpecialty(Map param);

    void deleteSpecialty(@Param("specialtyId")Integer specialtyId);

    // void updateSpecialty(Map param);

    Map selectSpecialty(@Param("specialtyId")Integer specialtyId);

}
