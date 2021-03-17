package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.StudentClassEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 学生班级信息
 */
@Repository
public interface StudentClassDao extends JpaRepository<StudentClassEntity, Integer> {

}
