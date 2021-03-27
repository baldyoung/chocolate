package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.DateTimeOfCourseDao;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.DateTimeOfCourseEntity;
import org.apache.ibatis.annotations.Delete;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;

@RestController
@RequestMapping("dateTimeOfCourse")
public class DateTimeOfCourseController {
    private DateTimeOfCourseDao dateTimeOfCourseDao;

    @PostMapping
    public ResponseResult postDateTimeOfCourse(@RequestBody List<DateTimeOfCourseEntity> dateTimeOfCourseEntityList) {
        // 对课程Id和时间点Id进行合法性检验
        // ...
        dateTimeOfCourseEntityList.forEach(cell->cell.setId(null));
        dateTimeOfCourseDao.saveAll(dateTimeOfCourseEntityList);
        return success();
    }

    @DeleteMapping("id")
    public ResponseResult deleteDateTimeOfCourse(@PathVariable("id")Integer id) {
        dateTimeOfCourseDao.deleteById(id);
        return success();
    }

    @DeleteMapping("courseId={courseId}")
    public ResponseResult deleteDateTimeOfCourseByCourseId(@PathVariable("courseId")Integer courseId) {
        return success();
    }

    //@DeleteMapping("date")

}
