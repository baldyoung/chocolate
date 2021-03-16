package com.xh.chocolate.pojo.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="classInCourse")
public class ClassInCourseEntity {
    @Id
    private Integer id;

    private Integer courseId;

    private Integer studentClassId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getStudentClassId() {
        return studentClassId;
    }

    public void setStudentClassId(Integer studentClassId) {
        this.studentClassId = studentClassId;
    }

    @Override
    public String toString() {
        return "ClassInCourseEntity{" +
                "id=" + id +
                ", courseId=" + courseId +
                ", studentClassId=" + studentClassId +
                '}';
    }
}
