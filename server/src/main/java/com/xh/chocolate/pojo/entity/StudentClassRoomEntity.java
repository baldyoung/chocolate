package com.xh.chocolate.pojo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "StudentClassRoom")
@EntityListeners(AuditingEntityListener.class)
public class StudentClassRoomEntity {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String classRoomNumber;
    private String classRoomName;
    private String classRoomInfo;
    private Integer standardPeopleAmount;
    private Integer typeFlag;
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

    public String getClassRoomNumber() {
        return classRoomNumber;
    }

    public void setClassRoomNumber(String classRoomNumber) {
        this.classRoomNumber = classRoomNumber;
    }

    public String getClassRoomName() {
        return classRoomName;
    }

    public void setClassRoomName(String classRoomName) {
        this.classRoomName = classRoomName;
    }

    public String getClassRoomInfo() {
        return classRoomInfo;
    }

    public void setClassRoomInfo(String classRoomInfo) {
        this.classRoomInfo = classRoomInfo;
    }

    public Integer getStandardPeopleAmount() {
        return standardPeopleAmount;
    }

    public void setStandardPeopleAmount(Integer standardPeopleAmount) {
        this.standardPeopleAmount = standardPeopleAmount;
    }

    public Integer getTypeFlag() {
        return typeFlag;
    }

    public void setTypeFlag(Integer typeFlag) {
        this.typeFlag = typeFlag;
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
        return "StudentClassRoomEntity{" +
                "id=" + id +
                ", classRoomNumber='" + classRoomNumber + '\'' +
                ", classRoomName='" + classRoomName + '\'' +
                ", classRoomInfo='" + classRoomInfo + '\'' +
                ", standardPeopleAmount=" + standardPeopleAmount +
                ", typeFlag=" + typeFlag +
                ", createDateTime=" + createDateTime +
                ", updateDateTime=" + updateDateTime +
                '}';
    }
}
