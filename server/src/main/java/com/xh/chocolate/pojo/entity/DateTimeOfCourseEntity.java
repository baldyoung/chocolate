package com.xh.chocolate.pojo.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name="DateTimeOfCourse")
@EntityListeners(AuditingEntityListener.class)
public class DateTimeOfCourseEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    private Integer courseId;
    private Integer weekDay;
    private Integer workTime;

    @Override
    public String toString() {
        return "DateTimeOfCourseEntity{" +
                "id=" + id +
                ", courseId=" + courseId +
                ", weekDay=" + weekDay +
                ", workTime=" + workTime +
                '}';
    }

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

    public Integer getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(Integer weekDay) {
        this.weekDay = weekDay;
    }

    public Integer getWorkTime() {
        return workTime;
    }

    public void setWorkTime(Integer workTime) {
        this.workTime = workTime;
    }
}
