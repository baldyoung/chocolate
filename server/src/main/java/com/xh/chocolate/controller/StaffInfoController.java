package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.StaffInfoDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.StaffInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;

/**
 * 职工信息 相关
 */
@RestController
@RequestMapping("staffInfo")
//@CrossOrigin
public class StaffInfoController {
    @Autowired
    private StaffInfoDao staffInfoDao;

    /**
     * 新增一个或多个 职工
     * @param staffInfoEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postStaffInfo(@RequestBody List<StaffInfoEntity> staffInfoEntityList) {
        staffInfoEntityList.forEach(cell->cell.setId(null));
        staffInfoDao.saveAll(staffInfoEntityList);
        return success();
    }

    /**
     * 删除指定 职工
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteStaffInfo(@PathVariable("id") Integer id) {
        staffInfoDao.deleteById(id);
        return success();
    }

    /**
     * 修改指定职工的部分属性
     * @param id
     * @param staffInfoEntity
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchStaffInfo(@PathVariable("id")Integer id, @RequestBody StaffInfoEntity staffInfoEntity) {
        StaffInfoEntity staffInfoEntityOld = staffInfoDao.findById(id).get();
        staffInfoEntity.setId(null);
        EntityUtil.copyNotNullProperties(staffInfoEntity, staffInfoEntityOld);
        staffInfoDao.save(staffInfoEntityOld);
        return success();
    }

    /**
     * 获取当前 所有的职工
     * @return
     */
    @GetMapping("all")
    public ResponseResult getStaffInfoList() {
        return success(staffInfoDao.findAll());
    }
}
