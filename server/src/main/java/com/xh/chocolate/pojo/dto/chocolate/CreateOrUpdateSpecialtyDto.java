package com.xh.chocolate.pojo.dto.chocolate;

import com.xh.chocolate.pojo.entity.SpecialtyEntity;
import com.xh.chocolate.pojo.entity.SpecialtyPlanDetailEntity;

import java.util.List;
import java.util.Objects;

public class CreateOrUpdateSpecialtyDto extends SpecialtyEntity {

    private List<SpecialtyPlanDetailEntity> specialtyPlanDetailEntityList;

    public List<SpecialtyPlanDetailEntity> getSpecialtyPlanDetailEntityList() {
        return specialtyPlanDetailEntityList;
    }

    public void setSpecialtyPlanDetailEntityList(List<SpecialtyPlanDetailEntity> specialtyPlanDetailEntityList) {
        this.specialtyPlanDetailEntityList = specialtyPlanDetailEntityList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CreateOrUpdateSpecialtyDto that = (CreateOrUpdateSpecialtyDto) o;
        return specialtyPlanDetailEntityList.equals(that.specialtyPlanDetailEntityList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), specialtyPlanDetailEntityList);
    }
}
