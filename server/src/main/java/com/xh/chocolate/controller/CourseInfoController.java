package com.xh.chocolate.controller;

import com.xh.chocolate.common.commonService.CourseService;
import com.xh.chocolate.common.jpaModule.CourseInfoDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.dto.chocolate.CreateOrUpdateCourseDto;
import com.xh.chocolate.pojo.entity.CourseInfoEntity;
import com.xh.chocolate.pojo.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    @Autowired
    private CourseService courseService;

    /**
     * 新增一个或多个 课程
     * @param createOrUpdateCourseDtoList
     * @return
     */
    @PostMapping
    public ResponseResult postCourseInfo(@RequestBody List<CreateOrUpdateCourseDto> createOrUpdateCourseDtoList) {
        // 检查教师Id、学科Id、教室Id是否合法
        // ...

        createOrUpdateCourseDtoList.forEach(cell->cell.setId(null));
        courseInfoDao.saveAll(createOrUpdateCourseDtoList);
        return success();
    }

    /**
     * 删除指定 课程
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteCourseInfo(@PathVariable("id")Integer id) {
        courseService.deleteCourse(id);
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

    /**
     * 获取指定教师的所有 课程
     * @param teacherId
     * @return
     */
    @GetMapping("teacherId={teacherId}")
    public ResponseResult getCourseInfoByTeacherId(@PathVariable("teacherId")Integer teacherId) {
        return success(courseInfoDao.getCourseInfoEntitiesByStaffId(teacherId));
    }

    /**
     * 获取指定教室下的所有 课程
     * @param classRoomId
     * @return
     */
    @GetMapping("classRoomId={classRoomId}")
    public ResponseResult getCourseInfoByClassRoomId(@PathVariable("classRoomId")Integer classRoomId) {
        return success(courseInfoDao.getCourseInfoEntitiesByClassRoomId(classRoomId));
    }

    /**
     *
     */
    @GetMapping("disengagedInfo/startDate={startDate}")
    public ResponseResult getDisengagedInfo(@PathVariable("startDate")String startDateString) throws ParseException {
        Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(startDateString);
        return success(courseService.getDisengagedInfo(startDate));
    }

    /**
     *
     * @param createOrUpdateCourseDto
     * @return
     * @throws ServiceException
     */
    @PostMapping
    public ResponseResult postCourse(@RequestBody CreateOrUpdateCourseDto createOrUpdateCourseDto) throws ServiceException {
        courseService.createCourse(createOrUpdateCourseDto);
        return success();
    }

    /**
     *
     * @param classIdList
     * @return
     * @throws ServiceException
     */
    @PostMapping("completedCourseInfo")
    public ResponseResult getCompletedCourseInfo(@RequestBody List<Integer> classIdList) throws ServiceException {
        return success(courseService.getCompletedCourseForClassList(classIdList));
    }



}
