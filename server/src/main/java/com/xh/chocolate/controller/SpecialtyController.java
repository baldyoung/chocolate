package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.SpecialtyDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.SpecialtyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mapping.model.SpELContext;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.xh.chocolate.pojo.dto.ResponseResult.success;

/**
 * 专业
 */
@RestController
@RequestMapping("specialty")
public class SpecialtyController {
    @Autowired
    private SpecialtyDao specialtyDao;

    /**
     * 新增一个或多个 专业
     * @param specialtyEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postSpecialty(@RequestBody List<SpecialtyEntity> specialtyEntityList) {
        specialtyEntityList.forEach(cell->cell.setId(null));
        specialtyDao.saveAll(specialtyEntityList);
        return success();
    }

    /**
     * 删除指定 专业
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteSpecialty(@PathVariable("id") Integer id) {
        specialtyDao.deleteById(id);
        return success();
    }

    /**
     * 修改指定 专业 的部分属性
     * @param id
     * @param specialtyEntity
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchSpecialty(@PathVariable("id")Integer id, @RequestBody SpecialtyEntity specialtyEntity) {
        SpecialtyEntity entityOld = specialtyDao.findById(id).get();
        specialtyEntity.setId(null);
        EntityUtil.copyNotNullProperties(specialtyEntity, entityOld);
        specialtyDao.save(entityOld);
        return success();
    }

    /**
     * 获取当前所有专业
     * @return
     */
    @GetMapping("all")
    public ResponseResult getSpecialtyList() {
        return success(specialtyDao.findAll());
    }


}
