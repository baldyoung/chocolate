package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.SpecialtyPlanDetailDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.SpecialtyPlanDetailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.success;

/**
 * 专业计划详情
 */
@RestController
@RequestMapping("specialtyPlanDetail")
public class SpecialtyPlanDetailController {
    @Autowired
    private SpecialtyPlanDetailDao specialtyPlanDetailDao;

    /**
     * 新增一个或多个 专业计划详情
     * @param specialtyPlanDetailEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postSpecialtyPlanDetail(@RequestBody List<SpecialtyPlanDetailEntity> specialtyPlanDetailEntityList) {
        specialtyPlanDetailEntityList.forEach(cell->cell.setId(null));
        specialtyPlanDetailDao.saveAll(specialtyPlanDetailEntityList);
        return success();
    }

    /**
     * 删除指定的 专业计划详情
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteSpecialtyPlanDetailById(@PathVariable("id")Integer id) {
        specialtyPlanDetailDao.deleteById(id);
        return success();
    }

    /**
     * 修改指定的 专业计划详情
     * @param id
     * @param specialtyPlanDetailEntity
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchSpecialtyPlanDetail(@PathVariable("id")Integer id, @RequestBody SpecialtyPlanDetailEntity specialtyPlanDetailEntity) {
        SpecialtyPlanDetailEntity specialtyPlanDetailEntityOld = specialtyPlanDetailDao.findById(id).get();
        specialtyPlanDetailEntity.setId(null);
        EntityUtil.copyNotNullProperties(specialtyPlanDetailEntity, specialtyPlanDetailEntityOld);
        specialtyPlanDetailDao.save(specialtyPlanDetailEntityOld);
        return success();
    }

    /**
     * 获取所有的 专业计划详情
     * @return
     */
    @GetMapping
    public ResponseResult getAllSpecialtyPlanDetail() {
        return success(specialtyPlanDetailDao.findAll());
    }

    /**
     * 获取指定的 专业计划详情
     * @param id
     * @return
     */
    @GetMapping("{id}")
    public ResponseResult getSpecialtyPlanDetail(@PathVariable("id")Integer id) {
        return success(specialtyPlanDetailDao.findById(id).get());
    }

    /**
     * 获取指定专业计划下所有的 专业计划详情
     * @param specialtyPlanId
     * @return
     */
    @GetMapping("specialtyPlanId={specialtyPlanId}")
    public ResponseResult getSpecialtyPlanDetailBySpecialtyPlanId(@PathVariable("specialtyPlanId")Integer specialtyPlanId) {
        return success(specialtyPlanDetailDao.findSpecialtyPlanDetailEntitiesBySpecialtyPlanId(specialtyPlanId));
    }



}
