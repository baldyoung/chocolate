package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.TeacherCompetencyEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface TeacherCompetencyDao extends JpaRepository<TeacherCompetencyEntity, Integer> {

    // 获取指定教师下所有的 授课记录
    List<TeacherCompetencyEntity> findTeacherCompetencyEntitiesByStaffId(Integer staffId);

    // 获取指定学科下所有的 授课记录
    List<TeacherCompetencyEntity> findTeacherCompetencyEntitiesBySubjectId(Integer SubjectId);

    // 删除指定教师下所有的 授课记录
    void deleteByStaffId(Integer staffId);

    // 获取给定集合内所有教师的 授课记录
    List<TeacherCompetencyEntity> findByStaffIdIn(List<Integer> staffIdList);
}
