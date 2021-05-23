package com.xh.chocolate.controller;


import com.xh.chocolate.common.jpaModule.StaffInfoDao;
import com.xh.chocolate.common.jpaModule.StudentClassDao;
import com.xh.chocolate.common.jpaModule.StudentClassRoomDao;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.StaffInfoEntity;
import com.xh.chocolate.pojo.entity.StudentClassEntity;
import com.xh.chocolate.pojo.entity.StudentClassRoomEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.xh.chocolate.pojo.dto.ResponseResult.success;

/**
 * 开发资源（不做权限要求）相关接口
 */
@RestController
@RequestMapping("openSource")
public class OpenSourceController {
    @Autowired
    private StudentClassRoomDao studentClassRoomDao;

    @Autowired
    private StudentClassDao studentClassDao;

    @Autowired
    private StaffInfoDao staffInfoDao;

    @GetMapping("classRoomList")
    public ResponseResult getClassRoomList() {
        List<StudentClassRoomEntity> studentClassRoomEntityList = studentClassRoomDao.findAll();
        List<Map> list = new ArrayList(studentClassRoomEntityList.size());
        studentClassRoomEntityList.forEach(cell->{
            Map map = new HashMap();
            map.put("itemName", cell.getClassRoomName());
            map.put("itemId", cell.getId());
            list.add(map);
        });
        return success(list);
    }

    @GetMapping("studentClassList")
    public ResponseResult getStudentClassList() {
        // 应该过滤掉无效（已毕业的）班级
        List<StudentClassEntity> studentClassEntityList = studentClassDao.findAll();
        List<Map> list = new ArrayList(studentClassEntityList.size());
        studentClassEntityList.forEach(cell->{
            Map map = new HashMap();
            map.put("itemName", cell.getClassName());
            map.put("itemId", cell.getId());
            list.add(map);
        });
        return success(list);
    }

    @GetMapping("teacherList")
    public ResponseResult getTeacherList() {
        // 应该过滤掉无效（已毕业的）班级
        List<StaffInfoEntity> staffInfoEntityList = staffInfoDao.findAll();
        List<Map> list = new ArrayList(staffInfoEntityList.size());
        staffInfoEntityList.forEach(cell->{
            Map map = new HashMap();
            map.put("itemName", cell.getStaffName());
            map.put("itemId", cell.getId());
            list.add(map);
        });
        return success(list);
    }
}
