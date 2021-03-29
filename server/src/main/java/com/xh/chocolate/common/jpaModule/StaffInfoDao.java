package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.StaffInfoEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 职工个人信息
 */
@Repository
public interface StaffInfoDao extends JpaRepository<StaffInfoEntity, Integer> {


    List<StaffInfoEntity> findByIdIn(List<Integer> staffIdList);
}
