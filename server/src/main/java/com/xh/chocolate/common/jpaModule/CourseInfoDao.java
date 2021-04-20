package com.xh.chocolate.common.jpaModule;

import com.xh.chocolate.pojo.entity.CourseInfoEntity;
//import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;
@Repository
public interface CourseInfoDao extends JpaRepository<CourseInfoEntity, Integer> {


    List<CourseInfoEntity> getCourseInfoEntitiesByStaffId(Integer staffId);

    List<CourseInfoEntity> getCourseInfoEntitiesByClassRoomId(Integer classRoomId);

    List<CourseInfoEntity> getCourseInfoEntitiesByStartDateTimeInFactBeforeAndEndDateTimeInFactAfter(Date startDate, Date endDate);

    List<CourseInfoEntity> getCourseInfoEntitiesByEndDateTimeInFactAfter(Date date);

}
