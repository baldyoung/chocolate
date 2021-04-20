package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.StudentClassRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface StudentClassRoomDao extends JpaRepository<StudentClassRoomEntity, Integer> {


}
