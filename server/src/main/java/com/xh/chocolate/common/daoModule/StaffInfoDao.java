package com.xh.chocolate.common.daoModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 职工个人信息
 */
@Repository
public interface StaffInfoDao {

    void insertStaffInfo(Map param);

    void deleteStaffInfo(@Param("id")Integer id);

    void updateStaffInfo(Map param);

    Map selectStaffInfoById(@Param("id")Integer id);

}
