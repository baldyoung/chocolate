package com.xh.chocolate.pojo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="StaffInfoInCompany")
@EntityListeners(AuditingEntityListener.class)
public class StaffInfoInCompanyEntity {
    @Id
    private Integer id;
    @Column(length = 8)
    private String staffNumber;
    private Integer departmentId;
    @Column(length = 4)
    private String staffGrade;
    private Integer workType;
    private Date hiredate;
    private Integer currentWorkStatus;
    private Date currentWorkstatusUpdateTime;
    @CreatedDate
    private Date createDateTime;
    @LastModifiedDate
    private Date updateDateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStaffNumber() {
        return staffNumber;
    }

    public void setStaffNumber(String staffNumber) {
        this.staffNumber = staffNumber;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public String getStaffGrade() {
        return staffGrade;
    }

    public void setStaffGrade(String staffGrade) {
        this.staffGrade = staffGrade;
    }

    public Integer getWorkType() {
        return workType;
    }

    public void setWorkType(Integer workType) {
        this.workType = workType;
    }

    public Date getHiredate() {
        return hiredate;
    }

    public void setHiredate(Date hiredate) {
        this.hiredate = hiredate;
    }

    public Integer getCurrentWorkStatus() {
        return currentWorkStatus;
    }

    public void setCurrentWorkStatus(Integer currentWorkStatus) {
        this.currentWorkStatus = currentWorkStatus;
    }

    public Date getCurrentWorkstatusUpdateTime() {
        return currentWorkstatusUpdateTime;
    }

    public void setCurrentWorkstatusUpdateTime(Date currentWorkstatusUpdateTime) {
        this.currentWorkstatusUpdateTime = currentWorkstatusUpdateTime;
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

    @Override
    public String toString() {
        return "StaffInfoInCompanyEntity{" +
                "id=" + id +
                ", staffNumber='" + staffNumber + '\'' +
                ", departmentId=" + departmentId +
                ", staffGrade='" + staffGrade + '\'' +
                ", workType=" + workType +
                ", hiredate=" + hiredate +
                ", currentWorkStatus=" + currentWorkStatus +
                ", currentWorkstatusUpdateTime=" + currentWorkstatusUpdateTime +
                ", createDateTime=" + createDateTime +
                ", updateDateTime=" + updateDateTime +
                '}';
    }
}
