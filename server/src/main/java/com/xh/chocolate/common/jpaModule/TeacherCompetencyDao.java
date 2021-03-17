package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.TeacherCompetencyEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface TeacherCompetencyDao extends JpaRepository<TeacherCompetencyEntity, Integer> {

}
