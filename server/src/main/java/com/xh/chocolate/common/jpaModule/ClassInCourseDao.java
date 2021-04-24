package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.ClassInCourseEntity;
//import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface ClassInCourseDao  extends JpaRepository<ClassInCourseEntity, Integer> {

    List<ClassInCourseEntity> getClassInCourseEntitiesByCourseId(Integer courseId);

    List<ClassInCourseEntity> getClassInCourseEntitiesByCourseIdIn(List<Integer> courseIdList);

    List<ClassInCourseEntity> getClassInCourseEntitiesByStudentClassId(Integer courseId);

    void deleteByCourseId(Integer courseId);

    void deleteByStudentClassId(Integer studentClassId);
}
