package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.StudentClassDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.StudentClassEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;

/**
 * 班级 相关操作
 */
@RestController
@RequestMapping("studentClass")
public class StudentClassController {
    @Autowired
    private StudentClassDao studentClassDao;

    /**
     * 新增一个或多个 班级
     * @param studentClassEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postStudentClass(@RequestBody List<StudentClassEntity> studentClassEntityList) {
        studentClassEntityList.forEach(cell->cell.setId(null));
        studentClassDao.saveAll(studentClassEntityList);
        return success();
    }

    /**
     * 删除指定 班级
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteStudentClass(@PathVariable("id")Integer id) {
        studentClassDao.deleteById(id);
        return success();
    }

    /**
     * 修改指定班级的部分属性
     * @param id
     * @param entity
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchStudentClass(@PathVariable("id")Integer id, @RequestBody StudentClassEntity entity) {
        StudentClassEntity studentClassEntityOld = studentClassDao.findById(id).get();
        entity.setId(null);
        EntityUtil.copyNotNullProperties(entity, studentClassEntityOld);
        studentClassDao.save(studentClassEntityOld);
        return success();
    }

    /**
     * 获取当前所有的班级
     * @return
     */
    @GetMapping("all")
    public ResponseResult getStudentClassList() {
        return success(studentClassDao.findAll());
    }


}
