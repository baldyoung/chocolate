package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.StaffInfoInCompanyEntity;
//import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 职工在司信息
 */
@Repository
public interface StaffInfoInCompanyDao extends JpaRepository<StaffInfoInCompanyEntity, Integer> {

}
