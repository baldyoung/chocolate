package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.DateTimeOfCourseEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface DateTimeOfCourseDao extends JpaRepository<DateTimeOfCourseEntity, Integer> {


}
