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

    @PostMapping
    public ResponseResult postTeacherCompetency(@RequestBody List<TeacherCompetencyEntity> teacherCompetencyEntityList) {
        // 检查每一条“授课关联记录”中的教师ID与课程ID是否合法
        teacherCompetencyDao.saveAll(teacherCompetencyEntityList);
        return success();
    }

    @DeleteMapping("{id}")
    public ResponseResult deleteTeacherCompetency(@PathVariable("id")Integer id) {
        teacherCompetencyDao.deleteById(id);
        return success();
    }

    @PatchMapping("{id}")
    public ResponseResult patchTeacherCompetency(@PathVariable("id")Integer id, @RequestBody TeacherCompetencyEntity teacherCompetencyEntity) {
        TeacherCompetencyEntity teacherCompetencyEntityOld = teacherCompetencyDao.findById(id).get();
        teacherCompetencyEntity.setId(null);
        EntityUtil.copyNotNullProperties(teacherCompetencyEntity, teacherCompetencyEntityOld);
        teacherCompetencyDao.save(teacherCompetencyEntityOld);
        return success();
    }

    @GetMapping
    public ResponseResult getAllTeacherCompetency() {
        return success(teacherCompetencyDao.findAll());
    }

    @GetMapping("teacherId={teacherId}")
    public ResponseResult getTeacherCompetency(@PathVariable("teacherId")Integer teacherId) {
        out.println(teacherId);
        return success(teacherCompetencyDao.findByStaffId(teacherId));
    }


}
