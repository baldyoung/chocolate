package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.SpecialtyDao;
import com.xh.chocolate.common.jpaModule.SpecialtyPlanDetailDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.dto.chocolate.CreateOrUpdateSpecialtyDto;
import com.xh.chocolate.pojo.entity.SpecialtyEntity;
import com.xh.chocolate.pojo.entity.SpecialtyPlanDetailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mapping.model.SpELContext;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.xh.chocolate.pojo.dto.ResponseResult.success;

/**
 * 专业
 */
@RestController
@RequestMapping("specialty")
public class SpecialtyController {
    @Autowired
    private SpecialtyDao specialtyDao;
    @Autowired
    private SpecialtyPlanDetailDao specialtyPlanDetailDao;

    /**
     * 新增一个或多个 专业
     * @param
     * @return
     */
    @PostMapping
    public ResponseResult postSpecialty(@RequestBody List<CreateOrUpdateSpecialtyDto> createOrUpdateSpecialtyDtoList) {
        /*
            代码逻辑等同于隔壁的StaffInfofController
         */
        List<SpecialtyEntity> specialtyEntityList = new ArrayList(createOrUpdateSpecialtyDtoList.size());
        Map<CreateOrUpdateSpecialtyDto, SpecialtyEntity> dtoEntityMap = new HashMap();
        createOrUpdateSpecialtyDtoList.forEach(cell->{
            cell.setId(null);
            SpecialtyEntity specialtyEntity = new SpecialtyEntity(cell);
            dtoEntityMap.put(cell, specialtyEntity);
            specialtyEntityList.add(specialtyEntity);
        });
        specialtyDao.saveAll(specialtyEntityList);
        List<SpecialtyPlanDetailEntity> specialtyPlanDetailEntityList = new LinkedList();
        createOrUpdateSpecialtyDtoList.forEach(cell->{
            Integer specialtyId = dtoEntityMap.get(cell).getId();
            if (cell.getSpecialtyPlanDetailEntityList() != null) {
                cell.getSpecialtyPlanDetailEntityList().forEach(temp->{
                    // here !!! important
                    temp.setSpecialtyPlanId(specialtyId);
                    specialtyPlanDetailEntityList.add(temp);
                });
            }
        });
        if (specialtyPlanDetailEntityList.size() > 0) {
            specialtyPlanDetailDao.saveAll(specialtyPlanDetailEntityList);
        }
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
        specialtyPlanDetailDao.deleteSpecialtyPlanDetailEntitiesBySpecialtyPlanId(id);
        return success();
    }

    /**
     * 修改指定 专业 的部分属性
     * @param id
     * @param
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchSpecialty(@PathVariable("id")Integer id, @RequestBody CreateOrUpdateSpecialtyDto createOrUpdateSpecialtyDto) {
        SpecialtyEntity specialtyEntity = new SpecialtyEntity(createOrUpdateSpecialtyDto);
        SpecialtyEntity entityOld = specialtyDao.findById(id).get();
        specialtyEntity.setId(null);
        EntityUtil.copyNotNullProperties(specialtyEntity, entityOld);
        specialtyDao.save(entityOld);
        specialtyPlanDetailDao.deleteSpecialtyPlanDetailEntitiesBySpecialtyPlanId(id);
        List<SpecialtyPlanDetailEntity> specialtyPlanDetailEntityList = new LinkedList();
        if (createOrUpdateSpecialtyDto.getSpecialtyPlanDetailEntityList() != null) {
            createOrUpdateSpecialtyDto.getSpecialtyPlanDetailEntityList().forEach(cell->{
                cell.setSpecialtyPlanId(id);
                specialtyPlanDetailEntityList.add(cell);
            });
        }
        specialtyPlanDetailDao.saveAll(specialtyPlanDetailEntityList);
        return success();
    }

    /**
     * 获取当前所有专业
     * @return
     */
    @GetMapping
    public ResponseResult getSpecialtyList() {
        return success(specialtyDao.findAll());
    }

    /**
     * 获取指定专业的详细内容
     * @param id
     * @return
     */
    @GetMapping("{id}")
    public ResponseResult getSpecialty(@PathVariable("id")Integer id) {
        return success(specialtyDao.findById(id).get());
    }


}
