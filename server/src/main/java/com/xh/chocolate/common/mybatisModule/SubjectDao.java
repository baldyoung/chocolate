package com.xh.chocolate.common.mybatisModule;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface SubjectDao {

    void addSubject(Map param);

    void deleteSubject(@Param("id")Integer id);

    void updateSubject(Map param);

    Map selectSubject(@Param("id")Integer id);

    List<Map> querySubjectList();

}
