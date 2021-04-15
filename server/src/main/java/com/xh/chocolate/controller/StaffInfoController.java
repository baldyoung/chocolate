package com.xh.chocolate.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xh.chocolate.common.jpaModule.StaffInfoDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.dto.chocolate.CreateOrUpdateStaffInfoDto;
import com.xh.chocolate.pojo.entity.StaffInfoEntity;
import com.xh.chocolate.pojo.entity.TeacherCompetencyEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;

/**
 * 职工信息 相关
 */
@RestController
@RequestMapping("staffInfo")
// @CrossOrigin(allowCredentials="true")
public class StaffInfoController {
    @Autowired
    private StaffInfoDao staffInfoDao;
    @Autowired
    private TeacherCompetencyController teacherCompetencyController;
    /**
     * 新增一个或多个 职工
     * 支持附带员工可授学科列表哦！
     * @param createOrUpdateStaffInfoDtoList
     * @return
     */
    @PostMapping
    @Transactional
    public ResponseResult postStaffInfo(@RequestBody List<CreateOrUpdateStaffInfoDto> createOrUpdateStaffInfoDtoList) {
        // 将新员工数据保存到数据库
        List<StaffInfoEntity> staffInfoEntityList = new ArrayList(createOrUpdateStaffInfoDtoList.size());
        Map<CreateOrUpdateStaffInfoDto, StaffInfoEntity> dtoEntityMap = new HashMap();
        createOrUpdateStaffInfoDtoList.forEach(cell->{
            cell.setId(null);
            StaffInfoEntity newEntity = new StaffInfoEntity(cell);
            dtoEntityMap.put(cell, newEntity);
            // 只能new一个新的StaffInfoEntity对象才能正常使用jpa
            staffInfoEntityList.add(newEntity);
        });
        staffInfoDao.saveAll(staffInfoEntityList);
        List<TeacherCompetencyEntity> teacherCompetencyEntityList = new LinkedList();
        createOrUpdateStaffInfoDtoList.forEach(cell-> {
            Integer newStaffId = dtoEntityMap.get(cell).getId();
            if (cell.getTeacherCompetencyEntityList() != null) {
                cell.getTeacherCompetencyEntityList().forEach(temp->{
                    // 给每一条授课记录添加员工Id
                    temp.setStaffId(newStaffId);
                    // 检查学科Id是否合法
                    // ...
                    teacherCompetencyEntityList.add(temp);
                });
            }
        });
        if (teacherCompetencyEntityList.size() > 0) {
            // 将授课记录保存到数据库
            teacherCompetencyController.postTeacherCompetency(teacherCompetencyEntityList);
        }
        return success();
    }

    /**
     * 删除指定 职工
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    @Transactional
    public ResponseResult deleteStaffInfo(@PathVariable("id") Integer id) {
        staffInfoDao.deleteById(id);
        teacherCompetencyController.deleteTeacherCompetencyByTeacherId(id);
        return success();
    }

    /**
     * 修改指定职工的部分属性
     * @param id
     * @param
     * @return
     */
    @PatchMapping("{id}")
    @Transactional
    public ResponseResult patchStaffInfo(@PathVariable("id")Integer id, @RequestBody CreateOrUpdateStaffInfoDto createOrUpdateStaffInfoDto) {
        StaffInfoEntity staffInfoEntity = new StaffInfoEntity(createOrUpdateStaffInfoDto);
        StaffInfoEntity staffInfoEntityOld = staffInfoDao.findById(id).get();
        staffInfoEntity.setId(null);
        EntityUtil.copyNotNullProperties(staffInfoEntity, staffInfoEntityOld);
        staffInfoDao.save(staffInfoEntityOld);
        teacherCompetencyController.deleteTeacherCompetencyByTeacherId(id);
        List<TeacherCompetencyEntity> teacherCompetencyEntityList = new LinkedList();
        if (createOrUpdateStaffInfoDto.getTeacherCompetencyEntityList() != null) {
            createOrUpdateStaffInfoDto.getTeacherCompetencyEntityList().forEach(cell->{
                cell.setStaffId(id);
                teacherCompetencyEntityList.add(cell);
            });
            teacherCompetencyController.postTeacherCompetency(teacherCompetencyEntityList);
        }
        return success();
    }

    /**
     * 获取指定或所有的职工的信息
     * 会顺带返回每个员工的 可授学科列表
     * @param targetStaffIdList
     * @return
     */
    @GetMapping
    @Transactional
    public ResponseResult getStaffInfoList(@RequestBody(required = false) List<Integer> targetStaffIdList) throws JsonProcessingException {
        // System.out.println("参数："+targetStaffIdList);
        List<StaffInfoEntity> staffInfoEntityList;
        if (null == targetStaffIdList || 0 == targetStaffIdList.size()) {
            // 如果没有给定教师Id集合，则获取所有的教师的Id
            staffInfoEntityList = staffInfoDao.findAll();
            List<Integer> staffIdList = new ArrayList(staffInfoEntityList.size());
            staffInfoEntityList.forEach(cell -> staffIdList.add(cell.getId()));
            targetStaffIdList = staffIdList;
        } else {
            // 获取给定教师Id集合所对应的教师信息
            staffInfoEntityList = staffInfoDao.findByIdIn(targetStaffIdList);
        }
        if (null == targetStaffIdList || 0 == targetStaffIdList.size()) {
            // 没有符合条件的教师集合，直接返回，无需后续操作
            return success();
        }
        // 获取当前教师集合中，所有教师的 授课记录
        List<TeacherCompetencyEntity> teacherCompetencyEntityList = teacherCompetencyController.getTeacherCompetencyByStaffIds(targetStaffIdList);
        if (null == teacherCompetencyEntityList || 0 == teacherCompetencyEntityList.size()) {
            // 没有符合条件的 授课记录，直接返回教师集合就行了
            return success(staffInfoEntityList);
        }
        // 将 授课记录 与 当前教师集合进行匹配，并转换为Map或List对象（ps：太懒了，不想写dto，哈哈哈）
        ObjectMapper mapper = new ObjectMapper();
        String t = mapper.writeValueAsString(staffInfoEntityList);
        List<Map> list = mapper.readValue(t,new TypeReference<List<Map>>(){});
        list.forEach(cell->{
            List<TeacherCompetencyEntity> competencyEntityList = new LinkedList();
            Integer staffId = Integer.valueOf(cell.get("id").toString());
            teacherCompetencyEntityList.forEach(temp -> {
                if (staffId.equals(temp.getStaffId())) {
                    competencyEntityList.add(temp);
                }
            });
            cell.put("teacherCompetencyList", competencyEntityList);
        });
        return success(list);
    }

    /**
     * 获取指定员工的信息
     * @param id
     * @return
     */
    @GetMapping("{id}")
    public ResponseResult getStaffInfo(@PathVariable("id")Integer id) {
        return success(staffInfoDao.findById(id).get());
    }

}
