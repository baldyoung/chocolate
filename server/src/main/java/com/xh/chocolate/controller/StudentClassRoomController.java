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

@RestController
@RequestMapping("studentClassRoom")
public class StudentClassRoomController {

    @Autowired
    private StudentClassRoomDao studentClassRoomDao;

    @PostMapping
    public ResponseResult postStudentClassRoom(@RequestBody List<StudentClassRoomEntity> studentClassRoomEntityList) {
        studentClassRoomEntityList.forEach(cell->cell.setId(null));
        studentClassRoomDao.saveAll(studentClassRoomEntityList);
        return success();
    }

    @DeleteMapping("{id}")
    public ResponseResult deleteStudentClassRoom(@PathVariable("id") Integer id) {
        studentClassRoomDao.deleteById(id);
        return success();
    }

    @PatchMapping("{id}")
    public ResponseResult patchStudentClassRoom(@PathVariable("id") Integer id, StudentClassRoomEntity studentClassRoomEntity) {
        StudentClassRoomEntity studentClassRoomEntityOld = studentClassRoomDao.findById(id).get();
        EntityUtil.copyNotNullProperties(studentClassRoomEntity, studentClassRoomEntityOld);
        studentClassRoomDao.save(studentClassRoomEntityOld);
        return success();
    }

    @GetMapping("all")
    public ResponseResult getStudentClassRoomList() {
        return success(studentClassRoomDao.findAll());
    }
}
