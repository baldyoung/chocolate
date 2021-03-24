package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.CourseInfoDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.CourseInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.success;

/**
 * 课程
 */
@RestController
@RequestMapping("courseInfo")
public class CourseInfoController {
    @Autowired
    private CourseInfoDao courseInfoDao;

    /**
     * 新增一个或多个 课程
     * @param courseInfoEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postCourseInfo(@RequestBody List<CourseInfoEntity> courseInfoEntityList) {
        return success(courseInfoDao.findAll());
    }

    /**
     * 删除指定 课程
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteCourseInfo(@PathVariable("id")Integer id) {
        courseInfoDao.deleteById(id);
        return success();
    }

    /**
     * 修改指定 课程
     * @param id
     * @param courseInfoEntity
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchCourseInfo(@PathVariable("id")Integer id, @RequestBody CourseInfoEntity courseInfoEntity) {
        CourseInfoEntity courseInfoEntityOld = courseInfoDao.findById(id).get();
        courseInfoEntity.setId(null);
        EntityUtil.copyNotNullProperties(courseInfoEntity, courseInfoEntityOld);
        courseInfoDao.save(courseInfoEntity);
        return success();
    }

    /**
     * 获取当前所有的 课程
     * @return
     */
    @GetMapping
    public ResponseResult getAllCourseInfo() {
        return success(courseInfoDao.findAll());
    }

    /**
     * 获取指定的 课程
     * @param id
     * @return
     */
    @GetMapping("{id}")
    public ResponseResult getCourseInfo(@PathVariable("id")Integer id) {
        return success(courseInfoDao.findById(id).get());
    }


}
