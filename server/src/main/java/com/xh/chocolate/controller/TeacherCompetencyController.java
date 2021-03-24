package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.TeacherCompetencyDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.TeacherCompetencyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;
import static java.lang.System.*;
/**
 * 教师授课关联表
 */
@RestController
@RequestMapping("teacherCompetency")
public class TeacherCompetencyController {
    @Autowired
    private TeacherCompetencyDao teacherCompetencyDao;

    /**
     * 新增一条或多条 授课关联记录
     * @param teacherCompetencyEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postTeacherCompetency(@RequestBody List<TeacherCompetencyEntity> teacherCompetencyEntityList) {
        // 检查每一条“授课关联记录”中的教师ID与课程ID是否合法
        // ...(待补全)
        teacherCompetencyEntityList.forEach(cell->cell.setId(null));
        teacherCompetencyDao.saveAll(teacherCompetencyEntityList);
        return success();
    }

    /**
     * 删除指定的授课关联记录
     * @param recordId
     * @return
     */
    @DeleteMapping("{recordId}")
    public ResponseResult deleteTeacherCompetency(@PathVariable("recordId")Integer recordId) {
        teacherCompetencyDao.deleteById(recordId);
        return success();
    }

    /**
     * 修改指定记录的内容
     * @param recordId
     * @param teacherCompetencyEntity
     * @return
     */
    @PatchMapping("{recordId}")
    public ResponseResult patchTeacherCompetency(@PathVariable("recordId")Integer recordId, @RequestBody TeacherCompetencyEntity teacherCompetencyEntity) {
        TeacherCompetencyEntity teacherCompetencyEntityOld = teacherCompetencyDao.findById(recordId).get();
        teacherCompetencyEntity.setId(null); // 不允许修改 记录ID
        teacherCompetencyEntity.setSubjectId(null); // 不允许修改 科目ID
        teacherCompetencyEntity.setStaffId(null); // 不允许修改 教师ID
        EntityUtil.copyNotNullProperties(teacherCompetencyEntity, teacherCompetencyEntityOld);
        teacherCompetencyDao.save(teacherCompetencyEntityOld);
        return success();
    }

    /**
     * 获取所有的 授课关联记录
     * @return
     */
    @GetMapping
    public ResponseResult getAllTeacherCompetency() {
        return success(teacherCompetencyDao.findAll());
    }

    /**
     * 获取指定记录的详细内容
     * @param recordId
     * @return
     */
    @GetMapping("{recordId}")
    public ResponseResult getTeacherCompetencyByRecordId(@PathVariable("recordId")Integer recordId) {
        return success(teacherCompetencyDao.findById(recordId).get());
    }

    /**
     * 获取指定教师下所有的 授课记录
     * @param teacherId
     * @return
     */
    @GetMapping("teacherId={teacherId}")
    public ResponseResult getTeacherCompetencyByTeacherId(@PathVariable("teacherId")Integer teacherId) {
        return success(teacherCompetencyDao.findTeacherCompetencyEntitiesByStaffId(teacherId));
    }

    /**
     * 获取指定学科下所有的 授课记录
     * @param subjectId
     * @return
     */
    @GetMapping("subject={subjectId}")
    public ResponseResult getTeacherCompetencyBySubjectId(@PathVariable("subjectId")Integer subjectId) {
        return success(teacherCompetencyDao.findTeacherCompetencyEntitiesBySubjectId(subjectId));
    }


}
