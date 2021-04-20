package com.xh.chocolate.pojo.dto.chocolate;

import com.xh.chocolate.pojo.entity.ClassInCourseEntity;
import com.xh.chocolate.pojo.entity.CourseInfoEntity;
import com.xh.chocolate.pojo.entity.DateTimeOfCourseEntity;

import java.util.List;
import java.util.Objects;

public class CreateOrUpdateCourseDto extends CourseInfoEntity {
    private List<ClassInCourseEntity> classInCourseEntityList;
    private List<DateTimeOfCourseEntity> dateTimeOfCourseEntityList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CreateOrUpdateCourseDto that = (CreateOrUpdateCourseDto) o;
        return classInCourseEntityList.equals(that.classInCourseEntityList) && dateTimeOfCourseEntityList.equals(that.dateTimeOfCourseEntityList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), classInCourseEntityList, dateTimeOfCourseEntityList);
    }

    public List<ClassInCourseEntity> getClassInCourseEntityList() {
        return classInCourseEntityList;
    }

    public void setClassInCourseEntityList(List<ClassInCourseEntity> classInCourseEntityList) {
        this.classInCourseEntityList = classInCourseEntityList;
    }

    public List<DateTimeOfCourseEntity> getDateTimeOfCourseEntityList() {
        return dateTimeOfCourseEntityList;
    }

    public void setDateTimeOfCourseEntityList(List<DateTimeOfCourseEntity> dateTimeOfCourseEntityList) {
        this.dateTimeOfCourseEntityList = dateTimeOfCourseEntityList;
    }
}
