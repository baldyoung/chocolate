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

    /**
     * 新增一条或多条 课程时间关联
     * @param dateTimeOfCourseEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postDateTimeOfCourse(@RequestBody List<DateTimeOfCourseEntity> dateTimeOfCourseEntityList) {
        // 对课程Id和时间点Id进行合法性检验
        // ...
        dateTimeOfCourseEntityList.forEach(cell->cell.setId(null));
        dateTimeOfCourseDao.saveAll(dateTimeOfCourseEntityList);
        return success();
    }

    /**
     * 删除指定的 课程时间关联
     * @param id
     * @return
     */
    @DeleteMapping("id")
    public ResponseResult deleteDateTimeOfCourse(@PathVariable("id")Integer id) {
        dateTimeOfCourseDao.deleteById(id);
        return success();
    }

    /**
     * 删除指定课程下所有的 课程时间关联
     * @param courseId
     * @return
     */
    @DeleteMapping("courseId={courseId}")
    public ResponseResult deleteDateTimeOfCourseByCourseId(@PathVariable("courseId")Integer courseId) {
        dateTimeOfCourseDao.deleteByCourseId(courseId);
        return success();
    }

    /**
     * 获取所有的 课程时间关联
     * @return
     */
    @GetMapping
    public ResponseResult getDateTimeOfCourse() {
        return success(dateTimeOfCourseDao.findAll());
    }

    /**
     * 获取指定课程下所有的 课程时间关联
     * @param courseId
     * @return
     */
    @GetMapping("courseId={courseId}")
    public ResponseResult getDateTimeOfCourseByCourseId(@PathVariable("courseId")Integer courseId) {
        return success(dateTimeOfCourseDao.getDateTimeOfCourseEntitiesByCourseId(courseId));
    }

}
