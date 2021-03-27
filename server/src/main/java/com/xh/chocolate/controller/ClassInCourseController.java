package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.ClassInCourseDao;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.ClassInCourseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;

/**
 * 课程下所关联的班级
 */
@RestController
@RequestMapping("classInCourse")
public class ClassInCourseController {

    private ClassInCourseDao classInCourseDao;

    /**
     * 新增一条或多条 课程班级关联记录
     * @param classInCourseEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postClassInCourse(@RequestBody List<ClassInCourseEntity> classInCourseEntityList) {
        // 检查班级Id与课程Id是否合法
        // ....

        classInCourseEntityList.forEach(cell->cell.setId(null));
        classInCourseDao.saveAll(classInCourseEntityList);
        return success();
    }

    /**
     * 删除指定的 课程班级关联记录
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteClassInCourse(@PathVariable("id")Integer id) {
        classInCourseDao.deleteById(id);
        return success();
    }

    /**
     * 删除指定课程下的所有 课程班级关联记录
     * @param courseId
     * @return
     */
    @DeleteMapping("courseId={courseId}")
    public ResponseResult deleteClassInCourseByCourseId(@PathVariable("courseId")Integer courseId) {
        classInCourseDao.deleteByCourseId(courseId);
        return success();
    }

    /**
     * 删除指定班级下所有的 课程班级关联记录
     * @param classId
     * @return
     */
    @DeleteMapping("classId={classId}")
    public ResponseResult deleteClassInCourseByClassId(@PathVariable("classId")Integer classId) {
        classInCourseDao.deleteByStudentClassId(classId);
        return success();
    }

    /**
     * 获取所有的 课程班级关联数据
     * @return
     */
    @GetMapping
    public ResponseResult getClassInCourse() {
        return success(classInCourseDao.findAll());
    }

    /**
     * 获取指定课程下所有的 课程班级关联记录
     * @param courseId
     * @return
     */
    @GetMapping("courseId={courseId}")
    public ResponseResult getClassInCourseByCourseId(@PathVariable("courseId")Integer courseId) {
        return success(classInCourseDao.getClassInCourseEntitiesByCourseId(courseId));
    }

    /**
     * 获取指定班级下所有的 课程班级关联记录
     * @param classId
     * @return
     */
    @GetMapping("classId={classId}")
    public ResponseResult getClassInCourseByClassId(@PathVariable("classId")Integer classId) {
        return success(classInCourseDao.getClassInCourseEntitiesByStudentClassId(classId));
    }




}
