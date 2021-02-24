package com.xh.chocolate.common.dao;

import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

public interface StaffInfo {

    void insertStaffInfo(Map param);

    Map getStaffInfoById(@Param("id")Integer id);
}
