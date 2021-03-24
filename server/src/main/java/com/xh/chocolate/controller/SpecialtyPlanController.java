package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.SpecialtyPlanDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.SpecialtyPlanEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;

/**
 * 专业计划
 */
@RestController
@RequestMapping("specialtyPlan")
public class SpecialtyPlanController {
    @Autowired
    private SpecialtyPlanDao specialtyPlanDao;

    /**
     * 新增一个或多个 专业计划
     * @param specialtyPlanEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postSpecialtyPlan(@RequestBody List<SpecialtyPlanEntity> specialtyPlanEntityList) {
        // 检查专业Id是否合法
        // ...
        specialtyPlanEntityList.forEach(cell->cell.setId(null));
        specialtyPlanDao.saveAll(specialtyPlanEntityList);
        return success();
    }

    /**
     * 删除指定的 专业计划
     * @param planId
     * @return
     */
    @DeleteMapping("{planId}")
    public ResponseResult deleteSpecialtyPlanById(@PathVariable("planId")Integer planId) {
        specialtyPlanDao.deleteById(planId);
        return success();
    }

    /**
     * 修改指定 专业计划
     * @param planId
     * @param specialtyPlanEntity
     * @return
     */
    @PatchMapping("{planId}")
    public ResponseResult patchSpecialtyPlan(@PathVariable("planId")Integer planId, @RequestBody SpecialtyPlanEntity specialtyPlanEntity) {
        SpecialtyPlanEntity specialtyPlanEntityOld = specialtyPlanDao.findById(planId).get();
        specialtyPlanEntity.setId(null);
        EntityUtil.copyNotNullProperties(specialtyPlanEntity, specialtyPlanEntityOld);
        specialtyPlanDao.save(specialtyPlanEntity);
        return success();
    }

    /**
     * 获取所有的 专业计划
     * @return
     */
    @GetMapping
    public ResponseResult getAllSpecialtyPlan() {
        return success(specialtyPlanDao.findAll());
    }

    /**
     * 获取指定的 专业计划
     * @param planId
     * @return
     */
    @GetMapping("{planId}")
    public ResponseResult getSpecialtyPlan(@PathVariable("planId")Integer planId) {
        return success(specialtyPlanDao.findById(planId));
    }

    /**
     * 获取指定专业下的所有 专业计划
     * @param specialtyId
     * @return
     */
    @GetMapping("specialtyId={specialtyId}")
    public ResponseResult getSpecialtyPlanBySpecialtyId(@PathVariable("specialtyId")Integer specialtyId) {
        return success(specialtyPlanDao.findSpecialtyPlanEntitiesBySpecialtyId(specialtyId));
    }


}
