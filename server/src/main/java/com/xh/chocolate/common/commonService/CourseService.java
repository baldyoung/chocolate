package com.xh.chocolate.common.commonService;

import com.xh.chocolate.common.jpaModule.*;
import com.xh.chocolate.common.utils.CommentUntil;
import com.xh.chocolate.pojo.dto.chocolate.CreateOrUpdateCourseDto;
import com.xh.chocolate.pojo.entity.*;
import com.xh.chocolate.pojo.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.auth.Subject;
import java.util.*;

import static com.xh.chocolate.common.utils.CommentUntil.isEmpty;

@Service
public class CourseService {
    @Autowired
    private CourseInfoDao courseInfoDao;

    @Autowired
    private ClassInCourseDao classInCourseDao;

    @Autowired
    private DateTimeOfCourseDao dateTimeOfCourseDao;

    @Autowired
    private SpecialtyDao specialtyDao;

    @Autowired
    private SpecialtyPlanDetailDao specialtyPlanDetailDao;

    @Autowired
    private SubjectDao subjectDao;

    @Autowired
    private StaffInfoDao staffInfoDao;

    @Autowired
    private StudentClassDao studentClassDao;

    @Autowired
    private StudentClassRoomDao studentClassRoomDao;

    @Autowired
    private TeacherCompetencyDao teacherCompetencyDao;

    // 获取当前所有的课程安排信息
    @Transactional
    public Map getDisengagedInfo(Date date) {
        Map data = new HashMap();
        // 获取所有的教师信息
        List<StaffInfoEntity> staffInfoEntityList = staffInfoDao.findAll();
        data.put("allStaffList", staffInfoEntityList);
        // 获取所有教师的可授 学科信息
        List<TeacherCompetencyEntity> teacherCompetencyEntityList = teacherCompetencyDao.findAll();
        data.put("allStaffTeachSubjectList", teacherCompetencyEntityList);
        // 获取所有的班级信息
        List<StudentClassEntity> studentClassEntityList = studentClassDao.findAll();
        data.put("allClassList", studentClassEntityList);
        // 获取所有的教室信息
        List<StudentClassRoomEntity> studentClassRoomEntityList = studentClassRoomDao.findAll();
        data.put("allRoomList", studentClassRoomEntityList);
        // 获取所有的专业信息
        List<SpecialtyEntity> specialtyEntityList = specialtyDao.findAll();
        data.put("allSpecialtyList", specialtyEntityList);
        // 获取专业计划详情信息
        List<SpecialtyPlanDetailEntity> specialtyPlanDetailEntityList = specialtyPlanDetailDao.findAll();
        data.put("allSpecialtyPlanList", specialtyPlanDetailEntityList);
        // 获取所有的 学科信息
        List<SubjectEntity> subjectEntityList = subjectDao.findAll();
        data.put("allSubjectList", subjectEntityList);
        // 获取所有的 课程信息
        List<CourseInfoEntity> allCourseInfoEntityList = courseInfoDao.findAll();
        data.put("allCourseList", allCourseInfoEntityList);
        // 获取所有课程的关联 班级
        List<ClassInCourseEntity> allClassInCourseEntityList = classInCourseDao.findAll();
        data.put("classOfCourse", allClassInCourseEntityList);

        // 获取所有当前所有还未结课的课程（包括还没开始上课的课程）
        List<CourseInfoEntity> courseInfoEntityList = courseInfoDao.getCourseInfoEntitiesByEndDateTimeInFactAfter(date);
        if(null == courseInfoEntityList || 0 == courseInfoEntityList.size()) {
            return data;
        }
        data.put("currentCourseInfo", courseInfoEntityList);
        List<Integer> courseIds = new ArrayList(courseInfoEntityList.size());
        courseInfoEntityList.forEach(cell->courseIds.add(cell.getId()));
        // 获取指定课程的时间安排
        List<DateTimeOfCourseEntity> dateTimeOfCourseEntityList = dateTimeOfCourseDao.getDateTimeOfCourseEntitiesByCourseIdIn(courseIds);
        data.put("currentCourseDayTimeInfo", dateTimeOfCourseEntityList);
        // 获取知道课程的所以管理班级
        List<ClassInCourseEntity> classInCourseEntityList = classInCourseDao.getClassInCourseEntitiesByCourseIdIn(courseIds);
        data.put("currentCourseClassInfo", classInCourseEntityList);
        return data;
    }

    // 新增一个课程
    @Transactional
    public void createCourse(CreateOrUpdateCourseDto createOrUpdateCourseDto) throws ServiceException {
        if (isEmpty(createOrUpdateCourseDto) || isEmpty(createOrUpdateCourseDto.getClassInCourseEntityList()) || isEmpty(createOrUpdateCourseDto.getDateTimeOfCourseEntityList())) {
            throw new ServiceException("something error");
        }
        createOrUpdateCourseDto.setId(null);
        CourseInfoEntity courseInfoEntity = new CourseInfoEntity(createOrUpdateCourseDto);
        // 保存课程基本信息
        courseInfoDao.save(courseInfoEntity);
        List<ClassInCourseEntity> classInCourseEntityList = createOrUpdateCourseDto.getClassInCourseEntityList();
        classInCourseEntityList.forEach(cell->{
            cell.setCourseId(courseInfoEntity.getId());
        });
        // 保存课程的下关联的班级数据
        classInCourseDao.saveAll(classInCourseEntityList);
        List<DateTimeOfCourseEntity> dateTimeOfCourseEntityList = createOrUpdateCourseDto.getDateTimeOfCourseEntityList();
        dateTimeOfCourseEntityList.forEach(cell->{
            cell.setCourseId(courseInfoEntity.getId());
        });
        // 保存课程的时间安排数据
        dateTimeOfCourseDao.saveAll(dateTimeOfCourseEntityList);
    }


    // 删除指定的课程
    @Transactional
    public void deleteCourse(Integer courseId) {
        courseInfoDao.deleteById(courseId);
        classInCourseDao.deleteByCourseId(courseId);
        dateTimeOfCourseDao.deleteByCourseId(courseId);
    }

    // 获取给定班级所有完成的学科
    public Map getCompletedCourseForClassList(List<Integer> classIdList) throws ServiceException {
        if (isEmpty(classIdList)) {
            throw new ServiceException("...");
        }
        Map result = new HashMap();
        // 获取给定班级所有的班级课程关联记录
        List<ClassInCourseEntity> classInCourseEntityList = classInCourseDao.getClassInCourseEntitiesByStudentClassIdIn(classIdList);
        result.put("classInCourseList", classInCourseEntityList);
        // 获取与关联记录相关的课程
        if (!isEmpty(classInCourseEntityList)) {
            Set<Integer> courseIdSet = new HashSet();
            classInCourseEntityList.forEach(cell -> {
                courseIdSet.add(cell.getStudentClassId());
            });
            List<Integer> courseIdList = new ArrayList(courseIdSet);
            List<CourseInfoEntity> courseInfoEntityList = courseInfoDao.getCourseInfoEntitiesByIdIn(courseIdList);
            result.put("courseList", courseInfoEntityList);
        }
        return result;
    }


}
