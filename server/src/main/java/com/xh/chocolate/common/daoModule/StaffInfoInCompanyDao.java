package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 职工在司信息
 */
@Repository
public interface StaffInfoInCompanyDao {

    void insertStaffInfoInCompany(Map param);

    void deleteStaffInfoInCompany(@Param("id")Integer id);

    // void updateStaffInfoInCompany(Map param);

    Map seleteStaffInfoInCompany(@Param("id")Integer id);
}
