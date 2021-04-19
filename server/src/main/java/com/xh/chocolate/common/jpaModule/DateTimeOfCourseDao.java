package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.DateTimeOfCourseEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface DateTimeOfCourseDao extends JpaRepository<DateTimeOfCourseEntity, Integer> {

    void deleteByCourseId(Integer courseId);

    List<DateTimeOfCourseEntity> getDateTimeOfCourseEntitiesByCourseId(Integer courseId);

    List<DateTimeOfCourseEntity> getDateTimeOfCourseEntitiesByCourseIdIn(List<Integer> courseIds);

}
