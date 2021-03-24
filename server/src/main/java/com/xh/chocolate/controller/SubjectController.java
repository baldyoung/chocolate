package com.xh.chocolate.controller;

import com.xh.chocolate.common.jpaModule.SubjectDao;
import com.xh.chocolate.common.utils.EntityUtil;
import com.xh.chocolate.pojo.dto.ResponseResult;
import com.xh.chocolate.pojo.entity.SubjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

import java.util.List;
import java.util.Optional;

import static com.xh.chocolate.pojo.dto.ResponseResult.*;
import static java.lang.System.out;

/**
 * subject
 * 学科 相关操作
 */
@RestController
@RequestMapping("subject")
public class SubjectController {
    @Autowired
    private SubjectDao subjectDao;

    /**
     * 获取当前所有的 学科
     * @return
     */
    @GetMapping
    public ResponseResult getSubjectList() {
        return success(subjectDao.findAll());
    }

    /**
     * 新增一个或多个 学科
     * @param subjectEntityList
     * @return
     */
    @PostMapping
    public ResponseResult postSubject(@RequestBody List<SubjectEntity> subjectEntityList) {
        subjectEntityList.forEach(cell -> cell.setId(null));
        subjectDao.saveAll(subjectEntityList);
        return success();
    }

    /**
     * 修改指定 学科 的内容  （部分修改）
     * @param subjectEntity
     * @return
     */
    @PatchMapping("{id}")
    public ResponseResult patchSubject(@PathVariable("id")Integer id, @RequestBody SubjectEntity subjectEntity) {
        SubjectEntity subjectEntityOld = subjectDao.findById(id).get();
        subjectEntity.setId(null);
        EntityUtil.copyNotNullProperties(subjectEntity, subjectEntityOld);
        subjectDao.save(subjectEntityOld);
        return success();
    }

    /**
     * 删除指定 学科
     * @param id
     * @return
     */
    @DeleteMapping("{id}")
    public ResponseResult deleteSubject(@PathVariable("id")Integer id) {
        subjectDao.deleteById(id);
        return success();
    }

    /**
     * 获取指定学科的信息
     * @param id
     * @return
     */
    @GetMapping("{id}")
    public ResponseResult getSubject(@PathVariable("id")Integer id) {
        return success(subjectDao.findById(id).get());
    }

}
