package com.xh.chocolate.pojo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="StudentClass")
@EntityListeners(AuditingEntityListener.class)
public class StudentClassEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    private Integer specialtyId;
    private String classNumber;
    private String className;
    private Integer holderStaffId;
    private Integer branchId;
    private Date classBirthday;
    private Integer initStudentAmount;
    private Integer currentStudentAmount;
    private Integer currentStatus;
    @CreatedDate
    private Date createDateTime;
    @LastModifiedDate
    private Date updateDateTime;

    public Integer getBranchId() {
        return branchId;
    }

    @Override
    public String toString() {
        return "StudentClassEntity{" +
                "id=" + id +
                ", specialtyId=" + specialtyId +
                ", classNumber='" + classNumber + '\'' +
                ", className='" + className + '\'' +
                ", holderStaffId=" + holderStaffId +
                ", branchId=" + branchId +
                ", classBirthday=" + classBirthday +
                ", initStudentAmount=" + initStudentAmount +
                ", currentStudentAmount=" + currentStudentAmount +
                ", currentStatus=" + currentStatus +
                ", createDateTime=" + createDateTime +
                ", updateDateTime=" + updateDateTime +
                '}';
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSpecialtyId() {
        return specialtyId;
    }

    public void setSpecialtyId(Integer specialtyId) {
        this.specialtyId = specialtyId;
    }

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Integer getHolderStaffId() {
        return holderStaffId;
    }

    public void setHolderStaffId(Integer holderStaffId) {
        this.holderStaffId = holderStaffId;
    }

    public Date getClassBirthday() {
        return classBirthday;
    }

    public void setClassBirthday(Date classBirthday) {
        this.classBirthday = classBirthday;
    }

    public Integer getInitStudentAmount() {
        return initStudentAmount;
    }

    public void setInitStudentAmount(Integer initStudentAmount) {
        this.initStudentAmount = initStudentAmount;
    }

    public Integer getCurrentStudentAmount() {
        return currentStudentAmount;
    }

    public void setCurrentStudentAmount(Integer currentStudentAmount) {
        this.currentStudentAmount = currentStudentAmount;
    }

    public Integer getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(Integer currentStatus) {
        this.currentStatus = currentStatus;
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
