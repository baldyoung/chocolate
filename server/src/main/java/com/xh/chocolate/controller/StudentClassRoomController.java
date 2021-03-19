package com.xh.chocolate.controller;


import com.xh.chocolate.common.jpaModule.StudentClassRoomDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.StudentClassRoomEntity;
import com.xh.chocolate.pojo.entity.SubjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;

/**
 * studentClassRoom
 * 教室 相关操作
 */
@RestController
@RequestMapping("studentClassRoom")
public class StudentClassRoomController {

    @Autowired
    private StudentClassRoomDao studentClassRoomDao;

    /**
     * 增加一个或多个 教室
     * @param studentClassRoomEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postStudentClassRoom(@RequestBody List<StudentClassRoomEntity> studentClassRoomEntityList) {
        studentClassRoomEntityList.forEach(cell->cell.setId(null));
        studentClassRoomDao.saveAll(studentClassRoomEntityList);
        return success();
    }

    /**
     * 删除指定教室
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteStudentClassRoom(@PathVariable("id") Integer id) {
        studentClassRoomDao.deleteById(id);
        return success();
    }

    /**
     * 修改指定教室的部分属性
     * @param id
     * @param studentClassRoomEntity
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchStudentClassRoom(@PathVariable("id") Integer id, @RequestBody StudentClassRoomEntity studentClassRoomEntity) {
        StudentClassRoomEntity studentClassRoomEntityOld = studentClassRoomDao.findById(id).get();
        studentClassRoomEntity.setId(null);
        EntityUtil.copyNotNullProperties(studentClassRoomEntity, studentClassRoomEntityOld);
        studentClassRoomDao.save(studentClassRoomEntityOld);
        return success();
    }

    /**
     * 获取所有教室信息
     * @return
     */
    @GetMapping("all")
    public ResponseResult getStudentClassRoomList() {
        return success(studentClassRoomDao.findAll());
    }
}
