package com.xh.chocolate.pojo.dto.chocolate;

import com.xh.chocolate.pojo.entity.StaffInfoEntity;
import com.xh.chocolate.pojo.entity.TeacherCompetencyEntity;
import org.w3c.dom.stylesheets.LinkStyle;

import javax.persistence.Column;
import java.util.Date;
import java.util.List;
import java.util.Objects;



public class CreateOrUpdateStaffInfoDto extends StaffInfoEntity {


    // 教师可授的学科列表
    private List<TeacherCompetencyEntity> teacherCompetencyEntityList;

    public List<TeacherCompetencyEntity> getTeacherCompetencyEntityList() {
        return teacherCompetencyEntityList;
    }

    public void setTeacherCompetencyEntityList(List<TeacherCompetencyEntity> teacherCompetencyEntityList) {
        this.teacherCompetencyEntityList = teacherCompetencyEntityList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CreateOrUpdateStaffInfoDto that = (CreateOrUpdateStaffInfoDto) o;
        return Objects.equals(teacherCompetencyEntityList, that.teacherCompetencyEntityList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), teacherCompetencyEntityList);
    }
}
