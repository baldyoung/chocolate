package com.xh.chocolate.pojo.entity;


import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

@Entity
@Table(name="courseInfo")
@EntityListeners(AuditingEntityListener.class)
public class CourseInfoEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    @Column
    private Integer subjectId;
    @Column
    private Integer staffId;
    @Column
    private Integer classRoomId;
    @Column
    private Integer courseNumber;
    @Column(length = 30)
    private String courseName;
    @Column(length = 500)
    private String courseInfo;
    @Column
    private Integer referenceHours;
    @Column
    private BigDecimal courseParameter;
    @Column
    private Date startDateTimeInPlan;
    @Column
    private Date endDateTimeInPlan;
    @Column
    private Date startDateTimeInFact;
    @Column
    private Date endDateTimeInFact;
    @CreatedDate
    @Column
    private Date createDateTime;
    @LastModifiedDate
    @Column
    private Date updateDateTime;

    @Override
    public String toString() {
        return "CourseInfoEntity{" +
                "id=" + id +
                ", subjectId=" + subjectId +
                ", staffId=" + staffId +
                ", classRoomId=" + classRoomId +
                ", courseNumber=" + courseNumber +
                ", courseName='" + courseName + '\'' +
                ", courseInfo='" + courseInfo + '\'' +
                ", referenceHours=" + referenceHours +
                ", courseParameter=" + courseParameter +
                ", startDateTimeInPlan=" + startDateTimeInPlan +
                ", endDateTimeInPlan=" + endDateTimeInPlan +
                ", startDateTimeInFact=" + startDateTimeInFact +
                ", endDateTimeInFact=" + endDateTimeInFact +
                ", createDateTime=" + createDateTime +
                ", updateDateTime=" + updateDateTime +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    public Integer getStaffId() {
        return staffId;
    }

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    public Integer getClassRoomId() {
        return classRoomId;
    }

    public void setClassRoomId(Integer classRoomId) {
        this.classRoomId = classRoomId;
    }

    public Integer getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(Integer courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseInfo() {
        return courseInfo;
    }

    public void setCourseInfo(String courseInfo) {
        this.courseInfo = courseInfo;
    }

    public Integer getReferenceHours() {
        return referenceHours;
    }

    public void setReferenceHours(Integer referenceHours) {
        this.referenceHours = referenceHours;
    }

    public BigDecimal getCourseParameter() {
        return courseParameter;
    }

    public void setCourseParameter(BigDecimal courseParameter) {
        this.courseParameter = courseParameter;
    }

    public Date getStartDateTimeInPlan() {
        return startDateTimeInPlan;
    }

    public void setStartDateTimeInPlan(Date startDateTimeInPlan) {
        this.startDateTimeInPlan = startDateTimeInPlan;
    }

    public Date getEndDateTimeInPlan() {
        return endDateTimeInPlan;
    }

    public void setEndDateTimeInPlan(Date endDateTimeInPlan) {
        this.endDateTimeInPlan = endDateTimeInPlan;
    }

    public Date getStartDateTimeInFact() {
        return startDateTimeInFact;
    }

    public void setStartDateTimeInFact(Date startDateTimeInFact) {
        this.startDateTimeInFact = startDateTimeInFact;
    }

    public Date getEndDateTimeInFact() {
        return endDateTimeInFact;
    }

    public void setEndDateTimeInFact(Date endDateTimeInFact) {
        this.endDateTimeInFact = endDateTimeInFact;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(Date updateDateTime) {
        this.updateDateTime = updateDateTime;
    }
}
